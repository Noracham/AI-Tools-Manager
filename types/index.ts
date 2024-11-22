export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string[];
  price: string;
  favorite: boolean;
  url?: string;
  tutorial?: string;
}

export type Category = string;