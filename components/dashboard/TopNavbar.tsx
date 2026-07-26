"use client";

import { Bell, Menu, Search } from "lucide-react";

type TopNavbarProps = {
  onMenuClick?: () => void;
};

export default function TopNavbar({
  onMenuClick,
}: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
        >
          <Menu size={24} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500">
            Welcome back to TopStudyTutor
          </p>
        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden lg:flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-56"
          />

        </div>

        {/* Notifications */}
        <button className="relative rounded-xl border border-gray-200 p-3 hover:bg-gray-100 transition">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-600"></span>

        </button>

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2 hover:bg-gray-100 transition">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white font-semibold">

            J

          </div>

          <div className="hidden text-left sm:block">

            <p className="text-sm font-semibold text-gray-900">
              John
            </p>

            <p className="text-xs text-gray-500">
              Student
            </p>

          </div>

        </button>

      </div>

    </header>
  );
}