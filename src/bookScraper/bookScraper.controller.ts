import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './bookScraper.service';

@Controller('book-scraper')
export class ScraperController {

  constructor(private scraperService: ScraperService) {};

  @Get()
  async fetchData() {
    return await this.scraperService.scrapeBookImages();
  };

};
