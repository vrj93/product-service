import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../schema/product.schema';
import { Types, Model } from 'mongoose';
import { Category } from '../../schema/category.schema';
import { Brand } from '../../schema/brand.schema';
import { Color } from '../../schema/color.schema';
import { ProductDTO } from '../../dto/product.dto';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @InjectModel(Color.name) private colorModel: Model<Color>,
    private s3Service: S3Service,
  ) {}

  async addProduct(
    productDetails: ProductDTO,
    images: Express.Multer.File[],
  ): Promise<Product> {
    const [category, brand, color] = await this.getObjIDbySlug(
      productDetails.category,
      productDetails.brand,
      productDetails.specifications?.color,
    );

    if (!category || !brand) {
      throw new Error('Invalid category or brand provided.');
    }

    const product = new this.productModel({
      name: productDetails.name,
      description: productDetails.description,
      category,
      brand,
      specifications: {
        color,
        weight: productDetails.specifications.weight,
        dimensions: productDetails.specifications.dimensions,
      },
      inventory: productDetails.inventory,
      price: {
        amount: productDetails.price.amount,
        discount: {
          percentage: productDetails.price.discount?.percentage,
          endDate: productDetails.price.discount?.endDate
            ? new Date(productDetails.price.discount.endDate)
            : null,
        },
      },
    });

    const productId = product._id.toString();
    const imageUrls = await Promise.all(
      images.map((image) => this.s3Service.uploadImage(image, productId)),
    );
    product.imageUrls = imageUrls;
    return await product.save();
  }

  async getObjIDbySlug(
    categorySlug: string,
    brandSlug: string,
    colorSlug: string[] | null = null,
  ): Promise<(Types.ObjectId | null)[]> {
    const category = await this.categoryModel
      .findOne({ slug: categorySlug })
      .select({ _id: 1 })
      .exec();

    const brand = await this.brandModel
      .findOne({ slug: brandSlug })
      .select({ _id: 1 })
      .exec();

    let color = null;
    if (colorSlug) {
      color = await this.colorModel
        .findOne({ slug: colorSlug })
        .select({ _id: 1 })
        .exec();
    }
    return [category?._id, brand?._id, color?._id];
  }

  async getSlugByObjID(
    categoryId: object,
    brandId: object,
    colorId: object,
  ): Promise<(string | null)[]> {
    const category = await this.categoryModel
      .findOne({ _id: categoryId })
      .select({ slug: 1 })
      .exec();

    const brand = await this.brandModel
      .findOne({ _id: brandId })
      .select({ slug: 1 })
      .exec();

    const color = await this.colorModel
      .findOne({ _id: colorId })
      .select({ slug: 1 })
      .exec();

    return [category?.slug, brand?.slug, color?.slug];
  }

  async transformProductElastic(change: any): Promise<any> {
    const [category, brand, color] = await this.getSlugByObjID(
      change.fullDocument.category,
      change.fullDocument.brand,
      change.fullDocument.specifications?.color,
    );

    return {
      operationType: change.operationType,
      documentKey: change.documentKey,
      fullDocument: {
        _id: change.fullDocument._id,
        name: change.fullDocument.name,
        description: change.fullDocument.description,
        category,
        brand,
        specifications: {
          color,
        },
        price: {
          amount: change.fullDocument.price.amount,
        },
      },
    };
  }
}
