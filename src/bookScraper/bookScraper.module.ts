import { Module } from '@nestjs/common';
import { ScraperService } from './bookScraper.service';
import { ScraperController } from './bookScraper.controller';

@Module({
  providers: [ScraperService],
  controllers: [ScraperController]
})
export class ScraperModule {};
