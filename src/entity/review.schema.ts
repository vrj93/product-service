import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop()
  userId: string;

  @Prop()
  rating: number;

  @Prop()
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
