import { Module } from '@nestjs/common';
import { MedicamentResolver } from './medicament.resolver';
import { MedicamentService } from './medicament.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  providers: [MedicamentResolver, MedicamentService],
  imports: [PrismaModule]
})
export class MedicamentModule {}
