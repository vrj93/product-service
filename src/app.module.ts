import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { Category, CategorySchema } from './schema/category.schema';
import { Brand, BrandSchema } from './schema/brand.schema';
import { Review, ReviewSchema } from './schema/review.schema';
import { Inventory, InventorySchema } from './schema/inventory.schema';
import { Price, PriceSchema } from './schema/price.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://product-mongo-svc:27017/product-service'),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Brand.name, schema: BrandSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Inventory.name, schema: InventorySchema },
      { name: Price.name, schema: PriceSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
