import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BibleService } from './bible.service';
import { Bible } from './bible.entity';
import { JwtAccessTokenGuard } from 'src/guards';

@UseGuards(JwtAccessTokenGuard)
@Resolver(() => Bible)
export class BibleResolver {
  constructor(private readonly bibleService: BibleService) {}

  @Query(() => Bible)
  getBible() {
    return this.bibleService.getBible();
  }
}
