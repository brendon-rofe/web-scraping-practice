import { Injectable } from '@nestjs/common';
const data = require('/workspace/web-scraping-practice/src/data.json');

@Injectable()
export class ImageScraperService {

  async returnData() {
    console.log(data.elements.length);
    return data.elements;
  };

};
