"use client";

const notifications = [
  "Your account has been verified.",
  "Your latest order has been received.",
  "A writer will be assigned shortly.",
];

export default function Notifications() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Notifications
      </h2>

      <div className="space-y-4">

        {notifications.map((note, index) => (
          <div
            key={index}
            className="rounded-xl bg-gray-50 p-4"
          >
            {note}
          </div>
        ))}

      </div>

    </div>
  );
}