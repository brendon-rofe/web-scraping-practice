import { Injectable } from '@nestjs/common';
import axios from 'axios';
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');
const https = require('https');

@Injectable()
export class ScraperService {
  private readonly imageDir = './images';

  public async scrapeBookImages(): Promise<{}> {
    await this.checkImageDir();
    let baseUrl = 'http://books.toscrape.com/catalogue/category/books_1/page-1.html'

    try {
      const response = await axios.get(baseUrl);
      const html = response.data;
      const $ = cheerio.load(html);

      $('article.product_pod img').each((_idx, el) => {
        const relativeImgSrc = $(el).attr('src');
        const absoluteImgSrc = new URL(relativeImgSrc, baseUrl).href;
        this.downloadImage(absoluteImgSrc);
      })
      return { message: 'Images downloaded' };
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
    };
  };

  private downloadImage(url: string) {
    const filename = url.split('/').pop();
    const file = fs.createWriteStream(`${this.imageDir}/${filename}`);
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => file.close());
    });
  };

};
