import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/jwt-auth.guard';
import {
  LastObservationInput,
  NewObservationInput,
  Observation,
} from '../graphql';
import { ObservationService } from './observation.service';

const pubSub = new PubSub();

@Resolver()
export class ObservationResolver {
  constructor(private readonly observationService: ObservationService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query('lastObservations')
  async hospitalisations(@Args('payload') dto: LastObservationInput) {
    return this.observationService.getLastObservations(dto);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation('createObservation')
  async createHospitalisation(@Args('input') dto: NewObservationInput) {
    const observationAdded = await this.observationService.create(dto);
    void pubSub.publish('observationAdded', { observationAdded });
    return observationAdded;
  }

  @Subscription(() => Observation, {
    filter: (payload, variables) => {
      return (
        payload.observationAdded.hospitalisationId ===
        variables.hospitalisationId
      );
    },
  })
  observationAdded() {
    return pubSub.asyncIterator('observationAdded');
  }
}
