"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";

interface UploadedImage {
  url: string;
  publicId: string;
}

interface Props {
  initialImages?: UploadedImage[];
}

export default function ProductImageField({
  initialImages = [],
}: Props) {
  const [images, setImages] = useState(initialImages);

  return (
    <>
      <ImageUploader
        initialImages={images}
        onChange={(newImages) => {
          setImages(newImages);
        }}
      />

      <input
        type="hidden"
        name="images"
        value={JSON.stringify(images)}
      />
    </>
  );
}