import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { connectionString } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(connectionString),
    AccountsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
