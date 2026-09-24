import {
  MarketplaceApiError,
  MarketplaceConfigurationError,
} from "@apps/api-marketplaces";
import { InvalidSessionError } from "@/src/modules/identity/application/shared/AuthError";
import { requireAuthenticatedUser } from "@/src/modules/identity/infra/routes/require-authenticated-user";
import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { MarketplaceProviderNotRegisteredError } from "../../application/MarketplaceProviderRegistry/MarketplaceProviderRegistry";
import { getSearchProducts } from "../../application/SearchProducts/SearchProducts.factory";
import { searchProductsValidator } from "../validators/search-products.validator";

export async function searchProductsRoute(
  request: NextRequest,
): Promise<Response> {
  try {
    await requireAuthenticatedUser(request);
    const query = Object.fromEntries(request.nextUrl.searchParams);
    const input = searchProductsValidator.parse({
      ...query,
      query: query.q,
    });
    const products = await getSearchProducts().execute(input);

    return NextResponse.json({ products });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Invalid search parameters",
          fields: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (error instanceof InvalidSessionError) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    if (error instanceof MarketplaceProviderNotRegisteredError) {
      return NextResponse.json(
        {
          error: "Marketplace provider is not available",
          provider: error.provider,
        },
        { status: 501 },
      );
    }

    if (error instanceof MarketplaceConfigurationError) {
      return NextResponse.json(
        {
          error: "Marketplace provider is not configured",
          provider: error.provider,
          missingVariables: error.missingVariables,
        },
        { status: 503 },
      );
    }

    if (error instanceof MarketplaceApiError) {
      return NextResponse.json(
        {
          error: "Marketplace API request failed",
          provider: error.provider,
        },
        { status: 502 },
      );
    }

    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
