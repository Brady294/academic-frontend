"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Trash2,
  FileText,
  Loader2,
} from "lucide-react";

import {
  UploadedFile,
  getOrderFiles,
  deleteOrderFile,
} from "@/services/uploadService";

interface Props {
  orderId: number;
  refreshKey?: number;
}

export default function FileList({
  orderId,
  refreshKey = 0,
}: Props) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(
    null
  );

  async function loadFiles() {
    try {
      setLoading(true);

      const data = await getOrderFiles(orderId);

      setFiles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFiles();
  }, [orderId, refreshKey]);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Delete this uploaded file?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteOrderFile(id);

      await loadFiles();

      alert("File deleted successfully.");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to delete file."
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border shadow p-6">
        <div className="flex items-center gap-3">
          <Loader2 className="animate-spin" />
          <span>Loading uploaded files...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow p-6 mt-8">
      <h2 className="text-xl font-semibold mb-6">
        Uploaded Files
      </h2>

      {files.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No files uploaded yet.
        </div>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <FileText
                  className="text-red-600"
                  size={28}
                />

                <div>
                  <p className="font-medium">
                    {file.file_name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {(file.file_size / 1024 / 1024).toFixed(2)}
                    {" MB • "}
                    {new Date(
                      file.uploaded_at
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${file.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download size={18} />
                  Download
                </a>

                <button
                  onClick={() =>
                    handleDelete(file.id)
                  }
                  disabled={deletingId === file.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                >
                  {deletingId === file.id ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={18} />
                  )}

                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}