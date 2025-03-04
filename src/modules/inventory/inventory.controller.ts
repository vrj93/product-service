import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ProductDTO } from "../../dto/product.dto";
import { InventoryService } from "./inventory.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../../config/file.config";

@Controller('product')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 5, multerOptions)) // Max 5 files
  createProduct(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() req: { product_details: string }
  ) {
    const productDetails: ProductDTO = JSON.parse(req.product_details);
    return this.inventoryService.addProduct(productDetails, images);
  }
}