"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Download,
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileImage,
  Presentation,
  File,
  Calendar,
  FolderOpen,
} from "lucide-react";

import downloadService from "@/services/downloadService";

import { Download as DownloadType } from "@/types/download";

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<
    DownloadType[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadDownloads();
  }, []);

  async function loadDownloads() {
    try {
      setLoading(true);

      const data =
        await downloadService.getDownloads();

      setDownloads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredDownloads =
    useMemo(() => {
      return downloads.filter((file) => {
        const value = `${file.title}
        ${file.file_name}
        ${file.order_title ?? ""}`
          .toLowerCase();

        return value.includes(
          search.toLowerCase()
        );
      });
    }, [downloads, search]);

  function getIcon(
    fileName: string
  ) {
    const extension =
      fileName
        .split(".")
        .pop()
        ?.toLowerCase();

    switch (extension) {
      case "pdf":
        return (
          <FileText
            className="text-red-500"
            size={34}
          />
        );

      case "doc":

      case "docx":
        return (
          <FileText
            className="text-blue-600"
            size={34}
          />
        );

      case "xls":

      case "xlsx":
        return (
          <FileSpreadsheet
            className="text-green-600"
            size={34}
          />
        );

      case "ppt":

      case "pptx":
        return (
          <Presentation
            className="text-orange-500"
            size={34}
          />
        );

      case "zip":

      case "rar":
        return (
          <FileArchive
            className="text-yellow-600"
            size={34}
          />
        );

      case "png":

      case "jpg":

      case "jpeg":
        return (
          <FileImage
            className="text-purple-600"
            size={34}
          />
        );

      default:
        return (
          <File
            className="text-gray-500"
            size={34}
          />
        );
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <h1 className="text-4xl font-bold">

          Downloads

        </h1>

        <p className="mt-3 text-gray-500">

          Download completed assignments,
          reports and attached files.

        </p>

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search downloads..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full rounded-2xl border bg-white py-4 pl-12 pr-5 shadow-sm outline-none focus:border-blue-600"
        />

      </div>

      {/* Loading */}

      {loading && (

        <div className="flex h-72 items-center justify-center">

          Loading downloads...

        </div>

      )}

      {/* Empty */}

      {!loading &&
        filteredDownloads.length ===
          0 && (

          <div className="rounded-3xl border bg-white py-24 shadow-sm">

            <FolderOpen
              className="mx-auto text-gray-300"
              size={70}
            />

            <h2 className="mt-6 text-center text-2xl font-bold">

              No Downloads

            </h2>

            <p className="mt-3 text-center text-gray-500">

              Completed assignments
              will appear here.

            </p>

          </div>

        )}

      {/* Grid */}

      {!loading &&
        filteredDownloads.length >
          0 && (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredDownloads.map(
              (file) => (

                <div
                  key={file.id}
                  className="rounded-3xl border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex items-center justify-between">

                    {getIcon(
                      file.file_name
                    )}

                    <button
                      onClick={() =>
                        downloadService.download(
                          file.id
                        )
                      }
                      className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700"
                    >

                      <Download
                        size={18}
                      />

                    </button>

                  </div>

                  <h2 className="mt-6 line-clamp-2 text-lg font-bold">

                    {file.title}

                  </h2>

                  <p className="mt-2 truncate text-sm text-gray-500">

                    {file.file_name}

                  </p>

                  <div className="mt-6 space-y-3">

                    <div className="flex justify-between text-sm">

                      <span className="text-gray-500">

                        Assignment

                      </span>

                      <span className="font-medium">

                        {file.order_title ??
                          "-"}

                      </span>

                    </div>

                    <div className="flex justify-between text-sm">

                      <span className="text-gray-500">

                        Size

                      </span>

                      <span>

                        {file.file_size}

                      </span>

                    </div>

                    <div className="flex items-center justify-between text-sm">

                      <span className="text-gray-500">

                        Date

                      </span>

                      <span className="flex items-center gap-2">

                        <Calendar
                          size={15}
                        />

                        {new Date(
                          file.created_at
                        ).toLocaleDateString()}

                      </span>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

    </div>
  );
}