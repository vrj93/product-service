import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  rank: number;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
