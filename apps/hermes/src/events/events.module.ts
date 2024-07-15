import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Statement, StatementSchema } from '@olympus-banking/schemas';
import { EventsService } from './services/events.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Statement.name, schema: StatementSchema },
    ]),
  ],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
