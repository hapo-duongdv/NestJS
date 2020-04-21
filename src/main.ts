import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, HttpException } from '@nestjs/common';
import { ValidationExceptionFilter } from'./filters/validation-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new ValidationExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('User Postings API')
    .setDescription('User Postings CRUD api')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port );
  Logger.log(`Server is running on http://localhost:${port}`,'Boostrap');
}
bootstrap();
