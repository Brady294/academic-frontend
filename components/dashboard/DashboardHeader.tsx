"use client";

export default function DashboardHeader() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white">

      <p className="text-sm opacity-90">
        Welcome Back
      </p>

      <h1 className="text-4xl font-bold mt-2">
        Student Dashboard
      </h1>

      <p className="mt-4 text-blue-100 max-w-2xl">
        Manage your assignments, payments and support requests from one place.
      </p>

    </section>
  );
}