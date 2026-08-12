"use client";

import { Heart } from "lucide-react";

import useWishlist from "@/hooks/useWishlist";

interface WishlistButtonProps {
  productId: string;
}

export default function WishlistButton({
  productId,
}: WishlistButtonProps) {
  const {
    isWishlisted,
    toggle,
    loading,
  } = useWishlist();

  const liked = isWishlisted(productId);

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();

    toggle(productId);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur transition hover:scale-110 disabled:opacity-50"
    >
      <Heart
        className={`h-5 w-5 transition ${
          liked
            ? "fill-red-500 text-red-500"
            : "text-gray-600"
        }`}
      />
    </button>
  );
}