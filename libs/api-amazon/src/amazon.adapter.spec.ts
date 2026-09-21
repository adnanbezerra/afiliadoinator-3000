import { AbstractMarketplaceAdapter, type HttpClient } from "@apps/api-marketplaces";
import { describe, expect, it } from "vitest";
import { AmazonAdapter } from "./amazon.adapter";

describe("AmazonAdapter", () => {
  it("authenticates, searches and normalizes a Brazilian product", async () => {
    const http: HttpClient = async (input, init) => {
      const url = input.toString();

      if (url.endsWith("/token")) {
        return Response.json({ access_token: "token", expires_in: 3600 });
      }

      expect(init?.headers).toMatchObject({
        Authorization: "Bearer token",
        "x-marketplace": "www.amazon.com.br",
      });

      return Response.json({
        searchResult: {
          items: [
            {
              asin: "B012345678",
              detailPageURL: "https://www.amazon.com.br/dp/B012345678?tag=test",
              itemInfo: { title: { displayValue: "Produto Amazon" } },
              images: { primary: { large: { url: "https://image.test/a.jpg" } } },
              offersV2: {
                listings: [
                  {
                    price: {
                      money: { amount: 99.9, currency: "BRL" },
                      savingBasis: { money: { amount: 129.9, currency: "BRL" } },
                      savings: { percentage: 23 },
                    },
                  },
                ],
              },
            },
          ],
        },
      });
    };

    const adapter = new AmazonAdapter(
      {
        baseUrl: "https://creatorsapi.amazon",
        tokenUrl: "https://api.amazon.com/token",
        credentialId: "id",
        credentialSecret: "secret",
        credentialVersion: "3.1",
        partnerTag: "tag",
      },
      http,
    );

    const products = await adapter.searchProducts({ query: "produto" });

    expect(adapter).toBeInstanceOf(AbstractMarketplaceAdapter);
    expect(products[0]).toMatchObject({
      provider: "amazon",
      externalId: "B012345678",
      currentPrice: 99.9,
      originalPrice: 129.9,
      currency: "BRL",
    });
  });
});
