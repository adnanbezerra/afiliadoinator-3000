export interface AmazonMoney {
  amount?: number;
  currency?: string;
}

export interface AmazonItem {
  asin?: string;
  detailPageURL?: string;
  images?: {
    primary?: {
      large?: { url?: string };
      medium?: { url?: string };
      small?: { url?: string };
    };
  };
  itemInfo?: {
    title?: { displayValue?: string };
  };
  offersV2?: {
    listings?: Array<{
      price?: {
        money?: AmazonMoney;
        savingBasis?: { money?: AmazonMoney };
        savings?: { percentage?: number };
      };
    }>;
  };
  browseNodeInfo?: {
    websiteSalesRank?: { salesRank?: number };
    browseNodes?: Array<{
      id?: string;
      displayName?: string;
      salesRank?: number;
    }>;
  };
}

export interface AmazonItemsResponse {
  itemsResult?: { items?: AmazonItem[] };
}

export interface AmazonSearchResponse {
  searchResult?: { items?: AmazonItem[] };
}

export interface AmazonTokenResponse {
  access_token: string;
  expires_in: number;
}
