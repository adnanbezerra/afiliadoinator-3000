import type { MarketplaceId } from "./Product";

export interface AffiliateLinkGenerator {
  readonly provider: MarketplaceId;
  generate(productUrl: string): Promise<string | null>;
}
