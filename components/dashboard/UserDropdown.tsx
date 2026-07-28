"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
  LifeBuoy,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useAuthContext } from "@/contexts/AuthContext";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const {
    user,
    loading,
    logout,
  } = useAuthContext();

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        ref.current &&
        !ref.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  async function handleLogout() {
    await logout();

    router.replace("/login");

    router.refresh();
  }

  if (loading) {
    return (
      <div className="h-12 w-44 animate-pulse rounded-xl bg-gray-100" />
    );
  }

  const firstName =
    user?.name?.trim().split(" ")[0] ||
    "User";

  const initial =
    firstName.charAt(0).toUpperCase();

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-gray-50"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-base font-semibold text-white">
          {initial}
        </div>

        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold text-gray-900">
            {firstName}
          </p>

          <p className="text-xs text-gray-500">
            My Account
          </p>
        </div>

        <ChevronDown
          size={16}
          className={`hidden text-gray-500 transition duration-200 md:block ${
            open
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

          <div className="border-b border-gray-100 px-5 py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
                {initial}
              </div>

              <div>

                <p className="font-semibold text-gray-900">
                  {user?.name}
                </p>

                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>

              </div>

            </div>

          </div>

          <div className="py-2">

            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              onClick={() =>
                setOpen(false)
              }
            >
              <User size={18} />

              Profile

            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              onClick={() =>
                setOpen(false)
              }
            >
              <Settings size={18} />

              Settings

            </Link>

            <Link
              href="/dashboard/support"
              className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              onClick={() =>
                setOpen(false)
              }
            >
              <LifeBuoy size={18} />

              Support

            </Link>

          </div>

          <div className="border-t border-gray-100 p-2">

            <button
              onClick={
                handleLogout
              }
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />

              Logout

            </button>

          </div>

        </div>
      )}
    </div>
  );
}