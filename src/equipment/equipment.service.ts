import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  EquipmentPage,
  FetchEquipmentsInput,
  NewEquipmentInput,
  UpdateEquipmentInput,
} from '../graphql';
import { Equipment } from '@prisma/client';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async findAll(dto: FetchEquipmentsInput): Promise<EquipmentPage> {
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
    const count = await this.prisma.equipment.count({ where });
    const data = (await this.prisma.equipment.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })) as any;

    return {
      data,
      count,
    };
  }

  async findOne(id: string): Promise<Equipment> {
    return this.prisma.equipment.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(params: NewEquipmentInput): Promise<Equipment> {
    return this.prisma.equipment.create({
      data: {
        ...params,
      },
    });
  }

  async update(params: UpdateEquipmentInput): Promise<Equipment> {
    const { id, ...params_without_id } = params;
    return this.prisma.equipment.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
    });
  }

  async delete(id: string): Promise<Equipment> {
    return this.prisma.equipment.delete({
      where: {
        id,
      },
    });
  }
}
