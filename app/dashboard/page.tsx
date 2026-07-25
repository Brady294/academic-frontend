"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Client Dashboard
        </h1>
      </div>
    </ProtectedRoute>
  );
}