"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getStoreSettings() {
  let settings = await prisma.storeSettings.findFirst();

  if (!settings) {
    settings = await prisma.storeSettings.create({
      data: {
  id: crypto.randomUUID(),

  storeName: "AEROSTORE",

  storeDescription: "Premium Custom Keychains",

  karachiShipping: 250,

  otherShipping: 400,

  codEnabled: true,
},
    });
  }

  return settings;
}

export async function updateStoreSettings(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.storeSettings.update({
    where: {
      id,
    },
    data: {
      storeName: formData.get("storeName") as string,
      storeDescription: formData.get("storeDescription") as string,

      supportEmail: formData.get("supportEmail") as string,
      phone: formData.get("phone") as string,
      whatsapp: formData.get("whatsapp") as string,

      address: formData.get("address") as string,

      instagram: formData.get("instagram") as string,
      facebook: formData.get("facebook") as string,
      tiktok: formData.get("tiktok") as string,

      heroBadge: formData.get("heroBadge") as string,

heroTitle: formData.get("heroTitle") as string,

heroSubtitle: formData.get("heroSubtitle") as string,

heroButtonText: formData.get("heroButtonText") as string,

heroButtonLink: formData.get("heroButtonLink") as string,

heroImage: formData.get("heroImage") as string,

newsletterTitle: formData.get("newsletterTitle") as string,

newsletterDescription: formData.get("newsletterDescription") as string,

      karachiShipping: Number(
        formData.get("karachiShipping")
      ),

      otherShipping: Number(
        formData.get("otherShipping")
      ),

      featuredProductsLimit: Number(
        formData.get("featuredProductsLimit")
      ),

      newArrivalsLimit: Number(
        formData.get("newArrivalsLimit")
      ),

      codEnabled:
        formData.get("codEnabled") === "on",
    },
  });

  revalidatePath("/dashboard/settings");
}