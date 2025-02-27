import { Body, Controller, Post } from "@nestjs/common";
import { ProductDTO } from "../../dto/product.dto";
import { InventoryService } from "./inventory.service";

@Controller('product')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post('create')
  createProduct(@Body() req: ProductDTO) {
    return this.inventoryService.addProduct(req);
  }
}