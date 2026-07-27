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

  function fileIcon(file: File) {
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (
      ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(
        ext || ""
      )
    )
      return <ImageIcon className="text-blue-600" size={18} />;

    if (
      ["xls", "xlsx", "csv"].includes(ext || "")
    )
      return (
        <FileSpreadsheet
          className="text-green-600"
          size={18}
        />
      );

    if (
      ["zip", "rar", "7z"].includes(ext || "")
    )
      return (
        <FileArchive
          className="text-orange-600"
          size={18}
        />
      );

    return (
      <FileText className="text-gray-600" size={18} />
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

    setFiles((prev) => [...prev, ...validFiles]);
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
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-5">

        <h2 className="text-xl font-bold">
          Upload Files
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Assignment instructions, rubrics, datasets, lecture notes and supporting files.
        </p>

      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          processFiles(e.dataTransfer.files);
        }}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 transition ${
          dragging
            ? "border-blue-600 bg-blue-50"
            : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
        }`}
      >

        <div className="flex flex-col items-center text-center">

          <UploadCloud
            size={34}
            className="text-blue-600"
          />

          <h3 className="mt-3 font-semibold">
            Drag & Drop Files
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            or click to browse
          </p>

          <p className="mt-2 text-xs text-gray-400">
            PDF • DOC • DOCX • PPT • XLS • ZIP • Images • Max 20MB each
          </p>

        </div>

        <input
          hidden
          ref={inputRef}
          multiple
          type="file"
          onChange={(e) =>
            processFiles(e.target.files)
          }
        />

      </div>

      {files.length > 0 && (
        <>

          <div className="mt-5 flex items-center justify-between">

            <h3 className="font-semibold">
              Selected Files
            </h3>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
              {files.length} file{files.length > 1 ? "s" : ""} •{" "}
              {(totalSize / 1024 / 1024).toFixed(2)} MB
            </span>

          </div>

          <div className="mt-4 space-y-2">

            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-gray-200 p-3 hover:bg-gray-50"
              >

                <div className="flex items-center gap-3">

                  {fileIcon(file)}

                  <div>

                    <p className="text-sm font-medium">
                      {file.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>

              </div>
            ))}

          </div>

        </>
      )}

    </section>
  );
}