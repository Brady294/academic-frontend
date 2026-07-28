"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";

export default function TopNavbar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-end border-b border-gray-200 bg-white px-8">

      <div className="flex items-center gap-2">

        <NotificationDropdown />

        <Link
          href="/dashboard/support"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600"
          title="Support"
        >
          <MessageCircle size={21} />
        </Link>

        <div className="ml-2 h-10 w-px bg-gray-200" />

        <UserDropdown />

      </div>

    </header>
  );
}