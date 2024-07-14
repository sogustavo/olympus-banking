import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { port } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const builder = new DocumentBuilder()
    .setTitle('Plutus API')
    .setDescription('Accounts & Transactions REST API')
    .setVersion('1.0')
    .addTag('accounts')
    .addTag('transactions')
    .build();

  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}

bootstrap();
