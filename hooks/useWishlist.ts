"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toggleWishlist } from "@/lib/actions/wishlist";

export interface WishlistItem {
  id: string;
  productId: string;

  product: {
    id: string;
    slug: string;
    name: string;
    price: number;

    category: {
      name: string;
    };

    images: {
      url: string;
    }[];
  };
}

export default function useWishlist() {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery<WishlistItem[]>({
    queryKey: ["wishlist"],

    queryFn: async () => {
      const res = await fetch("/api/wishlist");

      if (!res.ok) {
        throw new Error("Failed to load wishlist");
      }

      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: toggleWishlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });

  return {
    wishlist: data,

    loading: isLoading,

    isWishlisted(productId: string) {
      return data.some(
        (item) => item.productId === productId
      );
    },

    toggle(productId: string) {
      mutation.mutate(productId);
    },

    count: data.length,
  };
}