import { describe, expect, it } from "vitest";
import type { MarketplaceProvider } from "../shared/MarketplaceProvider";
import {
  MarketplaceProviderNotRegisteredError,
  MarketplaceProviderRegistry,
} from "./MarketplaceProviderRegistry";

const amazon: MarketplaceProvider = {
  id: "amazon",
  searchProducts: async () => [],
  getProduct: async () => null,
};

describe("MarketplaceProviderRegistry", () => {
  it("registers and resolves a provider by id", () => {
    const registry = new MarketplaceProviderRegistry();
    registry.register(amazon);
    expect(registry.get("amazon")).toBe(amazon);
  });

  it("does not accept two providers with the same id", () => {
    const registry = new MarketplaceProviderRegistry();
    registry.register(amazon);

    expect(() => registry.register(amazon)).toThrow(
      "Marketplace provider already registered: amazon",
    );
  });

  it("identifies a known marketplace without a registered adapter", () => {
    const registry = new MarketplaceProviderRegistry();

    expect(() => registry.get("shopee")).toThrow(
      MarketplaceProviderNotRegisteredError,
    );
  });
});
