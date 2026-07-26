"use client";

import { useRef, useState } from "react";
import { Upload, FileText } from "lucide-react";

import { uploadOrderFile } from "@/services/uploadService";

interface Props {
  orderId: number;
  onUploadSuccess?: () => void;
}

export default function FileUpload({
  orderId,
  onUploadSuccess,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [file, setFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  async function upload() {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      setUploading(true);

      await uploadOrderFile(
        orderId,
        file
      );

      alert("File uploaded successfully.");

      setFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      onUploadSuccess?.();

    } catch (error: any) {

      alert(
        error?.response?.data?.message ||
        "Upload failed."
      );

    } finally {

      setUploading(false);

    }
  }

  return (
    <div className="bg-white rounded-xl border shadow p-6">

      <div className="flex items-center gap-3 mb-5">

        <Upload className="w-6 h-6 text-red-600" />

        <h2 className="text-xl font-semibold">
          Upload Files
        </h2>

      </div>

      <input
        ref={inputRef}
        type="file"
        onChange={(e) =>
          setFile(
            e.target.files
              ? e.target.files[0]
              : null
          )
        }
        className="w-full border rounded-lg p-3"
      />

      {file && (

        <div className="mt-5 flex items-center gap-3">

          <FileText
            className="text-red-600"
            size={20}
          />

          <div>

            <p className="font-medium">
              {file.name}
            </p>

            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)}
              {" "}MB
            </p>

          </div>

        </div>

      )}

      <button
        onClick={upload}
        disabled={uploading}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 py-3 disabled:opacity-50"
      >
        {uploading
          ? "Uploading..."
          : "Upload File"}
      </button>

    </div>
  );
}