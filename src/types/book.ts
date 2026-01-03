export interface BookVolumeInfo {
  title: string;
  authors?: string[];
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  description?: string;
  pageCount?: number;
  publisher?: string;
  publishedDate?: string;
  categories?: string[];
}

export interface BookSaleInfo {
  listPrice?: {
    amount: number;
    currencyCode: string;
  };
  retailPrice?: {
    amount: number;
    currencyCode: string;
  };
  buyLink?: string;
}

export interface Book {
  id: string;
  volumeInfo: BookVolumeInfo;
  saleInfo: BookSaleInfo;
}
