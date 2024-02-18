import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';

import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive';
import { AssetModule } from './asset/asset.module';
import { BedModule } from './bed/bed.module';
import { EquipmentModule } from './equipment/equipment.module';
import { HospitalisationModule } from './hospitalisation/hospitalisation.module';
import { ObservationModule } from './observation/observation.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'fr',
      loaderOptions: {
        path: path.join(__dirname, '../../', '/src/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
        // new CookieResolver(['lang', 'locale', 'l']),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      typeDefs: [constraintDirectiveTypeDefs],
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
        },
        // 'subscriptions-transport-ws': true,
      },
      directiveResolvers: {
        constraint: constraintDirective,
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    AssetModule,
    BedModule,
    EquipmentModule,
    HospitalisationModule,
    ObservationModule,
  ],
  providers: [],
})
export class AppModule {}
