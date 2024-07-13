import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Mongoose } from 'mongoose';

export enum TransactionType {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND'
}

@Schema()
export class Transaction extends Document {
  @Prop({ type: Mongoose.Types.ObjectId, required: true })
  accountId: string;

  @Prop({ type: String, enum: TransactionType, default: TransactionType.INBOUND })
  type: TransactionType;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: Date.now, required: true })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

TransactionSchema.virtual('id').get(function () {
  return this._id;
});

TransactionSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret, options) {
    delete ret._id;
  },
});

TransactionSchema.set('toObject', {
  virtuals: true,
  transform(doc, ret, options) {
    delete ret._id;
  },
});
