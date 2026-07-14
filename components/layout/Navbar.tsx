"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  X,
} from "lucide-react";

import Logo from "./Logo";
import ThemeToggle from "../ThemeToggle";

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
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/90 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90"
          : "bg-transparent"
      }`}
    >

      <div className="container-page flex h-28 items-center justify-between">

        {/* Logo */}

        <Logo />

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 text-[16px] font-medium lg:flex">

          <button className="group flex items-center gap-1 transition hover:text-blue-600 dark:text-slate-200">

            Writing Help

            <ChevronDown
              size={16}
              className="transition duration-300 group-hover:rotate-180"
            />

          </button>

          <button className="group flex items-center gap-1 transition hover:text-blue-600 dark:text-slate-200">

            Subjects

            <ChevronDown
              size={16}
              className="transition duration-300 group-hover:rotate-180"
            />

          </button>

          <Link
            href="#"
            className="transition hover:text-blue-600 dark:text-slate-200"
          >

            Samples

          </Link>

          <Link
            href="#"
            className="transition hover:text-blue-600 dark:text-slate-200"
          >

            Pricing

          </Link>

          <Link
            href="#"
            className="transition hover:text-blue-600 dark:text-slate-200"
          >

            Blog

          </Link>

          <Link
            href="#"
            className="transition hover:text-blue-600 dark:text-slate-200"
          >

            Contact

          </Link>

        </nav>

        {/* Right Side */}

        <div className="hidden items-center gap-4 lg:flex">

          <button className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">

            <Search
              size={20}
              className="text-slate-700 dark:text-slate-300"
            />

          </button>

          
                    {/* Login */}

          <Link
            href="/login"
            className="font-semibold text-slate-700 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >

            Login

          </Link>

          {/* Sign Up */}

          <Link
            href="/register"
            className="btn-secondary px-5 py-2"
          >

            Sign Up

          </Link>

       {/* Order Button */}

<Link
  href="/submit"
  className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
>

  Order Now

</Link>

{/* Appearance */}

<div className="ml-2">

  <ThemeToggle />

</div>
</div>

        

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >

          {mobileOpen ? (

            <X className="text-slate-900 dark:text-white" />

          ) : (

            <Menu className="text-slate-900 dark:text-white" />

          )}

        </button>

      </div>

      {/* Mobile Navigation */}

      {mobileOpen && (

        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">

          <div className="container-page flex flex-col gap-5 py-8">

            <Link
              href="#"
              className="transition hover:text-blue-600 dark:text-slate-300"
            >
              Writing Help
            </Link>

            <Link
              href="#"
              className="transition hover:text-blue-600 dark:text-slate-300"
            >
              Subjects
            </Link>

            <Link
              href="#"
              className="transition hover:text-blue-600 dark:text-slate-300"
            >
              Samples
            </Link>

            <Link
              href="#"
              className="transition hover:text-blue-600 dark:text-slate-300"
            >
              Pricing
            </Link>

            <Link
              href="#"
              className="transition hover:text-blue-600 dark:text-slate-300"
            >
              Blog
            </Link>

            <Link
              href="#"
              className="transition hover:text-blue-600 dark:text-slate-300"
            >
              Contact
            </Link>

            <div className="divider my-2" />

            <Link
              href="/login"
              className="font-semibold transition hover:text-blue-600 dark:text-slate-300"
            >

              Login

            </Link>

            <Link
              href="/register"
              className="btn-secondary justify-center"
            >

              Sign Up

            </Link>

            <Link
              href="/submit"
              className="btn-primary justify-center bg-gradient-to-r from-orange-500 to-orange-600"
            >

              Order Now

            </Link>

          </div>

        </div>

      )}

    </header>

  );

};
