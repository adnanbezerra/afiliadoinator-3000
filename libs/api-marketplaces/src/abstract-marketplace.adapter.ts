import type {
  MarketplaceProvider,
  ProductSearch,
} from "@/src/modules/marketplaces/application/shared/MarketplaceProvider";
import type {
  MarketplaceId,
  Product,
} from "@/src/modules/marketplaces/application/shared/Product";

type NormalizedProductData = Omit<
  Product,
  "provider" | "currency" | "lastSeenAt"
>;

export abstract class AbstractMarketplaceAdapter<TRawProduct>
  implements MarketplaceProvider
{
  abstract readonly id: MarketplaceId;

  async searchProducts(search: ProductSearch): Promise<Product[]> {
    const rawProducts = await this.fetchSearchResults(search);
    return rawProducts
      .map((rawProduct) => this.mapProduct(rawProduct))
      .filter((product): product is Product => product !== null);
  }

  async getProduct(externalId: string): Promise<Product | null> {
    const rawProduct = await this.fetchProduct(externalId);
    return rawProduct ? this.mapProduct(rawProduct) : null;
  }

  protected abstract fetchSearchResults(
    search: ProductSearch,
  ): Promise<TRawProduct[]>;

  protected abstract fetchProduct(
    externalId: string,
  ): Promise<TRawProduct | null>;

  protected abstract mapProduct(rawProduct: TRawProduct): Product | null;

  protected normalize(data: NormalizedProductData): Product {
    if (!Number.isFinite(data.currentPrice) || data.currentPrice < 0) {
      throw new Error(`Invalid product price from ${this.id}`);
    }

    return {
      ...data,
      provider: this.id,
      currency: "BRL",
      lastSeenAt: new Date(),
    };
  }
}
