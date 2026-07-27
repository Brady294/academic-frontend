"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  ImageIcon,
  FileSpreadsheet,
  FileArchive,
  Trash2,
} from "lucide-react";

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export default function FileUpload({
  files,
  setFiles,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  function getFileIcon(file: File) {
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (
      ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(
        ext || ""
      )
    ) {
      return (
        <ImageIcon
          size={18}
          className="text-blue-600"
        />
      );
    }

    if (
      ["xls", "xlsx", "csv"].includes(
        ext || ""
      )
    ) {
      return (
        <FileSpreadsheet
          size={18}
          className="text-green-600"
        />
      );
    }

    if (
      ["zip", "rar", "7z"].includes(
        ext || ""
      )
    ) {
      return (
        <FileArchive
          size={18}
          className="text-orange-600"
        />
      );
    }

    return (
      <FileText
        size={18}
        className="text-gray-600"
      />
    );
  }

  function processFiles(fileList: FileList | null) {
    if (!fileList) return;

    const incoming = Array.from(fileList);

    const validFiles = incoming.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} exceeds 20MB.`);
        return false;
      }

      const exists = files.some(
        (f) =>
          f.name === file.name &&
          f.size === file.size
      );

      return !exists;
    });

    setFiles((prev) => [
      ...prev,
      ...validFiles,
    ]);
  }

  function remove(index: number) {
    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  const totalSize = files.reduce(
    (sum, file) => sum + file.size,
    0
  );

  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-gray-100 px-6 py-5">

        <h2 className="text-xl font-semibold text-gray-900">
          Supporting Files
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload assignment instructions,
          rubrics, lecture notes,
          datasets or any supporting
          documents.
        </p>

      </div>

      <div className="p-6">

        {/* Upload Area */}

        <div
          onClick={() =>
            inputRef.current?.click()
          }
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() =>
            setDragging(false)
          }
          onDrop={(e) => {
            e.preventDefault();

            setDragging(false);

            processFiles(
              e.dataTransfer.files
            );
          }}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${
            dragging
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
          }`}
        >

          <UploadCloud
            size={34}
            className="mx-auto text-blue-600"
          />

          <h3 className="mt-3 font-semibold text-gray-900">
            Drag & Drop Files
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            or click to browse
          </p>

          <p className="mt-3 text-xs text-gray-400">
            PDF • DOC • DOCX • PPT • XLS •
            ZIP • Images
          </p>

          <input
            hidden
            multiple
            ref={inputRef}
            type="file"
            onChange={(e) =>
              processFiles(
                e.target.files
              )
            }
          />

        </div>

        {/* Files */}

        {files.length > 0 && (

          <>

            <div className="mt-6 flex items-center justify-between">

              <h3 className="font-semibold text-gray-900">
                Selected Files
              </h3>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">

                {files.length} file
                {files.length > 1
                  ? "s"
                  : ""}

                {" • "}

                {(
                  totalSize /
                  1024 /
                  1024
                ).toFixed(2)}
                MB

              </span>

            </div>

            <div className="mt-4 space-y-2">

              {files.map(
                (
                  file,
                  index
                ) => (

                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">

                        {getFileIcon(
                          file
                        )}

                      </div>

                      <div>

                        <p className="text-sm font-medium text-gray-900">

                          {file.name}

                        </p>

                        <p className="text-xs text-gray-500">

                          {(
                            file.size /
                            1024 /
                            1024
                          ).toFixed(
                            2
                          )}{" "}
                          MB

                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        remove(
                          index
                        )
                      }
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                    >

                      <Trash2
                        size={16}
                      />

                    </button>

                  </div>

                )
              )}

            </div>

          </>

        )}

      </div>

    </section>
  );
}