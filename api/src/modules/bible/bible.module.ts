import { Module } from '@nestjs/common';
import { BibleResolver } from './bible.resolver';
import { BibleService } from './bible.service';

@Module({
  providers: [
    BibleResolver, BibleService,
  ],
})
export class BibleModule {}
