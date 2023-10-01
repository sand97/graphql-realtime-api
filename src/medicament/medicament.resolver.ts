import { MedicamentService } from './medicament.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewMedicament, UpdateMedicament } from '../graphql';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../user/user.decorator';
import { User } from '@prisma/client';

@Resolver('Medicament')
export class MedicamentResolver {
  constructor(private readonly medicamentService: MedicamentService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query('medicaments')
  async medicaments() {
    return this.medicamentService.findAll();
  }

  @UseGuards(GraphqlAuthGuard)
  @Query('medicament')
  async medicament(@Args('id') args: string) {
    return this.medicamentService.findOne(args);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('deleteMedicament')
  async deleteMedicament(@Args('id') args: string) {
    return this.medicamentService.delete(args);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('updateMedicament')
  async updateMedicament(@Args('input') dto: UpdateMedicament) {
    return this.medicamentService.update(dto);
  }
  @UseGuards(GraphqlAuthGuard)
  @Mutation('createMedicament')
  async createMedicament(
    @CurrentUser() user: User,
    @Args('input') dto: NewMedicament,
  ) {
    return this.medicamentService.create(user, dto);
  }
}
