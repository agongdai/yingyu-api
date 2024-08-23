import { NestFactory } from '@nestjs/core';

import { ClassValidatorPipe } from '@/common/class-validator.pipe';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { logger } from './common/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ClassValidatorPipe());
  await app.listen(3000);
}
bootstrap();
