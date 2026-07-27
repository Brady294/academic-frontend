"use client";

import Link from "next/link";
import {
  Plus,
  FolderOpen,
  CreditCard,
  LifeBuoy,
} from "lucide-react";

const actions = [
  {
    title: "New Order",
    href: "/dashboard/orders/new",
    icon: Plus,
  },
  {
    title: "My Orders",
    href: "/dashboard/orders",
    icon: FolderOpen,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: LifeBuoy,
  },
];

export default function QuickActions() {
  return (
    <section>

      <h2 className="text-2xl font-bold mb-5">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {actions.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 hover:-translate-y-1 transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

                <Icon className="text-orange-600" />

              </div>

              <h3 className="font-bold text-lg mt-5">
                {item.title}
              </h3>

            </Link>
          );
        })}

      </div>

    </section>
  );
}