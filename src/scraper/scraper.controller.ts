import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {

  constructor(private scraperService: ScraperService) {};

  @Get()
  async fetchData(@Query('url') url: string) {
    return await this.scraperService.scrapeTitle(url);
  }

};
