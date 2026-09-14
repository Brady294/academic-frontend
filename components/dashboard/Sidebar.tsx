"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

import { useAuthContext } from "@/contexts/AuthContext";

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
  const router = useRouter();

  const { logout } = useAuthContext();

  async function handleLogout() {
    try {
      await logout();

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white">

      {/* =====================================================
          LOGO
          Clicking the logo takes the student back to homepage
      ====================================================== */}
      <div className="flex h-20 items-center border-b border-gray-200 px-6">

        <Link
          href="/"
          className="block transition-opacity duration-200 hover:opacity-80"
          aria-label="TopStudyTutor Homepage"
        >
          <Image
            src="/logos/logo-horizontal.png"
            alt="TopStudyTutor"
            width={210}
            height={70}
            priority
            className="h-auto w-[210px] object-contain"
          />
        </Link>

      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">

        {menuItems.map((item) => {
          const Icon = item.icon;

          /*
           * Orders has sub-navigation
           */
          if (item.children) {
            const ordersActive = item.children.some(
              (child) => pathname === child.href
            );

            return (
              <div key={item.title} className="mb-4">

                <div
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${
                    ordersActive
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  <Icon size={20} />

                  <span>{item.title}</span>
                </div>

                <div className="ml-10 mt-1 space-y-1">

                  {item.children.map((child) => {
                    const active = pathname === child.href;

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                          active
                            ? "bg-blue-50 font-semibold text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <span>{child.title}</span>

                        <ChevronRight size={16} />
                      </Link>
                    );
                  })}

                </div>
              </div>
            );
          }

          /*
           * Normal navigation item
           */
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-blue-50 font-semibold text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

      {/* =====================================================
          LOGOUT
      ====================================================== */}
      <div className="border-t border-gray-200 p-4">

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />

          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}