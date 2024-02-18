import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { BedService } from './bed.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/jwt-auth.guard';
import { FetchBedsInput, NewBedInput, UpdateBedInput } from '../graphql';

@Resolver()
export class BedResolver {
  constructor(private readonly bedService: BedService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query('beds')
  async beds(@Args('payload') dto: FetchBedsInput) {
    return this.bedService.findAll(dto);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query('bed')
  async bed(@Args('id') args: string) {
    return this.bedService.findOne(args);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('deleteBed')
  async deleteBed(@Args('id') args: string) {
    return this.bedService.delete(args);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('updateBed')
  async updateBed(@Args('input') dto: UpdateBedInput) {
    return this.bedService.update(dto);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('createBed')
  async createBed(@Args('input') dto: NewBedInput) {
    return this.bedService.create(dto);
  }
}
