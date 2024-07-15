import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Statement, StatementSchema } from '@olympus-banking/schemas';
import { StatementsController } from './controllers/statements.controller';
import { StatementsService } from './services/statements.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Statement.name, schema: StatementSchema },
    ]),
  ],
  controllers: [StatementsController],
  providers: [StatementsService],
  exports: [StatementsService],
})
export class StatementsModule {}
