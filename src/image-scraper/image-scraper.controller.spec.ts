import { Test, TestingModule } from '@nestjs/testing';
import { ImageScraperController } from './image-scraper.controller';

describe('ImageScraperController', () => {
  let controller: ImageScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageScraperController],
    }).compile();

    controller = module.get<ImageScraperController>(ImageScraperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
