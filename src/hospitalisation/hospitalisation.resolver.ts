import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HospitalisationService } from './hospitalisation.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/jwt-auth.guard';
import {
  FetchHospitalisationInput,
  NewHospitalisationInput,
  UpdateHospitalisationInput,
} from '../graphql';

@Resolver()
export class HospitalisationResolver {
  constructor(
    private readonly hospitalisationService: HospitalisationService,
  ) {}

  @UseGuards(GraphqlAuthGuard)
  @Query('hospitalisations')
  async hospitalisations(@Args('payload') dto: FetchHospitalisationInput) {
    return this.hospitalisationService.findAll(dto);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query('hospitalisation')
  async hospitalisation(@Args('id') args: string) {
    return this.hospitalisationService.findOne(args);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('deleteHospitalisation')
  async deleteHospitalisation(@Args('id') args: string) {
    return this.hospitalisationService.delete(args);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('updateHospitalisation')
  async updateHospitalisation(@Args('input') dto: UpdateHospitalisationInput) {
    return this.hospitalisationService.update(dto);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('createHospitalisation')
  async createHospitalisation(@Args('input') dto: NewHospitalisationInput) {
    return this.hospitalisationService.create(dto);
  }
}
