"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex">
      <ul className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] p-1.5">

        {links.map((link) => {

          const active =
            pathname === link.href ||
            (link.href !== "/" &&
              pathname.startsWith(link.href));

          return (
            <li
              key={link.name}
              className="relative"
            >
              <Link
                href={link.href}
                className="relative block"
              >
                {active && (
                  <motion.div
                    layoutId="navbar-active"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 36,
                    }}
                    className="absolute inset-0 rounded-full bg-orange-500"
                  />
                )}

                <motion.span
                  whileHover={{
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`relative z-10 flex h-10 items-center rounded-full px-6 text-[14px] transition-all duration-300 ${
                    active
                      ? "font-semibold text-white"
                      : "font-medium text-neutral-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </motion.span>
              </Link>
            </li>
          );
        })}

      </ul>
    </nav>
  );
}