export class MarketplaceApiError extends Error {
  constructor(
    readonly provider: string,
    message: string,
    readonly status?: number,
  ) {
    super(`${provider}: ${message}`);
    this.name = "MarketplaceApiError";
  }
}

export class MarketplaceConfigurationError extends Error {
  constructor(
    readonly provider: string,
    readonly missingVariables: string[],
  ) {
    super(`${provider}: missing ${missingVariables.join(", ")}`);
    this.name = "MarketplaceConfigurationError";
  }
}

export function assertMarketplaceConfig(
  provider: string,
  variables: Record<string, string | undefined>,
): void {
  const missingVariables = Object.entries(variables)
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missingVariables.length > 0) {
    throw new MarketplaceConfigurationError(provider, missingVariables);
  }
}
