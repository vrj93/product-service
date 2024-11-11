import { CategoryDocument } from './schema/category.schema';
import { BrandDocument } from './schema/brand.schema';
import { ColorDocument } from './schema/color.schema';

export interface Categories {
  flag: boolean;
  status: number;
  msg: string;
  data: CategoryDocument[];
}

export interface Brands {
  flag: boolean;
  status: number;
  msg: string;
  data: BrandDocument[];
}

export interface Colors {
  flag: boolean;
  status: number;
  msg: string;
  data: ColorDocument[];
}

export interface Specifications {
  color: string[] | null;
  weight: number | null;
  dimensions: string | null;
}

export interface Price {
  amount: number;
  discount: {
    percentage: number;
    endDate: Date;
  } | null;
}
