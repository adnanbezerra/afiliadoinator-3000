export type MarketplaceId =
  | "amazon"
  | "aliexpress"
  | "mercado-livre"
  | "shopee";

export interface Product {
  provider: MarketplaceId;
  externalId: string;
  title: string;
  currentPrice: number;
  originalPrice?: number;
  currency: "BRL";
  discountPercentage?: number;
  imageUrl?: string;
  productUrl: string;
  affiliateUrl?: string;
  categoryId?: string;
  categoryName?: string;
  rating?: number;
  salesVolume?: number;
  salesRank?: number;
  commissionRate?: number;
  lastSeenAt: Date;
}
