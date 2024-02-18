import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EquipmentService } from './equipment.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/jwt-auth.guard';
import {
  FetchEquipmentsInput,
  NewEquipmentInput,
  UpdateEquipmentInput,
} from '../graphql';

@Resolver()
export class EquipmentResolver {
  constructor(private readonly equipmentService: EquipmentService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query('equipments')
  async equipments(@Args('payload') dto: FetchEquipmentsInput) {
    return this.equipmentService.findAll(dto);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query('equipment')
  async equipment(@Args('id') args: string) {
    return this.equipmentService.findOne(args);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('deleteEquipment')
  async deleteEquipment(@Args('id') args: string) {
    return this.equipmentService.delete(args);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('updateEquipment')
  async updateEquipment(@Args('input') dto: UpdateEquipmentInput) {
    return this.equipmentService.update(dto);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('createEquipment')
  async createEquipment(@Args('input') dto: NewEquipmentInput) {
    return this.equipmentService.create(dto);
  }
}
