import { Injectable } from '@nestjs/common';
import axios from 'axios';
const cheerio = require('cheerio');
const fs = require('fs');

@Injectable()
export class ScraperService {

  private baseUrl: string;
  private readonly imageDir = './images';

  public async scrapeTitle(url: string): Promise<string[]> {
    try {
      this.baseUrl = url;
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      let imageUrls = [];

      await this.checkImageDir();

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

  private async checkImageDir() {
    try {
      await fs.promises.access(this.imageDir);
    } catch (error) {
      await fs.promises.mkdir(this.imageDir);
    }
  }

};
