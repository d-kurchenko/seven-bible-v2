import { Module } from '@nestjs/common';
import { BibleResolver } from './bible.resolver';
import { BibleService } from './bible.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bible } from './bible.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bible]),
  ],
  providers: [
    BibleResolver,
    BibleService,
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class BibleModule {}
