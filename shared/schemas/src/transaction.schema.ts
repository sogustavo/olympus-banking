import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Mongoose } from 'mongoose';

export enum TransactionType {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND'
}

@Schema()
export class Transaction extends Document {
  @Prop({ type: Mongoose.Types.ObjectId, auto: true })
  id: string;
  
  @Prop({ type: Mongoose.Types.ObjectId, required: true })
  accountId: string;

  @Prop({ type: String, enum: TransactionType, default: TransactionType.INBOUND })
  type: TransactionType;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
