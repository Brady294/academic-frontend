"use client";

import { LogOut, Settings, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    window.location.href = "/login";
  }

  return (
    <div className="relative" ref={ref}>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3"
      >
        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          J
        </div>

        <div className="text-left">
          <p className="font-semibold">Student</p>
          <p className="text-sm text-gray-500">
            My Account
          </p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-64 rounded-2xl border bg-white shadow-xl overflow-hidden z-50">

          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50"
          >
            <User size={18} />

            Profile
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50"
          >
            <Settings size={18} />

            Settings
          </Link>

          <button
            onClick={logout}
            className="w-full text-left flex items-center gap-3 px-5 py-4 hover:bg-red-50 text-red-600"
          >
            <LogOut size={18} />

            Logout
          </button>

        </div>
      )}

    </div>
  );
}