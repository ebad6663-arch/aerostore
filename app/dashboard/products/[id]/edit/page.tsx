import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/lib/actions/products";
import ProductImageField from "@/components/admin/ProductImageField";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
  where: {
    id,
  },

  include: {
    images: {
      orderBy: {
        sortOrder: "asc",
      },
    },
  },
});

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Edit Product
        </h1>

        <p className="mt-2 text-neutral-400">
          Update your product information.
        </p>
      </div>

      <form
        action={updateProduct}
        className="space-y-8 rounded-2xl border border-white/10 bg-[#111111] p-8"
      >
        <input
          type="hidden"
          name="id"
          value={product.id}
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-neutral-300">
              Product Name
            </label>

            <input
              name="name"
              defaultValue={product.name}
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-neutral-300">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              defaultValue={product.description ?? ""}
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Price
            </label>

            <input
              type="number"
              name="price"
              defaultValue={Number(product.price)}
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              defaultValue={product.stock}
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-neutral-300">
              Category
            </label>

            <select
              name="categoryId"
              defaultValue={product.categoryId}
              className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white"
            >
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
  <label className="block text-sm text-neutral-300">
    Product Images
  </label>

  <ProductImageField
  initialImages={product.images.map((image) => ({
    url: image.url,
    publicId: image.publicId,
  }))}
/>

</div>

        <div className="flex justify-end">
          <button
            className="rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}