import { NextResponse } from "next/server";
import { getPublicStoreSettings } from "@/lib/actions/public";

export async function GET() {
  const settings = await getPublicStoreSettings();

  return NextResponse.json(settings);
}