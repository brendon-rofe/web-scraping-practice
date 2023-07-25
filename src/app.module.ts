import { Module } from '@nestjs/common';
import { ScraperModule } from './bookScraper/bookScraper.module';
import { ImageScraperModule } from './image-scraper/image-scraper.module';

@Module({
  imports: [ScraperModule, ImageScraperModule],
})
export class AppModule {};
