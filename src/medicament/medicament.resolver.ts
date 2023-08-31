import { MedicamentService } from './medicament.service';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import {
  NewCategory,
  NewMedicament,
  UpdateCategory,
  UpdateMedicament,
} from '../graphql';

@Resolver('Medicament')
export class MedicamentResolver {
  constructor(private readonly medicamentService: MedicamentService) {}

  @Query('medicaments')
  async medicaments() {
    return this.medicamentService.findAll();
  }

  @Query('medicament')
  async medicament(@Args('id') args: string) {
    return this.medicamentService.findOne(args);
  }

  @Mutation('deleteMedicament')
  async deleteMedicament(@Args('id') args: string) {
    return this.medicamentService.delete(args);
  }

  @Mutation('updateMedicament')
  async updateMedicament(@Args('input') dto: UpdateMedicament) {
    return this.medicamentService.update(dto);
  }

  @Mutation('createMedicament')
  async createMedicament(@Args('input') dto: NewMedicament) {
    return this.medicamentService.create(dto);
  }
}
