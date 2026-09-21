import type { MarketplaceId, Product } from "./Product";

export interface ProductSearch {
  query: string;
  categoryId?: string;
  page?: number;
  pageSize?: number;
}

export interface MarketplaceProvider {
  readonly id: MarketplaceId;
  searchProducts(search: ProductSearch): Promise<Product[]>;
  getProduct(externalId: string): Promise<Product | null>;
  getTrendingProducts?(): Promise<Product[]>;
  getCategoryProducts?(categoryId: string): Promise<Product[]>;
}
