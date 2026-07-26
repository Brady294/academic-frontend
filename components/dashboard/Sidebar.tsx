"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Place Order",
    href: "/dashboard/orders/new",
    icon: FileText,
  },
  {
    name: "My Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-red-600">
          TopStudyTutor
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  active
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </aside>
  );
}