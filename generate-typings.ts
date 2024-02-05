import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  typeDefs: [constraintDirectiveTypeDefs],
  outputAs: 'class',
});
