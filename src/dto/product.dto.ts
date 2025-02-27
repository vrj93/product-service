import { Price, Specifications } from "../interface";

export class ProductDTO {
  name: string;
  description: string;
  category: string;
  brand: string;
  specifications: Specifications;
  inventory: {
    quantity: number;
    status: boolean;
  };
  price: Price;
}
