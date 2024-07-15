import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Mongoose } from 'mongoose';
import { Transaction } from './transaction.schema';

@Schema()
export class Statement extends Document {
  @Prop({ type: Mongoose.Types.ObjectId, required: true })
  accountId: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  month: number;

  @Prop({ type: [Transaction], default: [] })
  transactions: Transaction[];

  @Prop({ default: Date.now, required: true })
  createdAt: Date;
}

export const StatementSchema = SchemaFactory.createForClass(Statement);

StatementSchema.virtual('id').get(function () {
  return this._id;
});

StatementSchema.set('toJSON', {
  virtuals: true,
  transform(ret) {
    delete ret._id;
  },
});

StatementSchema.set('toObject', {
  virtuals: true,
  transform(ret) {
    delete ret._id;
  },
});
