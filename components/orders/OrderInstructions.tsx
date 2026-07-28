"use client";

import { useMemo, useState } from "react";
import {
  Clipboard,
  Check,
  FileText,
  BookOpenText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Props {
  instructions: string;
}

export default function OrderInstructions({
  instructions,
}: Props) {
  const [expanded, setExpanded] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const LIMIT = 650;

  const hasInstructions =
    instructions.trim().length > 0;

  const isLong =
    instructions.length > LIMIT;

  const displayText =
    expanded || !isLong
      ? instructions
      : instructions.slice(0, LIMIT) + "...";

  const wordCount = useMemo(() => {
    if (!hasInstructions) return 0;

    return instructions
      .trim()
      .split(/\s+/).length;
  }, [instructions, hasInstructions]);

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  async function copyInstructions() {
    if (!hasInstructions) return;

    await navigator.clipboard.writeText(
      instructions
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-lg font-bold text-gray-900">
            Assignment Instructions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review the instructions provided for this
            assignment.
          </p>

        </div>

        <div className="flex flex-wrap gap-2">

          <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">

            <BookOpenText
              size={16}
              className="text-blue-600"
            />

            <span className="text-sm font-medium text-gray-700">
              {wordCount} Words
            </span>

          </div>

          <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">

            <FileText
              size={16}
              className="text-indigo-600"
            />

            <span className="text-sm font-medium text-gray-700">
              {readingTime} min read
            </span>

          </div>

          <button
            onClick={copyInstructions}
            disabled={!hasInstructions}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? (
              <>
                <Check
                  size={16}
                  className="text-green-600"
                />
                Copied
              </>
            ) : (
              <>
                <Clipboard
                  size={16}
                  className="text-blue-600"
                />
                Copy
              </>
            )}

          </button>

        </div>

      </div>

      {/* Content */}

      <div className="p-5">

        {hasInstructions ? (
          <>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

              <div className="prose prose-sm max-w-none whitespace-pre-wrap break-words leading-7 text-gray-700">

                {displayText}

              </div>

            </div>

            {isLong && (

              <div className="mt-4 flex justify-center">

                <button
                  onClick={() =>
                    setExpanded(!expanded)
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  {expanded ? (
                    <>
                      <ChevronUp size={16} />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Show More
                    </>
                  )}

                </button>

              </div>

            )}

          </>
        ) : (

          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">

              <FileText
                size={24}
                className="text-gray-400"
              />

            </div>

            <h3 className="mt-4 text-base font-semibold text-gray-900">
              No Instructions Available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              No assignment instructions have been
              provided for this order yet.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}