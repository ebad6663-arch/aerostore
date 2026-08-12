import { NextResponse } from "next/server";

import { getCart } from "@/lib/actions/cart";

export async function GET() {
  try {
    const cart = await getCart();

    const count =
      cart?.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ) ?? 0;

    return NextResponse.json({
      count,
    });
  } catch {
    return NextResponse.json({
      count: 0,
    });
  }
}