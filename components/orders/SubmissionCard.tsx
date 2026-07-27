"use client";

import {
  Download,
  CheckCircle2,
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
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        Completed Work
      </h2>

      {submissions.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
          No submission has been uploaded
          yet.
        </div>
      ) : (
        <div className="mt-6 space-y-4">

          {submissions.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-2xl border p-4"
            >
              <div className="flex items-center gap-4">

                <CheckCircle2 className="text-green-600" />

                <div>

                  <h3 className="font-semibold">
                    {file.file_name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Uploaded{" "}
                    {new Date(
                      file.created_at
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

              <a
                href={file.file_path}
                target="_blank"
                className="rounded-xl bg-green-600 px-4 py-2 text-white"
              >
                <Download
                  className="mr-2 inline"
                  size={16}
                />
                Download
              </a>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}