
import {
  ExceptionFilter, Catch, HttpException, Logger,
} from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import { HttpExceptionResponse } from 'src/types';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private logger: Logger;

    constructor() {
      this.logger = new Logger();
    }

    async catch(exception: HttpException) {
      const response = exception.getResponse() as HttpExceptionResponse;

      if (!response.silent) {
        if (isObject(response)) {
          if (response.error instanceof Error) {
            this.logger.error(response.message, response.error, HttpExceptionFilter.name);
          } else {
            this.logger.error(exception);
          }
        } else {
          this.logger.error(exception);
        }
      }

      return exception;
    }
}
