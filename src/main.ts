import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './utils/exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Ensures DTO transformation works
      whitelist: true, // Strips out unrecognized fields
      forbidNonWhitelisted: true, // Throws an error if unknown fields are sent
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
