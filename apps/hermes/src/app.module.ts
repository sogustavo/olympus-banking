import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { mongo } from './config';
import { StatementsModule } from './statements/statements.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongo.connectionString, {
      serverSelectionTimeoutMS: 5000,
      retryAttempts: 3,
      retryDelay: 1000,
    }),
    EventsModule,
    StatementsModule,
  ],
})
export class AppModule {}
