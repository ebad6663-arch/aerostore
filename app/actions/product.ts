"use server";

import { prisma } from "@/lib/prisma";
import { ProductSchema } from "@/lib/validation";
import { generateSlug } from "@/lib/slug";
import { generateSKU } from "@/lib/sku";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const validated = ProductSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
  });

  const images = JSON.parse(
    (formData.get("images") as string) || "[]"
  );

  await prisma.product.create({
    data: {
      ...validated,
      slug: await generateSlug(validated.name),
      sku: await generateSKU(),

      images: {
        create: images.map(
          (image: { url: string; publicId: string }, index: number) => ({
            url: image.url,
            publicId: image.publicId,
            sortOrder: index,
          })
        ),
      },
    },
  });

  revalidatePath("/dashboard/products");

  redirect("/dashboard/products");
}