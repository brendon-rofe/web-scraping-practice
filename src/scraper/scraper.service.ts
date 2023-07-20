import { Injectable } from '@nestjs/common';
import axios from 'axios';
const cheerio = require('cheerio');

@Injectable()
export class ScraperService {

  private baseUrl: string;

  public async scrapeTitle(url: string): Promise<string[]> {
    try {
      this.baseUrl = url;
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      let imageUrls = [];

      $('article.product_pod img').each((_idx, el) => {
        const relativeImgSrc = $(el).attr('src');
        const absoluteImgSrc = new URL(relativeImgSrc, this.baseUrl).href;
        imageUrls.push(absoluteImgSrc)
      })
      return imageUrls;
    } catch (error) {
      console.error(error);
      throw error;
    };
  };

};
