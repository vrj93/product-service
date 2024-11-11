import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from './category.schema';
import { Brand } from './brand.schema';
import { Review } from './review.schema';
import { Inventory } from './inventory.schema';
import { Price, Specifications } from '../interface';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageUrls: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: Brand;

  @Prop({ type: Object })
  specifications: Specifications;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' })
  inventory: Inventory;

  @Prop({ type: Object })
  price: Price;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
