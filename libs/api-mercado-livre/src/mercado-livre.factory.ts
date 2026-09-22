import { MercadoLivreAdapter } from "./mercado-livre.adapter";

let adapter: MercadoLivreAdapter | undefined;

export function getMercadoLivreAdapter(): MercadoLivreAdapter {
  adapter ??= new MercadoLivreAdapter({
    baseUrl: "https://api.mercadolibre.com",
    accessToken: process.env.MELI_ACCESS_TOKEN ?? "",
  });

  return adapter;
}
