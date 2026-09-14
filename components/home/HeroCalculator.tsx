"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  FileText,
  Loader2,
  Info,
} from "lucide-react";

import orderService, {
  PricePreviewResponse,
} from "@/services/orderService";

type AcademicLevel =
  | "High School"
  | "University"
  | "Masters";

type WorkType = "pages" | "words";

export default function HeroCalculator() {
  const [workType, setWorkType] =
    useState<WorkType>("pages");

  const [academicLevel, setAcademicLevel] =
    useState<AcademicLevel | "">("");

  const [deadline, setDeadline] =
    useState("");

  const [spacing, setSpacing] =
    useState("Double");

  const [quantity, setQuantity] =
    useState("");

  const [pricing, setPricing] =
    useState<PricePreviewResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /**
   * Convert the selected date to the number
   * of hours remaining until 11:59 PM that day.
   */
  function getDeadlineHours(
    selectedDate: string
  ): number {
    if (!selectedDate) {
      return NaN;
    }

    const now = new Date();

    const deadlineDate = new Date(
      `${selectedDate}T23:59:59`
    );

    const difference =
      deadlineDate.getTime() -
      now.getTime();

    return (
      difference /
      (1000 * 60 * 60)
    );
  }

  /**
   * Convert words to pages.
   *
   * This is only a quantity conversion.
   * The actual PRICE is always calculated
   * by the backend.
   */
  function getPagesFromWords(
    words: number
  ): number {
    if (spacing === "Double") {
      return words / 275;
    }

    if (spacing === "1.5 Spacing") {
      return words / 365;
    }

    return words / 550;
  }

  /**
   * Calculate price through the backend.
   */
  async function handleCalculatePrice() {
    setError("");
    setPricing(null);

    /*
     * Academic level is required because
     * the backend uses it to determine:
     *
     * High School = $10
     * University = $12
     * Masters = $18
     */
    if (!academicLevel) {
      setError(
        "Please select your academic level."
      );
      return;
    }

    /*
     * Validate quantity.
     */
    const numericQuantity =
      Number(quantity);

    if (
      !Number.isFinite(numericQuantity) ||
      numericQuantity <= 0
    ) {
      setError(
        workType === "pages"
          ? "Please enter the number of pages."
          : "Please enter the number of words."
      );

      return;
    }

    /*
     * Validate deadline.
     */
    if (!deadline) {
      setError(
        "Please select your deadline."
      );

      return;
    }

    /*
     * Calculate hours until deadline.
     */
    const deadlineHours =
      getDeadlineHours(deadline);

    if (
      !Number.isFinite(deadlineHours) ||
      deadlineHours <= 0
    ) {
      setError(
        "Please select a future deadline."
      );

      return;
    }

    /*
     * Convert words to pages if necessary.
     *
     * IMPORTANT:
     * We are NOT calculating the price here.
     * Only converting the quantity to pages.
     */
    let pages: number;

    if (workType === "pages") {
      pages = numericQuantity;
    } else {
      pages =
        getPagesFromWords(
          numericQuantity
        );
    }

    if (
      !Number.isFinite(pages) ||
      pages <= 0
    ) {
      setError(
        "Please enter a valid work size."
      );

      return;
    }

    try {
      setLoading(true);

      /*
       * EVERYTHING related to price calculation
       * is now sent to the backend.
       */
      const result =
        await orderService.previewPrice({
          pages,
          academic_level:
            academicLevel,
          deadline_hours:
            deadlineHours,
          currency: "USD",
        });

      setPricing(result);
    } catch (err: any) {
      console.error(
        "PRICE CALCULATION ERROR:",
        err
      );

      console.error(
        "PRICE CALCULATION RESPONSE:",
        err?.response?.data
      );

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Unable to calculate the price right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * Word/page conversion preview.
   */
  function getConversionText() {
    if (!quantity) {
      return workType === "pages"
        ? "1 Page ≈ 275 Words (Double Spacing)"
        : "275 Words ≈ 1 Page (Double Spacing)";
    }

    const value =
      Number(quantity);

    if (
      !Number.isFinite(value) ||
      value <= 0
    ) {
      return "";
    }

    if (workType === "pages") {
      const words =
        spacing === "Double"
          ? value * 275
          : spacing === "1.5 Spacing"
          ? value * 365
          : value * 550;

      return `≈ ${words.toLocaleString()} Words`;
    }

    const pages =
      spacing === "Double"
        ? value / 275
        : spacing === "1.5 Spacing"
        ? value / 365
        : value / 550;

    return `≈ ${pages.toFixed(1)} Pages`;
  }

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
        className="card p-6 sm:p-8"
      >
        {/* Heading */}

        <div>
          <h2 className="card-title text-2xl sm:text-3xl">
            Calculate Your Price
          </h2>

          <p className="section-subtitle mt-2 leading-6 sm:mt-3 sm:leading-7">
            Get an instant quotation based on
            your academic level, deadline and
            work size.
          </p>
        </div>

        {/* Academic Level */}

        <div className="mt-6 sm:mt-8">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <GraduationCap
              size={18}
              className="text-blue-600"
            />

            Academic Level
          </label>

          <select
            value={academicLevel}
            onChange={(e) => {
              setAcademicLevel(
                e.target.value as
                  | AcademicLevel
                  | ""
              );

              setPricing(null);
              setError("");
            }}
            className="select"
          >
            <option value="">
              Select Academic Level
            </option>

            <option value="High School">
              High School
            </option>

            <option value="University">
              University
            </option>

            <option value="Masters">
              Masters
            </option>
          </select>
        </div>

        {/* Deadline */}

        <div className="mt-5 sm:mt-6">
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
            min={new Date()
              .toISOString()
              .split("T")[0]}
            onChange={(e) => {
              setDeadline(
                e.target.value
              );

              setPricing(null);
              setError("");
            }}
            className="input"
          />
        </div>

        {/* Work Size */}

        <div className="card mt-6 rounded-2xl bg-slate-50/70 p-5 sm:mt-8 sm:p-6">
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
            Choose whether your assignment
            will be measured in pages or
            words.
          </p>

          {/* Pages / Words */}

          <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => {
                setWorkType("pages");
                setPricing(null);
                setError("");
              }}
              className={`py-3 text-sm font-semibold transition-all ${
                workType === "pages"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              Pages
            </button>

            <button
              type="button"
              onClick={() => {
                setWorkType("words");
                setPricing(null);
                setError("");
              }}
              className={`py-3 text-sm font-semibold transition-all ${
                workType === "words"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              Words
            </button>
          </div>

          {/* Spacing */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold">
              Spacing
            </label>

            <select
              value={spacing}
              onChange={(e) => {
                setSpacing(
                  e.target.value
                );

                setPricing(null);
                setError("");
              }}
              className="select"
            >
              <option value="Double">
                Double
              </option>

              <option value="1.5 Spacing">
                1.5 Spacing
              </option>

              <option value="Single">
                Single
              </option>
            </select>
          </div>

          {/* Quantity */}

          <div className="mt-5">
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
              onChange={(e) => {
                setQuantity(
                  e.target.value
                );

                setPricing(null);
                setError("");
              }}
              placeholder={
                workType === "pages"
                  ? "Enter number of pages"
                  : "Enter number of words"
              }
              className="input"
            />

            {/* Conversion */}

            <motion.div
              key={`${quantity}-${spacing}-${workType}`}
              initial={{
                opacity: 0.5,
              }}
              animate={{
                opacity: 1,
              }}
              className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800 dark:bg-blue-950/40"
            >
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {getConversionText()}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
            <Info
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>
          </div>
        )}

        {/* Estimated Price */}

        <motion.div
          transition={{
            duration: 0.25,
          }}
          className="card mt-6 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 dark:border-blue-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 sm:mt-8 sm:p-7"
        >
          <div>
            <h3 className="card-title text-xl sm:text-2xl">
              Estimated Price
            </h3>

            <p className="card-text mt-2 text-sm">
              Your quotation will appear here
              after the backend pricing engine
              calculates your order.
            </p>
          </div>

          {loading ? (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="card mt-5 rounded-2xl p-6 text-center"
            >
              <Loader2
                size={36}
                className="mx-auto animate-spin text-blue-600"
              />

              <p className="card-text mt-3 text-sm">
                Calculating your price...
              </p>
            </motion.div>
          ) : pricing ? (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="card mt-5 rounded-2xl p-5 sm:p-6"
            >
              <div className="text-center">
                <p className="card-text text-sm">
                  Estimated Total
                </p>

                <div className="mt-2 text-4xl font-black tracking-wide text-blue-600 dark:text-blue-400 sm:text-5xl">
                  {pricing.currency}{" "}
                  {pricing.total_converted}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-xl bg-blue-50 p-3 dark:bg-blue-950/40">
                    <p className="text-xs font-medium text-slate-500">
                      Price / Page
                    </p>

                    <p className="mt-1 text-lg font-bold text-blue-600">
                      $
                      {Number(
                        pricing.price_per_page_usd
                      ).toFixed(2)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-green-50 p-3 dark:bg-green-950/40">
                    <p className="text-xs font-medium text-slate-500">
                      60% Deposit
                    </p>

                    <p className="mt-1 text-lg font-bold text-green-600">
                      {pricing.currency}{" "}
                      {pricing.deposit_converted}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-left dark:border-blue-900 dark:bg-blue-950/20">
                  <Info
                    size={16}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
                    The price above was calculated
                    by our server using your
                    academic level, work size and
                    deadline. A 60% deposit is
                    required.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="card mt-5 rounded-2xl p-6 text-center">
              <div className="text-4xl font-black tracking-wide text-blue-600 dark:text-blue-400">
                ---
              </div>

              <p className="card-text mt-3 text-sm">
                Enter your details and calculate
                your price.
              </p>
            </div>
          )}
        </motion.div>

        {/* Calculate */}

        <motion.button
          type="button"
          onClick={handleCalculatePrice}
          disabled={loading}
          whileHover={{
            scale: loading ? 1 : 1.02,
          }}
          whileTap={{
            scale: loading ? 1 : 0.98,
          }}
          className={`btn-primary mt-6 w-full py-4 text-base sm:mt-8 sm:text-lg ${
            loading
              ? "cursor-not-allowed opacity-70"
              : ""
          }`}
        >
          {loading
            ? "Calculating..."
            : "Calculate Price"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}