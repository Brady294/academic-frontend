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
  X,
} from "lucide-react";

import { useAuthContext } from "@/contexts/AuthContext";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

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

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { logout } = useAuthContext();

  async function handleLogout() {
    try {
      await logout();

      onClose();

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  function handleNavigation() {
    onClose();
  }

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          border-r border-gray-200
          bg-white
          shadow-xl
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:shadow-none
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-100 px-6">
          <Link
            href="/"
            onClick={handleNavigation}
            className="flex items-center"
            aria-label="Go to TopStudyTutor home"
          >
            <Image
              src="/logos/logo-horizontal.png"
              alt="TopStudyTutor"
              width={180}
              height={48}
              priority
              className="h-auto w-[165px] object-contain"
            />
          </Link>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.children) {
              return (
                <div
                  key={item.title}
                  className="mb-4"
                >
                  <div className="flex items-center gap-3 px-4 py-3 font-semibold text-gray-700">
                    <Icon size={20} />

                    <span>{item.title}</span>
                  </div>

                  <div className="ml-10 space-y-1">
                    {item.children.map((child) => {
                      const active =
                        pathname === child.href;

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={handleNavigation}
                          className={`
                            flex items-center justify-between
                            rounded-xl px-4 py-3
                            text-sm
                            transition
                            ${
                              active
                                ? "bg-blue-50 font-semibold text-blue-600"
                                : "text-gray-600 hover:bg-gray-100"
                            }
                          `}
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

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href!}
                onClick={handleNavigation}
                className={`
                  mb-2 flex items-center gap-3
                  rounded-xl px-4 py-3
                  transition
                  ${
                    active
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-gray-100 p-4">
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
    </>
  );
}