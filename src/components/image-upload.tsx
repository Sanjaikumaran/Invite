"use client";

import { useState } from "react";

export default function ImageStorage({
  imageData,
  onChange,
}: {
  imageData: string | undefined;
  onChange: (data: string) => void;
}) {
  const [image, setImage] = useState<string | undefined>(imageData);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;

      onChange(base64);
      setImage(base64);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <label
        className="
        group relative flex h-72 w-full cursor-pointer
        items-center justify-center overflow-hidden
        rounded-2xl border-2 border-dashed
        border-slate-300 bg-slate-50
        transition hover:border-blue-500
      "
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

        {!image ? (
          <div className="text-center">
            <div className="mb-3 text-5xl">📷</div>

            <p className="font-semibold text-slate-700">Upload Image</p>

            <p className="mt-1 text-sm text-slate-500">Click to select</p>
          </div>
        ) : (
          <>
            <img
              src={image}
              alt="uploaded"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div
              className="
              absolute inset-0
              flex items-center justify-center
              bg-black/50
              opacity-0
              transition
              group-hover:opacity-100
            "
            >
              <div
                className="
                rounded-xl bg-white/90
                px-4 py-2
                text-sm font-medium
                text-slate-900
              "
              >
                Click to change
              </div>
            </div>
          </>
        )}
      </label>
    </div>
  );
}
