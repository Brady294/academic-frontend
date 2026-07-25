"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>
      </div>
    </ProtectedRoute>
  );
}