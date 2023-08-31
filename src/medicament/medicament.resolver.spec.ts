import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentResolver } from './medicament.resolver';

describe('MedicamentResolver', () => {
  let resolver: MedicamentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicamentResolver],
    }).compile();

    resolver = module.get<MedicamentResolver>(MedicamentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
