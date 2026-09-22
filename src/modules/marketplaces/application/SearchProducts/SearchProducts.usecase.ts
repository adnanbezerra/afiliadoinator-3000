import type { MarketplaceProviderRegistry } from "../MarketplaceProviderRegistry/MarketplaceProviderRegistry";
import type { ProductSearch } from "../shared/MarketplaceProvider";
import type { MarketplaceId, Product } from "../shared/Product";

export interface SearchProductsInput extends ProductSearch {
  provider: MarketplaceId;
}

export class SearchProducts {
  constructor(private readonly providers: MarketplaceProviderRegistry) {}

  execute({ provider, ...search }: SearchProductsInput): Promise<Product[]> {
    return this.providers.get(provider).searchProducts(search);
  }
}
