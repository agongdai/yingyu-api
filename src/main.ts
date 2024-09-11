import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { ClassValidatorPipe } from '@/common/class-validator.pipe';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { logger } from './common/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(logger);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ClassValidatorPipe());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(cookieParser());
  app.use(compression());

  await app.listen(3000);
}
bootstrap();
