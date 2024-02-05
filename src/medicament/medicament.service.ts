import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  FetchMedicamentsInput,
  NewMedicament,
  UpdateMedicament,
  MedicamentPage,
} from '../graphql';
import { Medicament, User } from '@prisma/client';

@Injectable()
export class MedicamentService {
  constructor(private prisma: PrismaService) {}

  async findAll(dto: FetchMedicamentsInput): Promise<MedicamentPage> {
    const { page, limit, keyword } = dto;
    const where = keyword
      ? {
          OR: [
            {
              name: {
                contains: keyword,
              },
            },
            {
              description: {
                contains: keyword,
              },
            },
          ],
        }
      : undefined;
    const count = await this.prisma.medicament.count({ where });
    const medicaments = (await this.prisma.medicament.findMany({
      include: {
        category: true,
      },
      where,
      skip: (page - 1) * limit,
      take: limit,
    })) as any;
    return {
      medicaments,
      count,
    };
  }

  async findOne(id: string): Promise<Medicament> {
    return this.prisma.medicament.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(user: User, params: NewMedicament): Promise<Medicament> {
    return this.prisma.medicament.create({
      include: {
        category: true,
      },
      data: {
        ...params,
        createdById: user.id,
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
      include: {
        category: true,
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
