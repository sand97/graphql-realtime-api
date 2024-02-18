import { Test, TestingModule } from '@nestjs/testing';
import { HospitalisationResolver } from './hospitalisation.resolver';

describe('HospitalisationResolver', () => {
  let resolver: HospitalisationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HospitalisationResolver],
    }).compile();

    resolver = module.get<HospitalisationResolver>(HospitalisationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
