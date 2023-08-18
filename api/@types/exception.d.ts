import '@nestjs/common';
import { HttpExceptionResponse } from 'src/types';

class BaseException {
  constructor(data: HttpExceptionResponse)
}

declare module '@nestjs/common' {
  class InternalServerErrorException extends BaseException {}
  class NotFoundException extends BaseException {}
  class UnauthorizedException extends BaseException {}
  class BadRequestException extends BaseException {}
}
