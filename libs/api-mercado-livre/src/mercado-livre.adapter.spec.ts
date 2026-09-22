import { AbstractMarketplaceAdapter, type HttpClient } from "@apps/api-marketplaces";
import { describe, expect, it } from "vitest";
import { MercadoLivreAdapter } from "./mercado-livre.adapter";

describe("MercadoLivreAdapter", () => {
  it("searches MLB catalog and normalizes its buy box winner", async () => {
    const http: HttpClient = async (input, init) => {
      const url = new URL(input);
      expect(init?.headers).toMatchObject({ Authorization: "Bearer token" });

      if (url.pathname === "/products/search") {
        expect(url.searchParams.get("site_id")).toBe("MLB");
        return Response.json({ results: [{ id: "MLB123" }] });
      }

      return Response.json({
        id: "MLB123",
        name: "Produto Mercado Livre",
        domain_id: "MLB-CELLPHONES",
        permalink: "https://www.mercadolivre.com.br/p/MLB123",
        pictures: [{ secure_url: "https://image.test/meli.jpg" }],
        buy_box_winner: {
          item_id: "MLB999",
          category_id: "MLB1055",
          price: 850,
          original_price: 1000,
          currency_id: "BRL",
          sold_quantity: 30,
        },
      });
    };

    const adapter = new MercadoLivreAdapter(
      {
        baseUrl: "https://api.mercadolibre.com",
        accessToken: "token",
      },
      http,
    );

    const products = await adapter.searchProducts({ query: "celular" });

    expect(adapter).toBeInstanceOf(AbstractMarketplaceAdapter);
    expect(products[0]).toMatchObject({
      provider: "mercado-livre",
      externalId: "MLB123",
      currentPrice: 850,
      originalPrice: 1000,
      discountPercentage: 15,
      currency: "BRL",
    });
    expect(products[0]).not.toHaveProperty("affiliateUrl");
  });
});
