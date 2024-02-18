import { Module } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { ObservationResolver } from './observation.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ObservationService, ObservationResolver],
})
export class ObservationModule {}
