"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search } from "lucide-react";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: {
    url: string;
  }[];
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <motion.div
        whileHover={{ y: -1 }}
        className="flex h-11 w-[300px] items-center rounded-full border border-white/10 bg-[#111111]/90 px-4 backdrop-blur-2xl transition-all duration-300 focus-within:border-orange-500/40"
      >
        {loading ? (
          <Loader2
            size={16}
            className="mr-3 animate-spin text-neutral-500"
          />
        ) : (
          <Search
            size={16}
            className="mr-3 text-neutral-500"
          />
        )}

        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search..."
          className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
        />
      </motion.div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 8,
            }}
            transition={{
              duration: 0.18,
            }}
            className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f0f]/95 shadow-[0_30px_80px_rgba(0,0,0,.55)] backdrop-blur-3xl"
          >
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={() => {
                  setQuery("");
                  setResults([]);
                }}
                className="flex items-center gap-4 border-b border-white/5 p-4 transition hover:bg-white/[0.03] last:border-none"
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-[#181818]">
                  <Image
                    src={
                      product.images?.[0]?.url ??
                      "/placeholder-product.png"
                    }
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-medium text-white">
                    {product.name}
                  </h4>

                  <p className="mt-1 text-sm text-orange-400">
                    PKR{" "}
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}