import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { APIGatewayProxyEvent, Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { Server } from 'http';

let cachedServer: Server;

const bootstrap = async (): Promise<Server> => {
  const adapter = new ExpressAdapter();

  const app = await NestFactory.create(AppModule, adapter);

  await app.init();

  return createServer(adapter.getInstance());
};

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
