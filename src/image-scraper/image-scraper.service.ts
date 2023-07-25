import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageScraperService {

  async getPlayerData() {
    return { message: 'This gets all the player data' };
  }

};
