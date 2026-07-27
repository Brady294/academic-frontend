"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import SearchBar from "../ui/SearchBar";

export default function TopNavbar() {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <div className="flex items-center gap-5">

        <NotificationDropdown />

        <button
          className="rounded-xl p-2 transition hover:bg-gray-100"
        >
          <MessageCircle size={22} />
        </button>

        <UserDropdown />

      </div>

    </header>
  );
}