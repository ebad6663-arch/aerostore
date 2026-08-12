"use server";

import { prisma } from "@/lib/prisma";

export async function getCustomers() {
  return prisma.user.findMany({
    include: {
      orders: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}