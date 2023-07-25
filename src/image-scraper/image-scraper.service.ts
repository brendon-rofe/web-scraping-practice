import { Injectable } from '@nestjs/common';
const data = require('/workspace/web-scraping-practice/src/data.json');

@Injectable()
export class ImageScraperService {

  async returnData() {
    return data.elements[0];
  }

};
