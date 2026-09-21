import { AbstractMarketplaceAdapter, type HttpClient } from "@apps/api-marketplaces";
import { describe, expect, it } from "vitest";
import { AliExpressAdapter } from "./aliexpress.adapter";

describe("AliExpressAdapter", () => {
  it("signs, searches and normalizes a Brazilian affiliate product", async () => {
    const http: HttpClient = async (_input, init) => {
      const parameters = new URLSearchParams(String(init?.body));

      expect(parameters.get("method")).toBe(
        "aliexpress.affiliate.product.query",
      );
      expect(parameters.get("target_currency")).toBe("BRL");
      expect(parameters.get("ship_to_country")).toBe("BR");
      expect(parameters.get("sign")).toMatch(/^[A-F0-9]{32}$/);

      return Response.json({
        aliexpress_affiliate_product_query_response: {
          resp_result: {
            resp_code: 200,
            resp_msg: "success",
            result: {
              products: {
                product: [
                  {
                    product_id: 123,
                    product_title: "Produto AliExpress",
                    product_detail_url: "https://aliexpress.test/item/123",
                    promotion_link: "https://s.click.aliexpress.com/e/test",
                    target_sale_price: "49.90",
                    target_sale_price_currency: "BRL",
                    target_original_price: "99.80",
                    discount: "50%",
                    commission_rate: "8.5%",
                  },
                ],
              },
            },
          },
        },
      });
    };

    const adapter = new AliExpressAdapter(
      {
        apiUrl: "https://eco.taobao.com/router/rest",
        appKey: "key",
        appSecret: "secret",
        trackingId: "tracking",
      },
      http,
    );

    const products = await adapter.searchProducts({ query: "produto" });

    expect(adapter).toBeInstanceOf(AbstractMarketplaceAdapter);
    expect(products[0]).toMatchObject({
      provider: "aliexpress",
      externalId: "123",
      currentPrice: 49.9,
      currency: "BRL",
      affiliateUrl: "https://s.click.aliexpress.com/e/test",
      commissionRate: 8.5,
    });
  });
});
