"use client";

import {
  CheckCircle2,
  Download,
  Eye,
  FileCheck2,
  FileText,
  CalendarDays,
  UserCircle2,
} from "lucide-react";

interface Submission {
  id: number;
  file_name: string;
  file_path: string;
  created_at: string;
}

interface Props {
  submissions?: Submission[];
}

export default function SubmissionCard({
  submissions = [],
}: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

        <div>

          <h2 className="text-lg font-bold text-gray-900">
            Completed Work
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Files delivered by your assigned writer.
          </p>

        </div>

        {submissions.length > 0 && (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            {submissions.length}{" "}
            {submissions.length === 1
              ? "Submission"
              : "Submissions"}
          </span>
        )}

      </div>

      <div className="p-5">

        {submissions.length === 0 ? (

          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">

              <FileCheck2
                size={30}
                className="text-gray-400"
              />

            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              No Submission Yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Your completed assignment will
              appear here once it has been
              uploaded by your writer.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {submissions.map(
              (submission, index) => (

                <div
                  key={submission.id}
                  className="rounded-2xl border border-gray-200 p-4 transition-all duration-200 hover:border-emerald-200 hover:shadow-sm"
                >

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left */}

                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100">

                        <CheckCircle2
                          size={22}
                          className="text-emerald-600"
                        />

                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="truncate text-base font-semibold text-gray-900">
                            {submission.file_name}
                          </h3>

                          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                            Version{" "}
                            {index + 1}
                          </span>

                        </div>

                        <div className="mt-3 flex flex-wrap gap-5 text-sm text-gray-500">

                          <div className="flex items-center gap-2">

                            <CalendarDays
                              size={15}
                            />

                            {new Date(
                              submission.created_at
                            ).toLocaleString()}

                          </div>

                          <div className="flex items-center gap-2">

                            <UserCircle2
                              size={15}
                            />

                            Writer

                          </div>

                          <div className="flex items-center gap-2">

                            <FileText
                              size={15}
                            />

                            Ready for Download

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* Right */}

                    <div className="flex flex-wrap gap-2">

                      <a
                        href={
                          submission.file_path
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >

                        <Eye size={16} />

                        Preview

                      </a>

                      <a
                        href={
                          submission.file_path
                        }
                        download
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >

                        <Download size={16} />

                        Download

                      </a>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </section>
  );
}