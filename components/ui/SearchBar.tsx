"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search orders...",
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`relative transition-all duration-200 ${
        focused ? "w-[460px]" : "w-[380px]"
      }`}
    >
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-12 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}