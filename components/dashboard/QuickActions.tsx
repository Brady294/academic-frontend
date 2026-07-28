"use client";

import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  FolderOpen,
  LifeBuoy,
  Plus,
} from "lucide-react";

const actions = [
  {
    title: "New Order",
    description: "Submit a new assignment and receive a writer quickly.",
    href: "/dashboard/orders/new",
    icon: Plus,
    color: "bg-blue-100 text-blue-600",
    hover: "hover:border-blue-200",
  },
  {
    title: "My Orders",
    description: "Track progress, upload files and communicate with writers.",
    href: "/dashboard/orders",
    icon: FolderOpen,
    color: "bg-green-100 text-green-600",
    hover: "hover:border-green-200",
  },
  {
    title: "Payments",
    description: "View invoices and securely manage your payments.",
    href: "/dashboard/payments",
    icon: CreditCard,
    color: "bg-purple-100 text-purple-600",
    hover: "hover:border-purple-200",
  },
  {
    title: "Support",
    description: "Need assistance? Contact our support team anytime.",
    href: "/dashboard/support",
    icon: LifeBuoy,
    color: "bg-orange-100 text-orange-600",
    hover: "hover:border-orange-200",
  },
];

export default function QuickActions() {
  return (
    <section>

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Frequently used shortcuts.
          </p>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className={`group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${action.hover}`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${action.color}`}
              >
                <Icon size={26} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {action.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {action.description}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-4">

                <span className="text-sm font-semibold text-blue-600">
                  Open
                </span>

                <ArrowRight
                  size={18}
                  className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
                />

              </div>

            </Link>
          );
        })}

      </div>

    </section>
  );
}