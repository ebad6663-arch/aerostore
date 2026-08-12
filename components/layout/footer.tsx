"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";

const socials = [
  { icon: FaInstagram, href: "#" },
  { icon: FaFacebookF, href: "#" },
  { icon: FaXTwitter, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#090909]">

      {/* Glow */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/5 blur-[220px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">

        {/* CTA */}

        <div className="mb-20 overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-b from-[#171717] to-[#101010] p-10 md:p-14">

          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">

            <div>

              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-400">
                JOIN THE COLLECTION
              </span>

              <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
                Premium Collectibles.
                <br />
                Built To Last.
              </h2>

            </div>

            <Link
              href="/products"
              className="inline-flex h-14 items-center rounded-full bg-orange-500 px-8 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Shop Now
            </Link>

          </div>

        </div>

        {/* Footer Grid */}

        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}

          <div>

            <h2 className="text-5xl font-black tracking-[-0.06em] text-white">
              AERO
              <span className="text-orange-500">.</span>
            </h2>

            <p className="mt-7 max-w-sm leading-8 text-neutral-400">
              Premium anime collectibles crafted for collectors
              who appreciate exceptional quality, timeless design,
              and meticulous attention to detail.
            </p>

            <div className="mt-10 flex gap-4">

              {socials.map(({ icon: Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#111111] text-neutral-400 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  <Icon size={16} />
                </Link>
              ))}

            </div>

          </div>

          {/* Shop */}

          <div>

            <h3 className="text-lg font-bold text-white">
              Shop
            </h3>

            <div className="mt-7 space-y-4">

              <Link href="/products" className="block text-neutral-400 transition hover:text-orange-400">
                All Products
              </Link>

              <Link href="/collections" className="block text-neutral-400 transition hover:text-orange-400">
                Collections
              </Link>

              <Link href="/wishlist" className="block text-neutral-400 transition hover:text-orange-400">
                Wishlist
              </Link>

              <Link href="/contact" className="block text-neutral-400 transition hover:text-orange-400">
                Contact
              </Link>

            </div>

          </div>

          {/* Support */}

          <div>

            <h3 className="text-lg font-bold text-white">
              Support
            </h3>

            <div className="mt-7 space-y-4">

              <Link href="/shipping" className="block text-neutral-400 transition hover:text-orange-400">
                Shipping
              </Link>

              <Link href="/returns" className="block text-neutral-400 transition hover:text-orange-400">
                Returns
              </Link>

              <Link href="/privacy-policy" className="block text-neutral-400 transition hover:text-orange-400">
                Privacy Policy
              </Link>

              <Link href="/terms-of-service" className="block text-neutral-400 transition hover:text-orange-400">
                Terms
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-lg font-bold text-white">
              Contact
            </h3>

            <div className="mt-7 space-y-5">

              <div className="flex items-center gap-4 text-neutral-400">

                <MapPin
                  size={18}
                  className="text-orange-400"
                />

                Karachi, Pakistan

              </div>

              <div className="flex items-center gap-4 text-neutral-400">

                <Mail
                  size={18}
                  className="text-orange-400"
                />

                hello@aerostore.com

              </div>

              <div className="flex items-center gap-4 text-neutral-400">

                <Phone
                  size={18}
                  className="text-orange-400"
                />

                +92 300 1234567

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-neutral-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} AERO. All rights reserved.
          </p>

          <p>
            Minimal • Premium • Timeless
          </p>

        </div>

      </div>

    </footer>
  );
}