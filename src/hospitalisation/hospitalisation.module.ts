import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { HospitalisationService } from './hospitalisation.service';
import { HospitalisationResolver } from './hospitalisation.resolver';

@Module({
  imports: [PrismaModule],
  providers: [HospitalisationService, HospitalisationResolver],
})
export class HospitalisationModule {}
