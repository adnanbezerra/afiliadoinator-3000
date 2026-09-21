import { MarketplaceProviderRegistry } from "./MarketplaceProviderRegistry";

let registry: MarketplaceProviderRegistry | undefined;

export function getMarketplaceProviderRegistry(): MarketplaceProviderRegistry {
  registry ??= new MarketplaceProviderRegistry();
  return registry;
}
