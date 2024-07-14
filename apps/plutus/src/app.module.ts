import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/olympus-banking?replicaSet=rs0',
    ),
    AccountsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
