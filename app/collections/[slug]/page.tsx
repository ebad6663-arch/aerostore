import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {

  const products = await prisma.product.findMany({
  where: {
    category: {
      slug: params.slug,
    },
    deletedAt: null,
  },
  include: {
    images: true,
    category: true,
  },
});

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-black capitalize">
        {params.slug} Collection
      </h1>

      <div className="grid gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-4">

        {products.map((product) => (
          <div key={product.id}
          className="rounded-3xl bg-[#111] p-5">

            <Image
src={product.images[0]?.url ?? "/placeholder.png"}
width={400}
height={400}
alt={product.name}
className="h-64 w-full object-contain"
/>

            <h2 className="mt-4 font-bold">
              {product.name}
            </h2>

            <p className="text-orange-500 font-bold">
  PKR {Number(product.price).toLocaleString()}
</p>

          </div>
        ))}

      </div>

    </main>
  );
}