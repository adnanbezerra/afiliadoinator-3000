export const MARKETPLACE_IDS = [
  "amazon",
  "aliexpress",
  "mercado-livre",
  "shopee",
] as const;

export type MarketplaceId = (typeof MARKETPLACE_IDS)[number];

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
