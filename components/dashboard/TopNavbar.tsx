"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";

import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";

interface TopNavbarProps {
  onMenuClick: () => void;
}

export default function TopNavbar({
  onMenuClick,
}: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Mobile logo/menu */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <Link
          href="/"
          aria-label="Go to TopStudyTutor home"
        >
          <Image
            src="/logos/logo-horizontal.png"
            alt="TopStudyTutor"
            width={150}
            height={40}
            priority
            className="h-auto w-[125px] object-contain sm:w-[145px]"
          />
        </Link>
      </div>

      {/* Desktop spacer */}
      <div className="hidden lg:block" />

      {/* Right side */}
      <div className="flex items-center gap-1 sm:gap-2">
        <NotificationDropdown />

        <Link
          href="/dashboard/support"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600 sm:h-11 sm:w-11"
          title="Support"
          aria-label="Support"
        >
          <MessageCircle size={20} />
        </Link>

        <div className="ml-1 hidden h-10 w-px bg-gray-200 sm:block sm:ml-2" />

        <UserDropdown />
      </div>
    </header>
  );
}