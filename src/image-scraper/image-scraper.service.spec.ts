import { Test, TestingModule } from '@nestjs/testing';
import { ImageScraperService } from './image-scraper.service';

describe('ImageScraperService', () => {
  let service: ImageScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageScraperService],
    }).compile();

    service = module.get<ImageScraperService>(ImageScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
