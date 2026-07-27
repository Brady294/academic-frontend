"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  CreditCard,
  LifeBuoy,
  User,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    children: [
      {
        title: "New Order",
        href: "/dashboard/orders/new",
      },
      {
        title: "My Orders",
        href: "/dashboard/orders",
      },
    ],
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
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-200 flex flex-col">

      <div className="h-20 flex items-center px-8 border-b">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            T
          </div>

          <div>
            <h1 className="font-bold text-lg text-gray-900">
              TopStudyTutor
            </h1>

            <p className="text-sm text-gray-500">
              Student Portal
            </p>
          </div>

        </div>

      </div>

      <nav className="flex-1 py-6 px-4 overflow-y-auto">

        {menuItems.map((item) => {

          const Icon = item.icon;

          if (item.children) {
            return (
              <div key={item.title} className="mb-4">

                <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-semibold">

                  <Icon size={20} />

                  <span>{item.title}</span>

                </div>

                <div className="ml-10 space-y-2">

                  {item.children.map((child) => {

                    const active = pathname === child.href;

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 transition ${
                          active
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "hover:bg-gray-100 text-gray-600"
                        }`}
                      >
                        {child.title}

                        <ChevronRight size={16} />

                      </Link>
                    );
                  })}

                </div>

              </div>
            );
          }

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${
                active
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );

        })}

      </nav>

      <div className="border-t p-4">

        <button
          className="w-full flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-red-50 text-red-600 transition"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}