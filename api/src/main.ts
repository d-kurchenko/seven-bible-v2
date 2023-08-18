import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { NodeEnv } from './types';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonModule.createLogger(createLogger({

    // })),
  });

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: 'http://localhost:4100',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  app.use(json({
    limit: '10mb',
  }));

  app.use(urlencoded({
    limit: '10mb',
    extended: true,
  }));

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT);
  process.send?.('ready');

  const logger = new Logger();

  logger.debug(`Server started on port ${process.env.PORT}`);

  if (process.env.NODE_ENV === NodeEnv.LOCAL) {
    logger.debug(`Playground started on http://localhost:${process.env.PORT}/graphql`);
  }
};

bootstrap();
