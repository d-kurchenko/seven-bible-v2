import { Injectable } from '@nestjs/common';
import { Bible } from './bible.entity';

@Injectable()
export class BibleService {
  getBible(): Bible {
    return {
      bookName: 'RST+',
      booksCount: 66,
    };
  }
}
