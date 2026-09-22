import { AmazonAdapter } from "./amazon.adapter";

let adapter: AmazonAdapter | undefined;

export function getAmazonAdapter(): AmazonAdapter {
  const credentialVersion = process.env.AMAZON_CREDENTIAL_VERSION ?? "";

  adapter ??= new AmazonAdapter({
    baseUrl: "https://creatorsapi.amazon",
    tokenUrl: tokenUrlForVersion(credentialVersion),
    credentialId: process.env.AMAZON_CREDENTIAL_ID ?? "",
    credentialSecret: process.env.AMAZON_CREDENTIAL_SECRET ?? "",
    credentialVersion,
    partnerTag: process.env.AMAZON_PARTNER_TAG ?? "",
  });

  return adapter;
}

function tokenUrlForVersion(version: string): string {
  const endpoints: Record<string, string> = {
    "3.1": "https://api.amazon.com/auth/o2/token",
    "3.2": "https://api.amazon.co.uk/auth/o2/token",
    "3.3": "https://api.amazon.co.jp/auth/o2/token",
  };

  return endpoints[version] ?? "";
}
