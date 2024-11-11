import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ColorDocument = HydratedDocument<Color>;

@Schema()
export class Color {
  @Prop()
  name: string;

  @Prop()
  slug: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
