import { Injectable } from '@nestjs/common';
import { Bible } from './bible.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BibleService {
  constructor(
    @InjectRepository(Bible)
    private readonly bibleRepository: Repository<Bible>,
  ) {
  }

  getBible(): Bible {
    const a = this.bibleRepository.create({
      id: 1,
      bookName: 'ddd',
      booksCount: 65,
    });

    return a;
  }
}
