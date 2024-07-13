import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Mongoose } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop({ type: Mongoose.Types.ObjectId, auto: true })
  id: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ type: Map, of: Number })
  balances: Map<string, number>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
