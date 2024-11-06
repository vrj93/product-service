import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  rank: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
