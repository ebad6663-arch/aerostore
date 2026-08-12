"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Heart,
  LogOut,
  Package,
  Settings,
  User,
} from "lucide-react";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          href="/login"
          className="inline-flex h-11 items-center rounded-full border border-white/10 bg-[#111111] px-5 text-sm font-medium text-white transition hover:border-orange-500/30"
        >
          Sign In
        </Link>
      </motion.div>
    );
  }

  const initials =
    session.user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full outline-none"
        >
          <Avatar className="h-11 w-11 border border-white/10">
            <AvatarImage
              src={session.user.image ?? ""}
              alt={session.user.name ?? ""}
            />

            <AvatarFallback className="bg-[#181818] text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 rounded-3xl border border-white/10 bg-[#101010] p-2 text-white"
      >
        <div className="px-4 py-4">
          <p className="font-semibold">
            {session.user.name}
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            {session.user.email}
          </p>
        </div>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem asChild>
          <Link
            href="/account"
            className="flex items-center gap-3 rounded-2xl px-3 py-3"
          >
            <User size={18} />
            My Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/orders"
            className="flex items-center gap-3 rounded-2xl px-3 py-3"
          >
            <Package size={18} />
            Orders
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/wishlist"
            className="flex items-center gap-3 rounded-2xl px-3 py-3"
          >
            <Heart size={18} />
            Wishlist
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-2xl px-3 py-3"
          >
            <Settings size={18} />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          className="rounded-2xl px-3 py-3 text-red-400 focus:bg-red-500/10"
        >
          <LogOut size={18} />
          <span className="ml-3">
            Logout
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}