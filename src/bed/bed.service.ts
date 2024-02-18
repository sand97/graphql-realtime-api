import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Bed } from '@prisma/client';
import {
  BedPage,
  FetchBedsInput,
  NewBedInput,
  UpdateBedInput,
} from '../graphql';

@Injectable()
export class BedService {
  constructor(private prisma: PrismaService) {}

  async findAll(dto: FetchBedsInput): Promise<BedPage> {
    const { page, limit, keyword } = dto;
    const where = keyword
      ? {
          OR: [
            {
              number: +keyword,
            },
          ],
        }
      : undefined;
    const count = await this.prisma.bed.count({ where });
    const data = (await this.prisma.bed.findMany({
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

  async findOne(id: string): Promise<Bed> {
    return this.prisma.bed.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(params: NewBedInput): Promise<Bed> {
    return this.prisma.bed.create({
      data: {
        ...params,
      },
    });
  }

  async update(params: UpdateBedInput): Promise<Bed> {
    const { id, ...params_without_id } = params;
    return this.prisma.bed.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
    });
  }

  async delete(id: string): Promise<Bed> {
    return this.prisma.bed.delete({
      where: {
        id,
      },
    });
  }
}
