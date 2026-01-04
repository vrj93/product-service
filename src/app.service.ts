import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Category } from './schema/category.schema';
import { Brands, Categories, Colors, Products } from './interface';
import { Brand } from './schema/brand.schema';
import { Color } from './schema/color.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @InjectModel(Color.name) private colorModel: Model<Color>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getProduct(): Promise<Products> {
    return {
      flag: true,
      status: HttpStatus.OK,
      msg: 'Product fetch successfully!',
      data: [],
    };
  }

  async getCategory(): Promise<Categories> {
    const categories = await this.categoryModel
      .find()
      .select({ _id: 0 })
      .exec();
    return {
      flag: true,
      status: HttpStatus.OK,
      msg: 'Categories fetch successfully!',
      data: categories,
    };
  }

  async getRankedCategory(): Promise<Categories> {
    const categories = await this.categoryModel
      .find()
      .select({ _id: 0 })
      .where({ rank: { $ne: 0 } })
      .exec();
    return {
      flag: true,
      status: HttpStatus.OK,
      msg: 'Ranked categories fetch successfully!',
      data: categories,
    };
  }

  async getBrand(): Promise<Brands> {
    const brands = await this.brandModel.find().select({ _id: 0 }).exec();
    return {
      flag: true,
      status: HttpStatus.OK,
      msg: 'Brands fetch successfully!',
      data: brands,
    };
  }

  async getRankedBrand(): Promise<Brands> {
    const brands = await this.brandModel
      .find()
      .select({ _id: 0 })
      .where({ rank: { $ne: null } })
      .exec();
    return {
      flag: true,
      status: HttpStatus.OK,
      msg: 'Brands fetch successfully!',
      data: brands,
    };
  }

  async getColors(): Promise<Colors> {
    const colors = await this.colorModel.find().select({ _id: 0 }).exec();
    return {
      flag: true,
      status: HttpStatus.OK,
      msg: 'Colors fetch successfully!',
      data: colors,
    };
  }
}
