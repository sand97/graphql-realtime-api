import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  LastObservationInput,
  LastObservationResult,
  NewObservationInput,
} from '../graphql';
import { Observation } from '@prisma/client';

@Injectable()
export class ObservationService {
  constructor(private prisma: PrismaService) {}

  async getLastObservations(
    input: LastObservationInput,
  ): Promise<LastObservationResult> {
    const { page, limit, hospitalisationId } = input;
    const data = (await this.prisma.observation.findMany({
      where: {
        hospitalisationId,
      },
      orderBy: [
        {
          equipment: {
            name: 'asc', // Or 'desc' for descending order
          },
        },
        {
          createdAt: 'desc', // To get the latest observations
        },
      ],
      take: input.limit, // Limit the number of observations returned
      skip: (page - 1) * limit,
      include: {
        equipment: true,
      },
    })) as any;

    return { data };
  }

  async create(params: NewObservationInput): Promise<Observation> {
    return this.prisma.observation.create({
      include: {
        equipment: true,
      },
      data: {
        ...params,
      },
    });
  }
}
