import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import config from '../config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(config.port, () => console.log('server started'));
};

bootstrap();
