import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "../../schema/product.schema";
import { Types, Model } from "mongoose";
import { Category } from "../../schema/category.schema";
import { Brand } from "../../schema/brand.schema";
import { Color } from "../../schema/color.schema";
import { ProductDTO } from "../../dto/product.dto";

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
    @InjectModel(Color.name) private colorModel: Model<Color>,
  ) {}

  async addProduct(req: ProductDTO): Promise<Product> {
    const [category, brand, color] = await this.getObjIDbySlug(req.category, req.brand, req.specifications?.color);
    
    if (!category || !brand) {
      throw new Error('Invalid category or brand provided.');
    }

    const product = new this.productModel({
      name: req.name,
      description: req.description,
      category,
      brand,
      specifications: {
        color,
        weight: req.specifications.weight,
        dimensions: req.specifications.dimensions,
      },
      inventory: req.inventory,
      price: req.price
    });

    return await product.save();
  }

  async getObjIDbySlug(categorySlug: string, brandSlug: string, colorSlug: string[] | null = null): Promise<(Types.ObjectId | null)[]> {
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

}