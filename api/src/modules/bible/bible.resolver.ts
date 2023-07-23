import { BibleService } from './bible.service';
import { Query, Resolver } from '@nestjs/graphql';
import { Bible } from './bible.entity';

@Resolver(() => Bible)
export class BibleResolver {
  constructor(private readonly bibleService: BibleService) {}

  @Query(() => Bible)
  getBible() {
    return this.bibleService.getBible();
  }
}
