"use client";

import Link from "next/link";
import { Heart, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import CartButton from "@/components/cart/CartButton";
import UserMenu from "@/components/navbar/UserMenu";
import useWishlist from "@/hooks/useWishlist";

interface NavActionsProps {
  onMobileMenuOpen: () => void;
  onCartOpen: () => void;
}

export default function NavActions({
  onMobileMenuOpen,
  onCartOpen,
}: NavActionsProps) {
  const { count } = useWishlist();

  const iconClass =
    "relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#111111]/90 text-neutral-400 transition-all duration-300 hover:border-orange-500/30 hover:bg-[#171717] hover:text-white";

  return (
    <div className="flex items-center gap-2">

      {/* Wishlist */}

      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        <Link
          href="/wishlist"
          className={iconClass}
        >
          <Heart size={17} />

          <AnimatePresence>
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>

      {/* Cart */}

      <CartButton
        onClick={onCartOpen}
      />

      {/* User */}

      <UserMenu />

      {/* Mobile */}

      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={onMobileMenuOpen}
        className={`${iconClass} lg:hidden`}
      >
        <Menu size={18} />
      </motion.button>

    </div>
  );
}