import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';
import { ServerConfigInterface } from './config/server-config.interface';

async function bootstrap() {
  const serverConfig = config.get('server') as ServerConfigInterface;
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    logger.verbose('Cors enabled in development mode');
    app.enableCors();
  }

  const port = process.env.port || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
