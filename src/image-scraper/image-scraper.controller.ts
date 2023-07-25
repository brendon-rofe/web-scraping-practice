import { Controller, Get } from '@nestjs/common';
import { ImageScraperService } from './image-scraper.service';

@Controller('image-scraper')
export class ImageScraperController {

  constructor(private imageScraperService: ImageScraperService) {}

  @Get()
  async getPlayerData() {
    return await this.imageScraperService.returnData();
  };

};
