import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  FetchHospitalisationInput,
  HospitalisationPage,
  NewHospitalisationInput,
  UpdateHospitalisationInput,
} from '../graphql';
import { Hospitalisation } from '@prisma/client';

@Injectable()
export class HospitalisationService {
  constructor(private prisma: PrismaService) {}

  private include = {
    customer: true,
    bed: true,
  };

  async findAll(dto: FetchHospitalisationInput): Promise<HospitalisationPage> {
    const { page, limit, userId } = dto;
    const where = {
      OR: [
        {
          userId,
        },
      ],
    };

    const count = await this.prisma.hospitalisation.count({ where });
    const data = (await this.prisma.hospitalisation.findMany({
      where,
      include: this.include,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    })) as any;

    return {
      data,
      count,
    };
  }

  async findOne(id: string): Promise<Hospitalisation> {
    return this.prisma.hospitalisation.findUnique({
      include: this.include,
      where: {
        id: id,
      },
    });
  }

  async create(params: NewHospitalisationInput): Promise<Hospitalisation> {
    const conflict = await this.prisma.hospitalisation.findFirst({
      where: {
        OR: [
          {
            userId: params.userId,
            endAt: {
              not: null,
            },
          },
          {
            bedId: params.bedId,
            endAt: {
              not: null,
            },
          },
        ],
      },
    });

    if (conflict)
      throw new HttpException(`Conflict, ${conflict.id}`, HttpStatus.CONFLICT);

    return this.prisma.hospitalisation.create({
      data: {
        ...params,
      },
      include: this.include,
    });
  }

  async update(params: UpdateHospitalisationInput): Promise<Hospitalisation> {
    const { id, ...params_without_id } = params;
    return this.prisma.hospitalisation.update({
      where: {
        id,
      },
      include: this.include,
      data: {
        ...params_without_id,
      },
    });
  }

  async delete(id: string): Promise<Hospitalisation> {
    return this.prisma.hospitalisation.delete({
      where: {
        id,
      },
    });
  }
}
