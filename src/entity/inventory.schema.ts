import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema()
export class Inventory {
  @Prop()
  quantity: number;

  @Prop()
  status: boolean;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
