import { cookies } from "next/headers";

const COOKIE_NAME = "aero_admin";

export async function isAdminLoggedIn() {
  const cookieStore = await cookies();

  return cookieStore.get(COOKIE_NAME)?.value === "true";
}

export async function setAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}