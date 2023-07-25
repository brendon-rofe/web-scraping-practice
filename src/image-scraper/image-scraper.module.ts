import { Module } from '@nestjs/common';
import { ImageScraperService } from './image-scraper.service';
import { ImageScraperController } from './image-scraper.controller';

@Module({
  providers: [ImageScraperService],
  controllers: [ImageScraperController]
})
export class ImageScraperModule {};
