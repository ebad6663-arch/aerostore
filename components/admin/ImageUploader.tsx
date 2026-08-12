"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface UploadedImage {
  url: string;
  publicId: string;
}

interface Props {
  initialImages?: UploadedImage[];
  onChange(images: UploadedImage[]): void;

  title?: string;
  subtitle?: string;
  multiple?: boolean;
}

export default function ImageUploader({
  initialImages = [],
  onChange,
  title = "Upload Images",
  subtitle = "PNG, JPG or WEBP",
  multiple = true,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<UploadedImage[]>(
    initialImages
  );

  const [uploading, setUploading] = useState(false);

  async function upload(files: FileList) {
    setUploading(true);

    const uploaded: UploadedImage[] = [];

    const selectedFiles = multiple
      ? Array.from(files)
      : [files[0]];

    for (const file of selectedFiles) {
      if (!file) continue;

      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      if (!res.ok) continue;

      const image = await res.json();

      uploaded.push(image);
    }

    const all = multiple
      ? [
          ...images,
          ...uploaded.filter(
            (newImage) =>
              !images.some(
                (oldImage) =>
                  oldImage.publicId ===
                  newImage.publicId
              )
          ),
        ]
      : uploaded;

    setImages(all);

    onChange(all);

    setUploading(false);
  }

  return (
    <div className="space-y-5">
      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-700 bg-[#181818] p-12 transition hover:border-orange-500"
      >
        <Upload className="mb-4 h-10 w-10 text-orange-500" />

        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-neutral-400">
          {subtitle}
        </p>

        {uploading && (
          <p className="mt-4 text-orange-500">
            Uploading...
          </p>
        )}

        <input
          ref={inputRef}
          hidden
          multiple={multiple}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              upload(e.target.files);
            }
          }}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={`${image.publicId}-${index}`}
              className="relative h-48 overflow-hidden rounded-xl border border-neutral-700"
            >
              <div className="relative h-full w-full">
                <Image
                  src={image.url}
                  alt="Uploaded"
                  fill
                  className="object-cover"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const filtered = images.filter(
                    (i) =>
                      i.publicId !== image.publicId
                  );

                  setImages(filtered);

                  onChange(filtered);
                }}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white transition hover:bg-red-600"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}