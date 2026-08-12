"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FooterNewsletter() {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#111111] px-8 py-14 md:px-14 md:py-16">

      <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="max-w-xl">

          <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-orange-400">
            NEWSLETTER
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-[-0.05em] text-white lg:text-5xl">
            Stay Updated
          </h2>

          <p className="mt-7 text-lg leading-9 text-neutral-500">
            Receive updates about new collections,
            exclusive releases and limited drops.
          </p>

        </div>

        {/* Right */}

        <form className="flex w-full max-w-xl flex-col gap-4 sm:flex-row">

          <input
            type="email"
            placeholder="Enter your email"
            className="h-14 flex-1 rounded-full border border-white/10 bg-[#0b0b0b] px-7 text-white placeholder:text-neutral-600 focus:border-orange-500 focus:outline-none"
          />

          <motion.button
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: .98,
            }}
            className="flex h-14 items-center justify-center gap-3 rounded-full bg-orange-500 px-8 text-sm font-semibold text-white transition hover:bg-orange-600"
          >

            Subscribe

            <ArrowRight size={17} />

          </motion.button>

        </form>

      </div>

    </section>
  );
}