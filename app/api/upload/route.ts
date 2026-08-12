import { NextResponse } from "next/server";
import { uploadProductImage } from "@/lib/upload";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    const image = await uploadProductImage(file);

    return NextResponse.json(image);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 }
    );
  }
}