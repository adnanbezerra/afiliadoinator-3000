import { getMarketplaceProviderRegistry } from "../MarketplaceProviderRegistry/MarketplaceProviderRegistry.factory";
import { SearchProducts } from "./SearchProducts.usecase";

let searchProducts: SearchProducts | undefined;

export function getSearchProducts(): SearchProducts {
  searchProducts ??= new SearchProducts(getMarketplaceProviderRegistry());
  return searchProducts;
}
