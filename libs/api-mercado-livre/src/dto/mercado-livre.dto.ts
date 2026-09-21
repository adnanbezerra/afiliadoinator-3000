export interface MercadoLivreProductSummary {
  id: string;
}

export interface MercadoLivreSearchResponse {
  results?: MercadoLivreProductSummary[];
}

export interface MercadoLivreProduct {
  id?: string;
  name?: string;
  domain_id?: string;
  permalink?: string;
  sold_quantity?: number;
  pictures?: Array<{ url?: string; secure_url?: string }>;
  buy_box_winner?: {
    item_id?: string;
    category_id?: string;
    price?: number;
    original_price?: number | null;
    currency_id?: string;
    sold_quantity?: number;
  } | null;
}
