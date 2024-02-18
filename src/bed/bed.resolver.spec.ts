import { Test, TestingModule } from '@nestjs/testing';
import { BedResolver } from './bed.resolver';

describe('BedResolver', () => {
  let resolver: BedResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BedResolver],
    }).compile();

    resolver = module.get<BedResolver>(BedResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
