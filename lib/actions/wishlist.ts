"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getUser() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getWishlist() {
  const user = await getUser();

  return prisma.wishlist.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: {
        include: {
          images: true,
          category: true,
        },
      },
    },
  });
}

export async function isInWishlist(productId: string) {
  const user = await getUser();

  const item = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId: user.id,
        productId,
      },
    },
  });

  return !!item;
}

export async function toggleWishlist(productId: string) {
  const user = await getUser();

  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId: user.id,
        productId,
      },
    },
  });

  if (existing) {
    await prisma.wishlist.delete({
      where: {
        id: existing.id,
      },
    });
  } else {
    await prisma.wishlist.create({
      data: {
        userId: user.id,
        productId,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/wishlist");

  return true;
}