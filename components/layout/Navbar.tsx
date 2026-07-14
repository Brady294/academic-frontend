"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-8">

        <Logo />

        {/* Desktop Navigation */}

        <nav className="hidden lg:flex items-center gap-8 text-[16px] font-medium">

          <button className="group flex items-center gap-1 transition hover:text-blue-600">
            Writing Help
            <ChevronDown
              size={16}
              className="transition group-hover:rotate-180"
            />
          </button>

          <button className="group flex items-center gap-1 transition hover:text-blue-600">
            Subjects
            <ChevronDown
              size={16}
              className="transition group-hover:rotate-180"
            />
          </button>

          <Link href="#" className="hover:text-blue-600">
            Samples
          </Link>

          <Link href="#" className="hover:text-blue-600">
            Pricing
          </Link>

          <Link href="#" className="hover:text-blue-600">
            Blog
          </Link>

          <Link href="#" className="hover:text-blue-600">
            Contact
          </Link>

        </nav>

        {/* Right */}

        <div className="hidden lg:flex items-center gap-5">

          <button className="text-slate-700 hover:text-blue-600 transition">
            <Search size={20} />
          </button>

          <Link
            href="/login"
            className="font-semibold hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl border border-blue-600 px-5 py-2 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            Sign Up
          </Link>

          <Link
            href="/submit"
            className="rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600 hover:scale-105"
          >
            Order Now
          </Link>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

      </div>

      {mobileOpen && (

        <div className="lg:hidden border-t bg-white">

          <div className="flex flex-col gap-5 p-6">

            <Link href="#">Writing Help</Link>

            <Link href="#">Subjects</Link>

            <Link href="#">Samples</Link>

            <Link href="#">Pricing</Link>

            <Link href="#">Blog</Link>

            <Link href="#">Contact</Link>

            <Link href="/login">Login</Link>

            <Link href="/register">Sign Up</Link>

            <Link
              href="/submit"
              className="rounded-lg bg-orange-500 py-3 text-center font-semibold text-white"
            >
              Order Now
            </Link>

          </div>

        </div>

      )}

    </header>
  );
}