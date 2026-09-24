import { describe, expect, it } from "vitest";
import { searchProductsValidator } from "./search-products.validator";

describe("searchProductsValidator", () => {
  it("accepts Shopee as a known marketplace", () => {
    const input = searchProductsValidator.parse({
      provider: "shopee",
      query: "fone bluetooth",
    });

    expect(input.provider).toBe("shopee");
  });
});
