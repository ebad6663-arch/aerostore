"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Brand() {
  return (
    <Link
      href="/"
      className="group flex items-center"
    >
      <motion.div
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-3"
      >
        {/* Logo */}

        <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">

          <div className="absolute h-5 w-5 rounded-full bg-orange-500 blur-lg opacity-50" />

          <div className="relative h-3 w-3 rounded-full bg-orange-500" />

        </div>

        {/* Text */}

        <div className="leading-none">

          <h1 className="text-[28px] font-black tracking-[-0.08em] text-white transition-colors duration-300 group-hover:text-orange-400">
            AERO
          </h1>

          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500">
            PREMIUM COLLECTIBLES
          </p>

        </div>
      </motion.div>
    </Link>
  );
}