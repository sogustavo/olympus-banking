import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { mongo } from './config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongo.connectionString),
    AccountsModule,
    TransactionsModule,
    EventsModule,
  ],
})
export class AppModule {}
