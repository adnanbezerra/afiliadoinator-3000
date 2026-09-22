import { MarketplaceApiError } from "./marketplace-api.error";

export type HttpClient = (
  input: string | URL,
  init?: RequestInit,
) => Promise<Response>;

export async function requestJson<T>(
  http: HttpClient,
  provider: string,
  input: string | URL,
  init?: RequestInit,
): Promise<T> {
  let response: Response;

  try {
    response = await http(input, init);
  } catch {
    throw new MarketplaceApiError(provider, "Network request failed");
  }

  if (!response.ok) {
    throw new MarketplaceApiError(
      provider,
      `Request failed with status ${response.status}`,
      response.status,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new MarketplaceApiError(provider, "API returned invalid JSON");
  }
}
