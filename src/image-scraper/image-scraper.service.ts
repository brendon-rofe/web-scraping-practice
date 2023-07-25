import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
const data = require('/workspace/web-scraping-practice/src/data.json');

@Injectable()
export class ImageScraperService {

  async downloadImages(): Promise<{}> {
    fs.mkdirSync('./images', { recursive: true }); // Ensure the directory exists

    for (let i = 0; i < data.elements.length; i++) {
      const photoId = data.elements[i].photo.split('.')[0]; // Splitting on '.' to get the ID part only
      const imageUrl = `https://resources.premierleague.com/premierleague/photos/players/250x250/p${photoId}.png`;

      try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(`./images/${photoId}.png`, response.data);
      } catch (error) {
        console.log(`Failed to download image for ID ${photoId}: ${error.message}`);
      };
    };

    return { message: 'Images download' };
  };
};
