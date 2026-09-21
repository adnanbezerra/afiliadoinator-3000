import { getAliExpressAdapter } from "@apps/api-aliexpress";
import { getAmazonAdapter } from "@apps/api-amazon";
import { getMercadoLivreAdapter } from "@apps/api-mercado-livre";
import { MarketplaceProviderRegistry } from "./MarketplaceProviderRegistry";

let registry: MarketplaceProviderRegistry | undefined;

export function getMarketplaceProviderRegistry(): MarketplaceProviderRegistry {
  if (!registry) {
    registry = new MarketplaceProviderRegistry();
    registry.register(getAmazonAdapter());
    registry.register(getAliExpressAdapter());
    registry.register(getMercadoLivreAdapter());
  }

  return registry;
}
