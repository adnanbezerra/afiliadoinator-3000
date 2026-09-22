import {
  AbstractMarketplaceAdapter,
  assertMarketplaceConfig,
  requestJson,
  type HttpClient,
} from "@apps/api-marketplaces";
import type { ProductSearch } from "@/src/modules/marketplaces/application/shared/MarketplaceProvider";
import type { Product } from "@/src/modules/marketplaces/application/shared/Product";
import type {
  MercadoLivreProduct,
  MercadoLivreSearchResponse,
} from "./dto/mercado-livre.dto";

export interface MercadoLivreAdapterConfig {
  baseUrl: string;
  accessToken: string;
  siteId?: string;
}

export class MercadoLivreAdapter extends AbstractMarketplaceAdapter<MercadoLivreProduct> {
  readonly id = "mercado-livre" as const;

  constructor(
    private readonly config: MercadoLivreAdapterConfig,
    private readonly http: HttpClient = fetch,
  ) {
    super();
  }

  protected async fetchSearchResults(
    search: ProductSearch,
  ): Promise<MercadoLivreProduct[]> {
    const url = new URL("/products/search", this.config.baseUrl);
    url.searchParams.set("site_id", this.config.siteId ?? "MLB");
    url.searchParams.set("status", "active");
    url.searchParams.set("q", search.query);
    url.searchParams.set("limit", String(Math.min(search.pageSize ?? 10, 50)));
    url.searchParams.set(
      "offset",
      String(((search.page ?? 1) - 1) * (search.pageSize ?? 10)),
    );

    if (search.categoryId) {
      url.searchParams.set("domain_id", search.categoryId);
    }

    const response = await this.request<MercadoLivreSearchResponse>(url);
    const results = response.results ?? [];

    return Promise.all(
      results.map((product) => this.request<MercadoLivreProduct>(
        new URL(`/products/${encodeURIComponent(product.id)}`, this.config.baseUrl),
      )),
    );
  }

  protected fetchProduct(externalId: string): Promise<MercadoLivreProduct> {
    return this.request<MercadoLivreProduct>(
      new URL(`/products/${encodeURIComponent(externalId)}`, this.config.baseUrl),
    );
  }

  protected mapProduct(item: MercadoLivreProduct): Product | null {
    const winner = item.buy_box_winner;

    if (
      !item.id ||
      !item.name ||
      !item.permalink ||
      winner?.price === undefined ||
      winner.currency_id !== "BRL"
    ) {
      return null;
    }

    const image = item.pictures?.[0];
    const discountPercentage = winner.original_price
      ? ((winner.original_price - winner.price) / winner.original_price) * 100
      : undefined;

    return this.normalize({
      externalId: item.id,
      title: item.name,
      currentPrice: winner.price,
      originalPrice: winner.original_price ?? undefined,
      discountPercentage,
      imageUrl: image?.secure_url ?? image?.url,
      productUrl: item.permalink,
      categoryId: winner.category_id ?? item.domain_id,
      salesVolume: winner.sold_quantity ?? item.sold_quantity,
    });
  }

  private request<T>(url: URL): Promise<T> {
    assertMarketplaceConfig(this.id, {
      MELI_API_BASE_URL: this.config.baseUrl,
      MELI_ACCESS_TOKEN: this.config.accessToken,
    });

    return requestJson<T>(this.http, this.id, url, {
      headers: { Authorization: `Bearer ${this.config.accessToken}` },
    });
  }
}
