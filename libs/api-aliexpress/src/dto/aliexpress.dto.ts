export interface AliExpressProduct {
  product_id?: string | number;
  product_title?: string;
  product_detail_url?: string;
  promotion_link?: string;
  product_main_image_url?: string;
  target_sale_price?: string;
  target_sale_price_currency?: string;
  sale_price?: string;
  sale_price_currency?: string;
  target_original_price?: string;
  original_price?: string;
  discount?: string;
  commission_rate?: string;
  evaluate_rate?: string;
  lastest_volume?: number;
  first_level_category_id?: string | number;
  first_level_category_name?: string;
  second_level_category_id?: string | number;
  second_level_category_name?: string;
}

interface AliExpressResult {
  products?: { product?: AliExpressProduct[] };
}

interface AliExpressResponseBody {
  resp_result?: {
    resp_code?: number;
    resp_msg?: string;
    result?: AliExpressResult;
  };
}

export interface AliExpressApiResponse {
  aliexpress_affiliate_product_query_response?: AliExpressResponseBody;
  aliexpress_affiliate_productdetail_get_response?: AliExpressResponseBody;
  error_response?: {
    code?: number;
    msg?: string;
    sub_msg?: string;
  };
}
