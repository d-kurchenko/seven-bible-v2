import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  app.use(json({
    limit: '10mb',
  }));

  app.use(urlencoded({
    limit: '10mb',
    extended: true,
  }));

  await app.listen(process.env.PORT);
  process.send?.('ready');

  // eslint-disable-next-line no-console
  console.info(`Server started on port ${process.env.PORT}`);

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.info(
      `Playground started on http://localhost:${process.env.PORT}/graphql`,
    );
  }
};

bootstrap();
