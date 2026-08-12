export interface Product {
  id: string;

  name: string;
  slug: string;
  description: string | null;

  price: number;

  stock: number;

  sku: string;

  isFeatured: boolean;
  isActive: boolean;

  category: {
    id: string;
    name: string;
    slug: string;
  };

  images: {
    id?: string;
    url: string;
    publicId?: string;
    alt?: string | null;
  }[];
}