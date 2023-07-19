import { Injectable } from '@nestjs/common';

@Injectable()
export class ScraperService {

  async fetchData() {
    return { message: "This fetches data" };
  }

};
