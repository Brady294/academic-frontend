"use client";

import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  description?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color = "bg-red-600",
  description,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-gray-200 p-6 transition hover:shadow-lg">
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>

          {description && (
            <p className="mt-2 text-sm text-gray-500">
              {description}
            </p>
          )}

        </div>

        <div
          className={`${color} flex h-14 w-14 items-center justify-center rounded-xl text-white`}
        >
          <Icon size={28} />
        </div>

      </div>
    </div>
  );
}