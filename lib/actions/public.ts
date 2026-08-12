"use server";

import { prisma } from "@/lib/prisma";

export async function getPublicStoreSettings() {
  return prisma.storeSettings.findFirst({
    select: {
      karachiShipping: true,
      otherShipping: true,
      phone: true,
      whatsapp: true,
      supportEmail: true,
      address: true,
      instagram: true,
      facebook: true,
      tiktok: true,
      storeName: true,
      storeDescription: true,
    },
  });
}