import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {

  constructor(private scraperService: ScraperService) {};

  @Get()
  async fetchData() {
    return await this.scraperService.scrapeBookImages();
  };

};
