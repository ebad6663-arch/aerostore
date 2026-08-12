import Link from "next/link";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  stock: number;
  images: {
    url: string;
  }[];
}

interface Props {
  products: Product[];
}

export default function LowStock({
  products,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111]">

      <div className="flex items-center justify-between border-b border-white/10 p-7">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Low Stock
          </h2>

          <p className="mt-2 text-neutral-400">
            Products that should be restocked soon.
          </p>

        </div>

        <Link
          href="/dashboard/products"
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-orange-400 transition hover:border-orange-500 hover:bg-orange-500/10"
        >
          Manage
        </Link>

      </div>

      {products.length === 0 ? (

        <div className="flex flex-col items-center justify-center p-14">

          <AlertTriangle
            size={46}
            className="mb-5 text-green-400"
          />

          <h3 className="text-lg font-bold text-white">
            Everything Looks Good
          </h3>

          <p className="mt-2 text-center text-neutral-400">
            All products have healthy inventory levels.
          </p>

        </div>

      ) : (

        <div className="divide-y divide-white/10">

          {products.map((product) => (

            <div
              key={product.id}
              className="flex items-center justify-between p-5 transition hover:bg-white/[0.03]"
            >

              <div className="flex items-center gap-4">

                <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-[#181818]">

                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-neutral-500">
                      No Image
                    </div>
                  )}

                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    Inventory Alert
                  </p>

                </div>

              </div>

              <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-bold text-red-400">
                {product.stock} Left
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}