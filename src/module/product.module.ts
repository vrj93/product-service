import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../entity/product.schema';
import { Category, CategorySchema } from '../entity/category.schema';
import { Brand, BrandSchema } from '../entity/brand.schema';
import { Review, ReviewSchema } from '../entity/review.schema';
import { Inventory, InventorySchema } from '../entity/inventory.schema';
import { Price, PriceSchema } from '../entity/price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Brand.name, schema: BrandSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Inventory.name, schema: InventorySchema },
      { name: Price.name, schema: PriceSchema },
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
