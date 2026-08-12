"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });
}

export async function getActiveTeamMembers() {
  return prisma.teamMember.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}

export async function getFounder() {
  return prisma.teamMember.findFirst({
    where: {
      isFounder: true,
      isActive: true,
    },
  });
}

export async function createTeamMember(formData: FormData) {
  const image = JSON.parse(
    (formData.get("image") as string) || "[]"
  );

  await prisma.teamMember.create({

  data: {

    id: crypto.randomUUID(),

    updatedAt: new Date(),

    name: formData.get("name") as string,

      role: formData.get("role") as string,

      department:
        (formData.get("department") as string) ||
        "Working Team",

      bio: (formData.get("bio") as string) || "",

      image:
        image[0]?.url ??
        "/placeholder-avatar.png",

      skills: (
        (formData.get("skills") as string) || ""
      )
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),

      instagram:
        (formData.get("instagram") as string) ||
        null,

      facebook:
        (formData.get("facebook") as string) ||
        null,

      linkedin:
        (formData.get("linkedin") as string) ||
        null,

      sortOrder: Number(
        formData.get("sortOrder") || 0
      ),

      isFounder:
        formData.get("isFounder") === "on",

      isActive:
        formData.get("isActive") === "on",
    },
  });

  revalidatePath("/dashboard/team");
  revalidatePath("/about");

  redirect("/dashboard/team");
}

export async function updateTeamMember(
  id: string,
  formData: FormData
) {
  const image = JSON.parse(
    (formData.get("image") as string) || "[]"
  );

  const current =
    await prisma.teamMember.findUnique({
      where: {
        id,
      },
    });

  await prisma.teamMember.update({
    where: {
      id,
    },
    data: {
      name: formData.get("name") as string,

      role: formData.get("role") as string,

      department:
        (formData.get("department") as string) ||
        "Working Team",

      bio: (formData.get("bio") as string) || "",

      image:
        image[0]?.url ??
        current?.image ??
        "/placeholder-avatar.png",

      skills: (
        (formData.get("skills") as string) || ""
      )
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),

      instagram:
        (formData.get("instagram") as string) ||
        null,

      facebook:
        (formData.get("facebook") as string) ||
        null,

      linkedin:
        (formData.get("linkedin") as string) ||
        null,

      sortOrder: Number(
        formData.get("sortOrder") || 0
      ),

      isFounder:
        formData.get("isFounder") === "on",

      isActive:
        formData.get("isActive") === "on",
    },
  });

  revalidatePath("/dashboard/team");
  revalidatePath("/about");

  redirect("/dashboard/team");
}

export async function deleteTeamMember(
  id: string
) {
  await prisma.teamMember.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/team");
  revalidatePath("/about");
}