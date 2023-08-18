import { Global, Module } from '@nestjs/common';
import { IdService } from './id.service';

@Global()
@Module({
  providers: [IdService],
  exports: [IdService],
})
export class IdModule {}
