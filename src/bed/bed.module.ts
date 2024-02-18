import { Module } from '@nestjs/common';
import { BedService } from './bed.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BedResolver } from './bed.resolver';

@Module({
  providers: [BedService, BedResolver],
  imports: [PrismaModule],
})
export class BedModule {}
