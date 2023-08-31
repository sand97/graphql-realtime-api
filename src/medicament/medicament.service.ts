import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NewMedicament, UpdateMedicament } from '../graphql';
import { Medicament } from '@prisma/client';

@Injectable()
export class MedicamentService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Medicament[]> {
    return this.prisma.medicament.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string): Promise<Medicament> {
    return this.prisma.medicament.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(params: NewMedicament): Promise<Medicament> {
    return this.prisma.medicament.create({
      data: {
        ...params,
        categoryId: params.categoryId as string,
      },
    });
  }

  async update(params: UpdateMedicament): Promise<Medicament> {
    const { id, ...params_without_id } = params;
    return this.prisma.medicament.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
    });
  }
  //
  async delete(id: string): Promise<Medicament> {
    return this.prisma.medicament.delete({
      where: {
        id,
      },
    });
  }
}
