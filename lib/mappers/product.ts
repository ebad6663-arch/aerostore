import type { Product } from "@/types/product";

type PrismaProduct = Awaited<
  ReturnType<typeof import("@/lib/actions/products").getProducts>
>[number];

export function mapProduct(product: PrismaProduct): Product {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    isFeatured: product.isFeatured,
    sku: product.sku,
    price: Number(product.price),

    stock: product.stock,

    category: {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
    },

    images: product.images.map((img) => ({
      id: img.id,
      url: img.url,
    })),

    isActive: product.isActive,
  };
}