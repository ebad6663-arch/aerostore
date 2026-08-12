import { prisma } from "@/lib/prisma";

export async function generateSKU() {
  const lastProduct = await prisma.product.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      sku: true,
    },
  });

  if (!lastProduct) {
    return "AERO-000001";
  }

  const lastNumber = Number(
    lastProduct.sku.replace("AERO-", "")
  );

  const nextNumber = lastNumber + 1;

  return `AERO-${nextNumber.toString().padStart(6, "0")}`;
}