import {
  AbstractMarketplaceAdapter,
  assertMarketplaceConfig,
  requestJson,
  type HttpClient,
} from "@apps/api-marketplaces";
import type { ProductSearch } from "@/src/modules/marketplaces/application/shared/MarketplaceProvider";
import type { Product } from "@/src/modules/marketplaces/application/shared/Product";
import type {
  AmazonItem,
  AmazonItemsResponse,
  AmazonSearchResponse,
  AmazonTokenResponse,
} from "./dto/amazon.dto";

export interface AmazonAdapterConfig {
  baseUrl: string;
  tokenUrl: string;
  credentialId: string;
  credentialSecret: string;
  credentialVersion: string;
  partnerTag: string;
  marketplace?: string;
}

const RESOURCES = [
  "images.primary.large",
  "itemInfo.title",
  "offersV2.listings.price",
  "browseNodeInfo.browseNodes",
  "browseNodeInfo.browseNodes.salesRank",
  "browseNodeInfo.websiteSalesRank",
];

export class AmazonAdapter extends AbstractMarketplaceAdapter<AmazonItem> {
  readonly id = "amazon" as const;
  private accessToken?: { value: string; expiresAt: number };

  constructor(
    private readonly config: AmazonAdapterConfig,
    private readonly http: HttpClient = fetch,
  ) {
    super();
  }

  protected async fetchSearchResults(
    search: ProductSearch,
  ): Promise<AmazonItem[]> {
    const response = await this.request<AmazonSearchResponse>("searchItems", {
      keywords: search.query,
      browseNodeId: search.categoryId,
      itemCount: Math.min(search.pageSize ?? 10, 10),
      itemPage: search.page ?? 1,
      marketplace: this.marketplace,
      partnerTag: this.config.partnerTag,
      resources: RESOURCES,
    });

    return response.searchResult?.items ?? [];
  }

  protected async fetchProduct(externalId: string): Promise<AmazonItem | null> {
    const response = await this.request<AmazonItemsResponse>("getItems", {
      itemIds: [externalId],
      itemIdType: "ASIN",
      marketplace: this.marketplace,
      partnerTag: this.config.partnerTag,
      resources: RESOURCES,
    });

    return response.itemsResult?.items?.[0] ?? null;
  }

  protected mapProduct(item: AmazonItem): Product | null {
    const listing = item.offersV2?.listings?.[0];
    const price = listing?.price?.money;
    const title = item.itemInfo?.title?.displayValue;

    if (
      !item.asin ||
      !title ||
      !item.detailPageURL ||
      price?.amount === undefined ||
      price.currency !== "BRL"
    ) {
      return null;
    }

    const browseNode = item.browseNodeInfo?.browseNodes?.[0];

    return this.normalize({
      externalId: item.asin,
      title,
      currentPrice: price.amount,
      originalPrice: listing?.price?.savingBasis?.money?.amount,
      discountPercentage: listing?.price?.savings?.percentage,
      imageUrl:
        item.images?.primary?.large?.url ??
        item.images?.primary?.medium?.url ??
        item.images?.primary?.small?.url,
      productUrl: item.detailPageURL,
      affiliateUrl: item.detailPageURL,
      categoryId: browseNode?.id,
      categoryName: browseNode?.displayName,
      salesRank:
        item.browseNodeInfo?.websiteSalesRank?.salesRank ??
        browseNode?.salesRank,
    });
  }

  private get marketplace(): string {
    return this.config.marketplace ?? "www.amazon.com.br";
  }

  private async request<T>(operation: string, body: object): Promise<T> {
    this.assertConfigured();
    const accessToken = await this.getAccessToken();

    return requestJson<T>(
      this.http,
      this.id,
      `${this.config.baseUrl}/catalog/v1/${operation}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "x-marketplace": this.marketplace,
        },
        body: JSON.stringify(body),
      },
    );
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && this.accessToken.expiresAt > Date.now()) {
      return this.accessToken.value;
    }

    const token = await requestJson<AmazonTokenResponse>(
      this.http,
      this.id,
      this.config.tokenUrl,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "client_credentials",
          client_id: this.config.credentialId,
          client_secret: this.config.credentialSecret,
          scope: "creatorsapi::default",
        }),
      },
    );

    this.accessToken = {
      value: token.access_token,
      expiresAt: Date.now() + Math.max(token.expires_in - 60, 0) * 1_000,
    };

    return token.access_token;
  }

  private assertConfigured(): void {
    assertMarketplaceConfig(this.id, {
      AMAZON_API_BASE_URL: this.config.baseUrl,
      AMAZON_TOKEN_URL: this.config.tokenUrl,
      AMAZON_CREDENTIAL_ID: this.config.credentialId,
      AMAZON_CREDENTIAL_SECRET: this.config.credentialSecret,
      AMAZON_CREDENTIAL_VERSION: this.config.credentialVersion,
      AMAZON_PARTNER_TAG: this.config.partnerTag,
    });
  }
}
