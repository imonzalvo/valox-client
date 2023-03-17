export interface Product {
  id: string;
  title: string;
  description: string;
  price?: number;
  image?: string;
}

export interface Cart {
  items: {
    quantity?: number;
    id?: string;
    product?: Product;
  }[];
  shippingMethod?: {
    id?: string;
    title?: string;
    description?: string;
  };
  paymentMethod?: {
    id?: string;
    title?: string;
    description?: string;
  };
}
