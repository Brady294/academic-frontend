"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  FileText,
} from "lucide-react";
import orderService, {
  PricePreviewResponse,
} from "@/services/orderService";

export default function HeroCalculator() {
  const [workType, setWorkType] =
    useState<"pages" | "words">("pages");

  const [academicLevel, setAcademicLevel] =
    useState("");

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
   * Convert the selected deadline date into
   * the number of hours remaining.
   *
   * The selected date is treated as the end
   * of that day so that customers have the
   * full selected day available.
   */
  const getDeadlineHours = (
    selectedDate: string
  ): number => {
    const now = new Date();

    const deadlineDate = new Date(
      `${selectedDate}T23:59:59`
    );

    const difference =
      deadlineDate.getTime() -
      now.getTime();

    return difference / (1000 * 60 * 60);
  };

  /**
   * Convert words into pages according
   * to the selected spacing.
   */
  const getPagesFromWords = (
    words: number
  ): number => {
    if (spacing === "Double") {
      return words / 275;
    }

    if (spacing === "1.5 Spacing") {
      return words / 365;
    }

    return words / 550;
  };

  /**
   * Calculate the price using the backend
   * pricing engine.
   */
  const handleCalculatePrice = async () => {
    setError("");
    setPricing(null);

    /**
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

    /**
     * Validate deadline.
     */
    if (!deadline) {
      setError(
        "Please select your deadline."
      );

      return;
    }

    /**
     * Calculate remaining hours.
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

    /**
     * Convert words to pages when the
     * customer selected Words.
     */
    let pages: number;

    if (workType === "pages") {
      pages = numericQuantity;
    } else {
      pages = getPagesFromWords(
        numericQuantity
      );
    }

    /**
     * Prevent zero / invalid page values.
     */
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

      /**
       * Send the calculation to the backend.
       *
       * This endpoint is public, so the user
       * does not need to be logged in.
       */
      const result =
        await orderService.previewPrice({
          pages,
          deadline_hours: deadlineHours,
          currency: "USD",
        });

      setPricing(result);
    } catch (err) {
      console.error(
        "PRICE CALCULATION ERROR:",
        err
      );

      setError(
        "Unable to calculate the price right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
            Receive an instant quotation based on your
            academic level, deadline and work size before
            placing your order.
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
            onChange={(e) =>
              setAcademicLevel(
                e.target.value
              )
            }
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
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
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
            Choose whether your assignment will be
            measured in pages or words.
          </p>

          {/* Toggle */}

          <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => {
                setWorkType("pages");
                setPricing(null);
                setError("");
              }}
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
              onClick={() => {
                setWorkType("words");
                setPricing(null);
                setError("");
              }}
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
              <option>
                Double
              </option>

              <option>
                1.5 Spacing
              </option>

              <option>
                Single
              </option>
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

            {/* Live Conversion */}

            <motion.div
              animate={{
                opacity: [
                  0.7,
                  1,
                  0.7,
                ],
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
                        ? Number(quantity) *
                          275
                        : spacing ===
                          "1.5 Spacing"
                        ? Number(quantity) *
                          365
                        : Number(quantity) *
                          550
                    } Words`
                  : `≈ ${
                      spacing === "Double"
                        ? (
                            Number(
                              quantity
                            ) / 275
                          ).toFixed(1)
                        : spacing ===
                          "1.5 Spacing"
                        ? (
                            Number(
                              quantity
                            ) / 365
                          ).toFixed(1)
                        : (
                            Number(
                              quantity
                            ) / 550
                          ).toFixed(1)
                    } Pages`}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Error Message */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

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
                Your quotation will automatically appear
                here once the pricing engine calculates
                your order.
              </p>
            </div>
          </div>

          {pricing ? (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="card mt-6 rounded-2xl p-6"
            >
              <div className="text-center">
                <p className="card-text text-sm">
                  Estimated Total
                </p>

                <div className="mt-2 text-5xl font-black tracking-wide text-blue-600 dark:text-blue-400">
                  $
                  {
                    pricing.total_converted
                  }
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-blue-50 p-3 dark:bg-blue-950/40">
                    <p className="text-xs font-medium text-slate-500">
                      Price / Page
                    </p>

                    <p className="mt-1 text-lg font-bold text-blue-600">
                      $
                      {
                        pricing.price_per_page_usd
                      }
                    </p>
                  </div>

                  <div className="rounded-xl bg-green-50 p-3 dark:bg-green-950/40">
                    <p className="text-xs font-medium text-slate-500">
                      60% Deposit
                    </p>

                    <p className="mt-1 text-lg font-bold text-green-600">
                      $
                      {
                        pricing.deposit_converted
                      }
                    </p>
                  </div>
                </div>

                <p className="card-text mt-4 text-xs">
                  Final pricing may be confirmed when
                  your order is submitted.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              animate={{
                opacity: [
                  0.6,
                  1,
                  0.6,
                ],
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
                Enter your details and calculate your
                price.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Calculate Button */}

        <motion.button
          type="button"
          onClick={handleCalculatePrice}
          disabled={loading}
          whileHover={{
            scale: loading
              ? 1
              : 1.02,
          }}
          whileTap={{
            scale: loading
              ? 1
              : 0.98,
          }}
          className={`btn-primary mt-8 w-full py-4 text-lg ${
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