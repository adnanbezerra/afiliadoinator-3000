import type { MarketplaceProvider } from "../shared/MarketplaceProvider";
import type { MarketplaceId } from "../shared/Product";

export class MarketplaceProviderRegistry {
  private readonly providers = new Map<MarketplaceId, MarketplaceProvider>();

  register(provider: MarketplaceProvider): void {
    if (this.providers.has(provider.id)) {
      throw new Error(`Marketplace provider already registered: ${provider.id}`);
    }

    this.providers.set(provider.id, provider);
  }

  get(id: MarketplaceId): MarketplaceProvider {
    const provider = this.providers.get(id);

    if (!provider) {
      throw new Error(`Marketplace provider not registered: ${id}`);
    }

    return provider;
  }

  list(): MarketplaceProvider[] {
    return [...this.providers.values()];
  }
}
