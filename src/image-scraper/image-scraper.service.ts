import { Injectable } from '@nestjs/common';
import axios from 'axios';
const cheerio = require('cheerio');
import * as puppeteer from 'puppeteer';

@Injectable()
export class ImageScraperService {

  private async getPuppeteerPage(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return { page, browser };
  }

  async scrapePlayerNames(url: string): Promise<string[]> {
    const { page, browser } = await this.getPuppeteerPage(url);
    await page.waitForSelector('.player__name');

    const playerNames = await page.$$eval('.player__name', names =>
      names.map(name => name.textContent.trim()),
    );

    await browser.close();
    return playerNames;
  }

};
