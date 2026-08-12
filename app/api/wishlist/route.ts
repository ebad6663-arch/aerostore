import { NextResponse } from "next/server";

import { getWishlist } from "@/lib/actions/wishlist";

export async function GET() {
  try {
    const wishlist = await getWishlist();

    return NextResponse.json(
      wishlist.map((item) => ({
        id: item.id,
        productId: item.product.id,
        slug: item.product.slug,
        name: item.product.name,
        price: Number(item.product.price),
        category: item.product.category.name,
        image:
          item.product.images[0]?.url ??
          "/products/placeholder.png",
      }))
    );
  } catch {
    return NextResponse.json([]);
  }
}