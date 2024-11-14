import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('product')
  getProduct() {
    return this.appService.getProduct();
  }

  @Get('categories')
  async category(@Query('ranked') ranked?: boolean) {
    return ranked
      ? this.appService.getRankedCategory()
      : this.appService.getCategory();
  }

  @Get('brands')
  async brand(@Query('ranked') ranked?: boolean) {
    return ranked
      ? this.appService.getRankedBrand()
      : this.appService.getBrand();
  }

  @Get('colors')
  async colors() {
    return this.appService.getColors();
  }
}
