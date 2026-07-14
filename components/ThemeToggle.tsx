"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Monitor,
  Check,
  ChevronDown,
  Palette,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ThemeToggle() {

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {

        setOpen(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  if (!mounted) return null;

  const options = [
    {
      value: "light",
      label: "Light",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      icon: Monitor,
    },
  ];

  const CurrentIcon =
    theme === "dark"
      ? Moon
      : theme === "light"
      ? Sun
      : Monitor;

  return (

    <div
      ref={dropdownRef}
      className="relative"
    >

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
      >

        <Palette
          size={18}
          className="text-blue-600"
        />

        <div className="flex flex-col items-start leading-none">

          <span className="text-xs text-slate-500 dark:text-slate-400">

            Appearance

          </span>

          <div className="mt-1 flex items-center gap-1">

            <CurrentIcon
              size={14}
              className="text-blue-600"
            />

            <span className="text-sm font-semibold capitalize text-slate-900 dark:text-white">

              {theme}

            </span>

          </div>

        </div>

        <ChevronDown
          size={16}
          className={`ml-1 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />

      </button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 12,
              scale: 0.96,
            }}
            transition={{
              duration: 0.18,
            }}
            className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >

            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">

              <h3 className="font-bold text-slate-900 dark:text-white">

                Appearance

              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                Choose your preferred theme.

              </p>

            </div>
                        {options.map((option) => {

              const Icon = option.icon;

              const active = theme === option.value;

              return (

                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-5 py-4 transition-all duration-200 ${
                    active
                      ? "bg-blue-50 dark:bg-blue-950/30"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        active
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >

                      <Icon size={18} />

                    </div>

                    <div className="text-left">

                      <div className="font-semibold text-slate-900 dark:text-white">

                        {option.label}

                      </div>

                      <div className="text-xs text-slate-500 dark:text-slate-400">

                        {option.value === "light" &&
                          "Bright appearance"}

                        {option.value === "dark" &&
                          "Easy on the eyes"}

                        {option.value === "system" &&
                          "Follow device settings"}

                      </div>

                    </div>

                  </div>

                  {active && (

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">

                      <Check size={16} />

                    </div>

                  )}

                </button>

              );

            })}

            <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">

              Your preference is automatically saved.

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

}