import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as AWS from 'aws-sdk';
const data = require('/workspace/web-scraping-practice/src/data.json');

@Injectable()
export class ImageScraperService {
  private s3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: '',
      secretAccessKey: '',
      region: 'us-east-1'
    });
  }

  async uploadFileToS3(file: Buffer, key: string): Promise<any> {
    const uploadParams = {
      Bucket: 'player-images-1', 
      Key: key,
      Body: file
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(uploadParams, (err, data) => {
        if (err) {
          reject(err);
        } if (data) {
          resolve(data);
        }
      });
    });
  }

  async downloadImages(): Promise<{}> {
    for (let i = 0; i < data.elements.length; i++) {
      const photoId = data.elements[i].photo.split('.')[0]; // Splitting on '.' to get the ID part only
      const imageUrl = `https://resources.premierleague.com/premierleague/photos/players/250x250/p${photoId}.png`;

      try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        await this.uploadFileToS3(response.data, `${photoId}.png`);
      } catch (error) {
        console.log(`Failed to download or upload image for ID ${photoId}: ${error.message}`);
      }
    }

    return { message: 'Images downloaded' };
  }
};
