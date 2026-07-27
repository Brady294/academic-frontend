"use client";

import { useEffect, useRef, useState } from "react";
import {
  Download,
  Upload,
  Trash2,
  FileText,
} from "lucide-react";

import uploadService from "@/services/uploadService";

interface UploadedFile {
  id: number;
  file_name: string;
  file_path: string;
  file_size: number;
}

interface Props {
  orderId: number;
}

export default function OrderFiles({
  orderId,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<
    UploadedFile[]
  >([]);

  const [uploading, setUploading] =
    useState(false);

  async function loadFiles() {
    try {
      const data =
        await uploadService.getFiles(orderId);

      setFiles(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  async function upload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files) return;

    setUploading(true);

    try {
      for (const file of Array.from(
        e.target.files
      )) {
        await uploadService.upload(
          orderId,
          file
        );
      }

      await loadFiles();
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: number) {
    await uploadService.deleteFile(id);

    loadFiles();
  }

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Files
        </h2>

        <button
          onClick={() =>
            inputRef.current?.click()
          }
          className="rounded-xl bg-blue-600 px-5 py-3 text-white"
        >
          <Upload
            className="mr-2 inline"
            size={18}
          />
          Upload
        </button>

      </div>

      <input
        hidden
        ref={inputRef}
        type="file"
        multiple
        onChange={upload}
      />

      {uploading && (
        <p className="mt-5 text-blue-600">
          Uploading...
        </p>
      )}

      <div className="mt-6 space-y-4">

        {files.length === 0 && (
          <div className="rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
            No uploaded files.
          </div>
        )}

        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between rounded-2xl border p-4"
          >
            <div className="flex items-center gap-4">

              <FileText
                className="text-blue-600"
              />

              <div>

                <h3 className="font-medium">
                  {file.file_name}
                </h3>

                <p className="text-sm text-gray-500">
                  {(
                    file.file_size /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </p>

              </div>

            </div>

            <div className="flex gap-2">

              <a
                href={file.file_path}
                target="_blank"
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <Download size={18} />
              </a>

              <button
                onClick={() =>
                  remove(file.id)
                }
                className="rounded-lg p-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}