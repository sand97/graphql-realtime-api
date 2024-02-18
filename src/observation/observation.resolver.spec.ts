import { Test, TestingModule } from '@nestjs/testing';
import { ObservationResolver } from './observation.resolver';

describe('ObservationResolver', () => {
  let resolver: ObservationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObservationResolver],
    }).compile();

    resolver = module.get<ObservationResolver>(ObservationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
