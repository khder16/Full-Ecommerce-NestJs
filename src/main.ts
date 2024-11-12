import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AuthGuard } from './utility/guards/authentication.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.use(cookieParser());
  // app.useGlobalGuards(new AuthGuard());
  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
}
bootstrap();
