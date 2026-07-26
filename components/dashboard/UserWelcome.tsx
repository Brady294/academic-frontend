"use client";

export default function UserWelcome() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white p-8 shadow-lg">

      <h1 className="text-3xl font-bold">
        Welcome back, John 👋
      </h1>

      <p className="mt-3 text-red-100 max-w-2xl">
        Manage your academic orders, upload files, monitor progress,
        communicate with your writer, and download completed work
        from one place.
      </p>

    </div>
  );
}