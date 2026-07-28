"use client";

import { useEffect, useRef, useState } from "react";
import {
  Download,
  Upload,
  Trash2,
  FileText,
  FileImage,
  FileArchive,
  FileSpreadsheet,
  FileCode2,
  File,
  Eye,
  HardDrive,
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
    } catch (error) {
      console.error(error);
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

    await loadFiles();
  }

  function formatSize(size: number) {
    if (size < 1024)
      return `${size} Bytes`;

    if (size < 1024 * 1024)
      return `${(
        size / 1024
      ).toFixed(1)} KB`;

    return `${(
      size /
      1024 /
      1024
    ).toFixed(2)} MB`;
  }

  function getFileIcon(name: string) {
    const ext =
      name.split(".").pop()?.toLowerCase() ??
      "";

    switch (ext) {
      case "pdf":
        return (
          <FileText
            size={20}
            className="text-red-600"
          />
        );

      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "webp":
        return (
          <FileImage
            size={20}
            className="text-emerald-600"
          />
        );

      case "zip":
      case "rar":
      case "7z":
        return (
          <FileArchive
            size={20}
            className="text-amber-600"
          />
        );

      case "xls":
      case "xlsx":
      case "csv":
        return (
          <FileSpreadsheet
            size={20}
            className="text-green-600"
          />
        );

      case "js":
      case "ts":
      case "tsx":
      case "html":
      case "css":
      case "java":
      case "py":
      case "cpp":
      case "c":
        return (
          <FileCode2
            size={20}
            className="text-blue-600"
          />
        );

      default:
        return (
          <File
            size={20}
            className="text-gray-600"
          />
        );
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="text-lg font-bold text-gray-900">
            Files
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload assignment materials,
            references and completed work.
          </p>

        </div>

        <button
          onClick={() =>
            inputRef.current?.click()
          }
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Upload size={18} />

          {uploading
            ? "Uploading..."
            : "Upload Files"}

        </button>

      </div>

      <input
        hidden
        multiple
        ref={inputRef}
        type="file"
        onChange={upload}
      />

      <div className="p-5">

        {files.length === 0 ? (

          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">

              <Upload
                size={28}
                className="text-blue-600"
              />

            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              No Files Uploaded
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Upload assignment instructions,
              lecture notes, marking rubrics,
              datasets, reference papers or
              any supporting documents for
              your writer.
            </p>

            <button
              onClick={() =>
                inputRef.current?.click()
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Upload size={18} />

              Upload First File

            </button>

          </div>

        ) : (

          <div className="space-y-3">

            {files.map((file) => (

              <div
                key={file.id}
                className="group flex flex-col gap-4 rounded-2xl border border-gray-200 p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-sm md:flex-row md:items-center md:justify-between"
              >

                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">

                    {getFileIcon(
                      file.file_name
                    )}

                  </div>

                  <div className="min-w-0">

                    <h3 className="truncate font-semibold text-gray-900">
                      {file.file_name}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-500">

                      <span className="inline-flex items-center gap-1">

                        <HardDrive
                          size={14}
                        />

                        {formatSize(
                          file.file_size
                        )}

                      </span>

                    </div>

                  </div>

                </div>

                <div className="flex items-center gap-2">

                  <a
                    href={file.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <Eye size={16} />

                    Preview

                  </a>

                  <a
                    href={file.file_path}
                    download
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <Download size={16} />

                    Download

                  </a>

                  <button
                    onClick={() =>
                      remove(file.id)
                    }
                    className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}