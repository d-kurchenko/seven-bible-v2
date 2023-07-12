import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
  process.send?.('ready');
  // eslint-disable-next-line no-console
  console.log(`Started at http://localhost:${process.env.PORT}`);
};

bootstrap();
