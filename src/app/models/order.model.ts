import { Product } from './product.model';

export interface Order {
  id?: number;
  total: number;
  items?: Product[];
}
