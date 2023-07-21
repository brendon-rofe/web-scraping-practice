import { Injectable } from '@nestjs/common';
import axios from 'axios';
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');
const https = require('https');
const AWS = require('aws-sdk');

@Injectable()
export class ScraperService {
  private readonly numPages = 50;

  private s3 = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-west-1'
  })

  public async scrapeBookImages(): Promise<{}> {
    const downloadPromises = [];

    for(let i = 1; i < this.numPages; i++) {
      let baseUrl = `http://books.toscrape.com/catalogue/category/books_1/page-${i}.html`
      const response = await axios.get(baseUrl);
      const html = response.data;
      const $ = cheerio.load(html);

      $('article.product_pod img').each((_idx, el) => {
        const relativeImgSrc = $(el).attr('src');
        const absoluteImgSrc = new URL(relativeImgSrc, baseUrl).href;
        downloadPromises.push(this.downloadAndUploadImage(absoluteImgSrc));
      });
    };

    // Wait for all downloads and uploads to finish
    await Promise.all(downloadPromises);
    return { message: 'Images downloaded' };
  };

  private downloadAndUploadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const filename = url.split('/').pop();

      // Use http or https based on url
      const protocol = url.startsWith('https') ? https : http;
      const request = protocol.get(url, (response) => {
        const data = [];
        
        response.on('data', chunk => {
          data.push(chunk);
        });

        response.on('end', async () => {
          const buffer = Buffer.concat(data);
          
          // Upload to S3
          try {
            await this.uploadToS3(filename, buffer);
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      });

      request.on('error', (err) => {
        console.log('Error downloading image: ', err);
        reject(err);
      });
    });
  };


  private async uploadToS3(filename: string, data: Buffer) {
    const params = {
      Bucket: 'image-scraping-test', // replace with your bucket name
      Key: filename, // File name you want to save as in S3
      Body: data
    };

    try {
      const response = await this.s3.upload(params).promise();
      console.log(`File uploaded successfully at ${response.Location}`);
    } catch (err) {
      console.error('Error uploading file: ', err);
    }
  }

};
