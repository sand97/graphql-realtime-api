import { Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [PrismaModule],
})
export class CategoryModule {}
