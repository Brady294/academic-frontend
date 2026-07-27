"use client";

import { useState } from "react";

interface Props {
  instructions: string;
}

export default function OrderInstructions({
  instructions,
}: Props) {
  const [expanded, setExpanded] =
    useState(false);

  const LIMIT = 600;

  const long =
    instructions.length > LIMIT;

  const text =
    expanded || !long
      ? instructions
      : instructions.slice(0, LIMIT) + "...";

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        Instructions
      </h2>

      <div className="prose mt-6 max-w-none whitespace-pre-wrap text-gray-700">
        {text || "No instructions provided."}
      </div>

      {long && (
        <button
          onClick={() =>
            setExpanded(!expanded)
          }
          className="mt-6 font-semibold text-blue-600 hover:text-blue-700"
        >
          {expanded
            ? "Show Less"
            : "Show More"}
        </button>
      )}

    </section>
  );
}