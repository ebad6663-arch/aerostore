import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q") ?? "";

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const products = await prisma.product.findMany({
    where: {
      deletedAt: null,
      isActive: true,
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },

    include: {
      category: true,
      images: {
        take: 1,
        orderBy: {
          sortOrder: "asc",
        },
      },
    },

    take: 10,
  });

  return NextResponse.json(products);
}