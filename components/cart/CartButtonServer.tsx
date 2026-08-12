import { ShoppingCart } from "lucide-react";

import { getCart } from "@/lib/actions/cart";

interface CartButtonServerProps {
  onClick?: () => void;
}

export default async function CartButtonServer({
  onClick,
}: CartButtonServerProps) {
  const cart = await getCart();

  const totalItems =
    cart?.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    ) ?? 0;

  return (
    <button
      onClick={onClick}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:border-orange-500 hover:bg-orange-50"
    >
      <ShoppingCart size={22} />

      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}