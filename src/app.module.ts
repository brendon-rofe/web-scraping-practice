import { Module } from '@nestjs/common';
import { ScraperModule } from './bookScraper/bookScraper.module';

@Module({
  imports: [ScraperModule],
})
export class AppModule {};
