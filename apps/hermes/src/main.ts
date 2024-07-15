import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { port } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const builder = new DocumentBuilder()
    .setTitle('Hermes API')
    .setDescription('Reporting REST API')
    .setVersion('1.0')
    .addTag('statements')
    .build();

  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}

bootstrap();
