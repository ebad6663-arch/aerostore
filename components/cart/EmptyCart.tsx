"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-10">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-500/20">
        <ShoppingBag
          size={42}
          className="text-orange-500"
        />
      </div>

      <h2
        style={{
          color: "#ffffff",
          fontSize: "32px",
          fontWeight: 700,
          marginTop: 24,
        }}
      >
        Your cart is empty
      </h2>

      <p
        style={{
          color: "#a3a3a3",
          marginTop: 12,
          textAlign: "center",
          maxWidth: 260,
        }}
      >
        Add some products to start shopping.
      </p>

      <Link
        href="/products"
        style={{
          marginTop: 30,
          background: "#f97316",
          color: "#fff",
          padding: "14px 28px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Continue Shopping
      </Link>
    </div>
  );
}