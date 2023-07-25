import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './bookScraper.service';

@Controller('scraper')
export class ScraperController {

  constructor(private scraperService: ScraperService) {};

  @Get()
  async fetchData() {
    return await this.scraperService.scrapeBookImages();
  };

};
