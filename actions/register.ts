"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import {
  RegisterSchema,
  RegisterSchemaType,
} from "@/schemas/registerSchema";

export async function registerUser(data: RegisterSchemaType) {
  const validated = RegisterSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: "Invalid form data.",
    };
  }

  const { name, email, password } = validated.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Email already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Account created successfully.",
  };
}