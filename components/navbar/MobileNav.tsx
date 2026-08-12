"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function MobileNav({
  open,
  onClose,
}: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed right-0 top-0 z-50 flex h-screen w-[340px] flex-col border-l border-white/10 bg-[#0d0d0d]"
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b border-white/10 px-8 py-7">
              <div>
                <h2 className="text-2xl font-black tracking-[-0.05em] text-white">
                  AERO
                </h2>

                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-neutral-500">
                  Premium Store
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#151515] transition hover:border-orange-500/40"
              >
                <X
                  size={18}
                  className="text-white"
                />
              </button>
            </div>

            {/* Links */}

            <nav className="flex flex-1 flex-col px-8 py-10">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className="border-b border-white/5 py-5 text-lg font-medium text-neutral-300 transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Footer */}

            <div className="border-t border-white/10 p-8">
              <p className="text-sm leading-7 text-neutral-500">
                Premium anime collectibles,
                designed for collectors who
                appreciate quality.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}