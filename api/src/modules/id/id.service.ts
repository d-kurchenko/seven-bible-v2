import { nanoid } from 'nanoid';
import { Inject, Injectable } from '@nestjs/common';
import { APP_CONFIG_TOKEN, AppConfig } from 'src/configs/entries/app.config';
import { getConfigToken } from '@nestjs/config';
import { NodeEnv } from 'src/types';

const DEFAULT_ID_LENGT = 10;

@Injectable()
export class IdService {
  constructor(
    @Inject(getConfigToken(APP_CONFIG_TOKEN)) readonly appConfig: AppConfig,
  ) {}

  generateId(len = DEFAULT_ID_LENGT) {
    return nanoid(len);
  }

  get delimiter() {
    switch (this.appConfig.nodeEnv) {
      case NodeEnv.LOCAL:
        return ':local:';
      case NodeEnv.DEVELOPMENT:
        return ':dev:';
      default:
        return ':';
    }
  }

  generateEntityId(prefix: string): string {
    return `${this.appConfig.shortname}${prefix}${this.delimiter}${this.generateId()}`;
  }
}
