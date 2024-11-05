import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface Discount {
  amount: number;
  endDate: Date;
}

export type PriceDocument = HydratedDocument<Price>;

@Schema()
export class Price {
  @Prop()
  amount: number;

  @Prop({ type: Object })
  discount?: Discount | null;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
