import { Injectable } from '@nestjs/common';
import axios from 'axios';
const cheerio = require('cheerio');

@Injectable()
export class ScraperService {

  public async scrapeTitle(url: string): Promise<string> {
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const title = $('head title').text();

      return title;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

};
