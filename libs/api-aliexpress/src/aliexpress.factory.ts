import { AliExpressAdapter } from "./aliexpress.adapter";

let adapter: AliExpressAdapter | undefined;

export function getAliExpressAdapter(): AliExpressAdapter {
  adapter ??= new AliExpressAdapter({
    apiUrl: "https://eco.taobao.com/router/rest",
    appKey: process.env.ALIEXPRESS_APP_KEY ?? "",
    appSecret: process.env.ALIEXPRESS_APP_SECRET ?? "",
    trackingId: process.env.ALIEXPRESS_TRACKING_ID ?? "",
  });

  return adapter;
}
