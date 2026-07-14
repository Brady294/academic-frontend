"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  FileText,
} from "lucide-react";

export default function HeroCalculator() {

  const [workType, setWorkType] = useState<"pages" | "words">("pages");

  const [academicLevel, setAcademicLevel] = useState("");

  const [deadline, setDeadline] = useState("");

  const [spacing, setSpacing] = useState("Double");

  const [quantity, setQuantity] = useState("");

  return (

    <motion.div
      initial={{
        opacity: 0,
        x: 60,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="relative"
    >

      <motion.div
        whileHover={{
          y: -4,
        }}
        transition={{
          duration: 0.25,
        }}
        className="card p-8"
      >

        {/* Heading */}

        <div>

          <h2 className="card-title text-3xl">

            Calculate Your Price

          </h2>

          <p className="section-subtitle mt-3 leading-7">

            Receive an instant quotation based on your academic level,
            deadline and work size before placing your order.

          </p>

        </div>

        {/* Academic Level */}

        <div className="mt-8">

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

            <GraduationCap
              size={18}
              className="text-blue-600"
            />

            Academic Level

          </label>

          <select
            value={academicLevel}
            onChange={(e) => setAcademicLevel(e.target.value)}
            className="select"
          >

            <option value="">
              Select Academic Level
            </option>

            <option>
              High School
            </option>

            <option>
              College
            </option>

            <option>
              Undergraduate
            </option>

            <option>
              Masters
            </option>

            <option>
              PhD
            </option>

          </select>

        </div>

        {/* Deadline */}

        <div className="mt-6">

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

            <Calendar
              size={18}
              className="text-blue-600"
            />

            Deadline

          </label>

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input"
          />

        </div>

        {/* Work Size */}

        <div className="card mt-8 rounded-2xl bg-slate-50/70 p-6 dark:bg-slate-800/40">

          <div className="flex items-center gap-2">

            <BookOpen
              size={20}
              className="text-blue-600"
            />

            <h3 className="card-title text-lg">

              Work Size

            </h3>

          </div>

          <p className="card-text mt-2 text-sm">

            Choose whether your assignment will be measured
            in pages or words.

          </p>

          {/* Toggle */}

          <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">

            <button
              type="button"
              onClick={() => setWorkType("pages")}
              className={`py-3 text-sm font-semibold transition-all duration-300 ${
                workType === "pages"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >

              Pages

            </button>

            <button
              type="button"
              onClick={() => setWorkType("words")}
              className={`py-3 text-sm font-semibold transition-all duration-300 ${
                workType === "words"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >

              Words

            </button>

          </div>

          {/* Spacing */}

          <div className="mt-6">

            <label className="mb-2 text-sm font-semibold">

              Spacing

            </label>

            <select
              value={spacing}
              onChange={(e) => setSpacing(e.target.value)}
              className="select"
            >

              <option>Double</option>

              <option>1.5 Spacing</option>

              <option>Single</option>

            </select>

          </div>

          {/* Quantity */}

          <div className="mt-6">

            <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

              <FileText
                size={18}
                className="text-blue-600"
              />

              {workType === "pages"
                ? "Number of Pages"
                : "Number of Words"}

            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={
                workType === "pages"
                  ? "Enter number of pages"
                  : "Enter number of words"
              }
              className="input"
            />

            {/* Live Conversion */}

            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800 dark:bg-blue-950/40"
            >

              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">

                {quantity === ""
                  ? workType === "pages"
                    ? "1 Page ≈ 275 Words (Double Spacing)"
                    : "275 Words ≈ 1 Page (Double Spacing)"
                  : workType === "pages"
                  ? `≈ ${
                      spacing === "Double"
                        ? Number(quantity) * 275
                        : spacing === "1.5 Spacing"
                        ? Number(quantity) * 365
                        : Number(quantity) * 550
                    } Words`
                  : `≈ ${
                      spacing === "Double"
                        ? (Number(quantity) / 275).toFixed(1)
                        : spacing === "1.5 Spacing"
                        ? (Number(quantity) / 365).toFixed(1)
                        : (Number(quantity) / 550).toFixed(1)
                    } Pages`}

              </p>

            </motion.div>

          </div>

        </div>

        {/* Estimated Price */}
                <motion.div
          whileHover={{
            scale: 1.02,
          }}
          transition={{
            duration: 0.25,
          }}
          className="card mt-8 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-7 dark:border-blue-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950"
        >

          <div className="flex items-center justify-between">

            <div>

              <h3 className="card-title">

                Estimated Price

              </h3>

              <p className="card-text mt-2 text-sm">

                Your quotation will automatically appear here once the
                pricing engine is connected.

              </p>

            </div>

          </div>

          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
            }}
            className="card mt-6 rounded-2xl p-7 text-center"
          >

            <div className="text-5xl font-black tracking-wide text-blue-600 dark:text-blue-400">

              ---

            </div>

            <p className="card-text mt-3 text-sm">

              Pricing engine coming SOON!!

            </p>

          </motion.div>

        </motion.div>

        {/* Calculate Button */}

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="btn-primary mt-8 w-full py-4 text-lg"
        >

          Calculate Price

        </motion.button>

      </motion.div>

    </motion.div>

  );

}