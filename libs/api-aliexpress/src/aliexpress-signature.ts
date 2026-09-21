import { createHmac } from "node:crypto";

export function createAliExpressSignature(
  parameters: Record<string, string>,
  secret: string,
): string {
  const payload = Object.entries(parameters)
    .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
    .map(([key, value]) => `${key}${value}`)
    .join("");

  return createHmac("md5", secret)
    .update(payload, "utf8")
    .digest("hex")
    .toUpperCase();
}

export function aliExpressTimestamp(date = new Date()): string {
  const gmt8Date = new Date(date.getTime() + 8 * 60 * 60 * 1_000);
  return gmt8Date.toISOString().slice(0, 19).replace("T", " ");
}
