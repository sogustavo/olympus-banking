import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Mongoose } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop({ required: true })
  customerName: string;

  @Prop({ type: Map, of: Number, required: true })
  balances: Map<string, number>;

  @Prop({ default: Date.now, required: true })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.virtual('id').get(function () {
  return this._id;
});

AccountSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret, options) {
    delete ret._id;
  },
});

AccountSchema.set('toObject', {
  virtuals: true,
  transform(doc, ret, options) {
    delete ret._id;
  },
});
