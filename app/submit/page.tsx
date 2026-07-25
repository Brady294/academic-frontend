"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SubmitPage() {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Submit Assignment
        </h1>
      </div>
    </ProtectedRoute>
  );
}