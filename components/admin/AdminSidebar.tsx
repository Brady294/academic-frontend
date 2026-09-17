"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
};

function Icon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
      {children}
    </span>
  );
}

const navigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <Icon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </Icon>
    ),
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: (
      <Icon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M6 2.75h9.5L20 7.25V21a1.25 1.25 0 0 1-1.25 1.25H6A1.25 1.25 0 0 1 4.75 21V4A1.25 1.25 0 0 1 6 2.75Z" />
          <path d="M15 2.75V7.5h4.75" />
          <path d="M8 11h8" />
          <path d="M8 15h8" />
          <path d="M8 19h5" />
        </svg>
      </Icon>
    ),
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: (
      <Icon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="4" />
          <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </Icon>
    ),
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: (
      <Icon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <rect x="2.75" y="5" width="18.5" height="14" rx="2" />
          <path d="M2.75 9h18.5" />
          <path d="M6.5 14h4" />
          <path d="M15.5 14h2" />
        </svg>
      </Icon>
    ),
  },
  {
    label: "Revisions",
    href: "/admin/revisions",
    icon: (
      <Icon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v6h6" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      </Icon>
    ),
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: (
      <Icon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M20.5 11.5a7.5 7.5 0 0 1-8 7.5 8.6 8.6 0 0 1-3.7-.85L4 20l1.85-4.05A7.35 7.35 0 0 1 4.5 11.5 7.5 7.5 0 1 1 20.5 11.5Z" />
          <path d="M8 11.5h.01" />
          <path d="M12 11.5h.01" />
          <path d="M16 11.5h.01" />
        </svg>
      </Icon>
    ),
  },
  {
    label: "Files",
    href: "/admin/files",
    icon: (
      <Icon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H10l2 2h6.5A1.5 1.5 0 0 1 20 6.5v13A1.5 1.5 0 0 1 18.5 21h-13A1.5 1.5 0 0 1 4 19.5v-15Z" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </svg>
      </Icon>
    ),
  },
  {
    label: "Notifications",
    href: "/admin/notifications",
    icon: (
      <Icon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      </Icon>
    ),
  },
];

const managementNavigation: NavItem[] = [
  {
    label: "Pricing",
    href: "/admin/pricing",
    icon: (
      <Icon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10" />
          <path d="M15 9.5c-.7-.7-1.7-1-3-1-1.7 0-3 .8-3 2s1.3 2 3 2 3 .8 3 2-1.3 2-3 2c-1.3 0-2.3-.3-3-1" />
        </svg>
      </Icon>
    ),
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (
      <Icon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="m19.4 15 .1.1a2 2 0 0 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4V19a2 2 0 0 1-4 0v-.2A2 2 0 0 0 5.8 17l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1A2 2 0 0 0 1.6 11H1.5a2 2 0 0 1 0-4h.2A2 2 0 0 0 3 3.6l-.1-.1A2 2 0 0 1 5.7.7l.1.1A2 2 0 0 0 9.2 1.4V1.2a2 2 0 0 1 4 0v.2a2 2 0 0 0 3.4 1.4l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1A2 2 0 0 0 20.8 9h.2a2 2 0 0 1 0 4h-.2a2 2 0 0 0-1.4 2Z" />
        </svg>
      </Icon>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderNavigation = (items: NavItem[]) =>
    items.map((item) => {
      const active = isActive(item.href);

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileOpen(false)}
          className={[
            "group flex items-center gap-3 rounded-xl px-3 py-2.5",
            "text-sm font-medium transition-all duration-200",
            active
              ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
          ].join(" ")}
        >
          <span
            className={
              active
                ? "text-white"
                : "text-slate-500 group-hover:text-blue-600"
            }
          >
            {item.icon}
          </span>

          <span className="flex-1">{item.label}</span>

          {item.badge && (
            <span
              className={[
                "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                active
                  ? "bg-white/20 text-white"
                  : "bg-blue-50 text-blue-600",
              ].join(" ")}
            >
              {item.badge}
            </span>
          )}
        </Link>
      );
    });

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        aria-label="Open admin navigation"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close admin navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col",
          "border-r border-slate-200 bg-white",
          "transition-transform duration-300 ease-out",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex h-[76px] items-center border-b border-slate-100 px-5">
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-600/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.7"
                className="h-6 w-6"
              >
                <path d="M4 5.5 12 3l8 2.5L12 8 4 5.5Z" />
                <path d="M6 7.5v6.2c0 1.3 2.7 3.3 6 3.3s6-2 6-3.3V7.5" />
                <path d="M20 6v7" />
                <path d="M18.5 16.5c.8.8 1.2 1.8 1.2 3" />
              </svg>
            </div>

            <div className="min-w-0">
              <div className="truncate text-[17px] font-bold tracking-tight text-slate-950">
                TopStudy<span className="text-blue-600">Tutor</span>
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Admin Portal
              </div>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Close admin navigation"
            onClick={() => setMobileOpen(false)}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="m6 6 12 12" />
              <path d="m18 6-12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div>
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Overview
            </p>

            <nav className="space-y-1">
              {renderNavigation(navigation)}
            </nav>
          </div>

          <div className="mt-8">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Management
            </p>

            <nav className="space-y-1">
              {renderNavigation(managementNavigation)}
            </nav>
          </div>
        </div>

        {/* Admin profile / footer */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
              A
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                Administrator
              </p>

              <p className="truncate text-xs text-slate-500">
                Platform Admin
              </p>
            </div>

            <span
              className="h-2.5 w-2.5 rounded-full bg-emerald-500"
              title="Online"
            />
          </div>
        </div>
      </aside>
    </>
  );
}