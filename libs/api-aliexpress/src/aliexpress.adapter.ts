import {
  AbstractMarketplaceAdapter,
  assertMarketplaceConfig,
  MarketplaceApiError,
  requestJson,
  type HttpClient,
} from "@apps/api-marketplaces";
import type { ProductSearch } from "@/src/modules/marketplaces/application/shared/MarketplaceProvider";
import type { Product } from "@/src/modules/marketplaces/application/shared/Product";
import { aliExpressTimestamp, createAliExpressSignature } from "./aliexpress-signature";
import type {
  AliExpressApiResponse,
  AliExpressProduct,
} from "./dto/aliexpress.dto";

export interface AliExpressAdapterConfig {
  apiUrl: string;
  appKey: string;
  appSecret: string;
  trackingId: string;
}

const PRODUCT_FIELDS = [
  "product_id",
  "product_title",
  "product_detail_url",
  "promotion_link",
  "product_main_image_url",
  "target_sale_price",
  "target_sale_price_currency",
  "target_original_price",
  "discount",
  "commission_rate",
  "evaluate_rate",
  "lastest_volume",
  "first_level_category_id",
  "first_level_category_name",
  "second_level_category_id",
  "second_level_category_name",
].join(",");

export class AliExpressAdapter extends AbstractMarketplaceAdapter<AliExpressProduct> {
  readonly id = "aliexpress" as const;

  constructor(
    private readonly config: AliExpressAdapterConfig,
    private readonly http: HttpClient = fetch,
  ) {
    super();
  }

  protected async fetchSearchResults(
    search: ProductSearch,
  ): Promise<AliExpressProduct[]> {
    const response = await this.request("aliexpress.affiliate.product.query", {
      keywords: search.query,
      category_ids: search.categoryId,
      fields: PRODUCT_FIELDS,
      page_no: String(search.page ?? 1),
      page_size: String(Math.min(search.pageSize ?? 20, 50)),
      target_currency: "BRL",
      target_language: "PT",
      ship_to_country: "BR",
      tracking_id: this.config.trackingId,
    });

    return this.extractProducts(
      response.aliexpress_affiliate_product_query_response,
      response,
    );
  }

  protected async fetchProduct(
    externalId: string,
  ): Promise<AliExpressProduct | null> {
    const response = await this.request(
      "aliexpress.affiliate.productdetail.get",
      {
        product_ids: externalId,
        fields: PRODUCT_FIELDS,
        target_currency: "BRL",
        target_language: "PT",
        country: "BR",
        tracking_id: this.config.trackingId,
      },
    );

    return (
      this.extractProducts(
        response.aliexpress_affiliate_productdetail_get_response,
        response,
      )[0] ?? null
    );
  }

  protected mapProduct(item: AliExpressProduct): Product | null {
    const externalId = item.product_id?.toString();
    const currentPrice = Number(item.target_sale_price ?? item.sale_price);
    const currency =
      item.target_sale_price_currency ?? item.sale_price_currency;

    if (
      !externalId ||
      !item.product_title ||
      !item.product_detail_url ||
      !Number.isFinite(currentPrice) ||
      currency !== "BRL"
    ) {
      return null;
    }

    return this.normalize({
      externalId,
      title: item.product_title,
      currentPrice,
      originalPrice: numberOrUndefined(
        item.target_original_price ?? item.original_price,
      ),
      discountPercentage: percentageOrUndefined(item.discount),
      imageUrl: item.product_main_image_url,
      productUrl: item.product_detail_url,
      affiliateUrl: item.promotion_link,
      categoryId: (
        item.second_level_category_id ?? item.first_level_category_id
      )?.toString(),
      categoryName:
        item.second_level_category_name ?? item.first_level_category_name,
      rating: percentageOrUndefined(item.evaluate_rate),
      salesVolume: item.lastest_volume,
      commissionRate: percentageOrUndefined(item.commission_rate),
    });
  }

  private async request(
    method: string,
    methodParameters: Record<string, string | undefined>,
  ): Promise<AliExpressApiResponse> {
    this.assertConfigured();

    const parameters: Record<string, string> = {
      app_key: this.config.appKey,
      format: "json",
      method,
      sign_method: "hmac",
      timestamp: aliExpressTimestamp(),
      v: "2.0",
    };

    for (const [key, value] of Object.entries(methodParameters)) {
      if (value !== undefined && value !== "") {
        parameters[key] = value;
      }
    }

    parameters.sign = createAliExpressSignature(
      parameters,
      this.config.appSecret,
    );

    return requestJson<AliExpressApiResponse>(
      this.http,
      this.id,
      this.config.apiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams(parameters),
      },
    );
  }

  private extractProducts(
    responseBody:
      | AliExpressApiResponse["aliexpress_affiliate_product_query_response"]
      | AliExpressApiResponse["aliexpress_affiliate_productdetail_get_response"],
    response: AliExpressApiResponse,
  ): AliExpressProduct[] {
    if (response.error_response) {
      throw new MarketplaceApiError(
        this.id,
        response.error_response.sub_msg ??
          response.error_response.msg ??
          "AliExpress rejected the request",
      );
    }

    if (responseBody?.resp_result?.resp_code !== 200) {
      throw new MarketplaceApiError(
        this.id,
        responseBody?.resp_result?.resp_msg ?? "Unexpected AliExpress response",
      );
    }

    return responseBody.resp_result.result?.products?.product ?? [];
  }

  private assertConfigured(): void {
    assertMarketplaceConfig(this.id, {
      ALIEXPRESS_API_URL: this.config.apiUrl,
      ALIEXPRESS_APP_KEY: this.config.appKey,
      ALIEXPRESS_APP_SECRET: this.config.appSecret,
      ALIEXPRESS_TRACKING_ID: this.config.trackingId,
    });
  }
}

function numberOrUndefined(value?: string): number | undefined {
  if (value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function percentageOrUndefined(value?: string): number | undefined {
  return numberOrUndefined(value?.replace("%", ""));
}
