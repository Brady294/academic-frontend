"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  FileText,
  Info,
  Loader2,
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
   * Convert the selected date into the number
   * of hours remaining until 11:59:59 PM.
   *
   * IMPORTANT:
   * This only determines the deadline input sent
   * to the backend.
   *
   * The frontend does NOT calculate pricing.
   */
  function getDeadlineHours(
    selectedDate: string
  ): number {
    if (!selectedDate) {
      return NaN;
    }

    const deadlineDate = new Date(
      `${selectedDate}T23:59:59`
    );

    const now = new Date();

    return (
      (deadlineDate.getTime() -
        now.getTime()) /
      (1000 * 60 * 60)
    );
  }

  /**
   * Convert words to pages for the purpose
   * of sending a work-size quantity to the backend.
   *
   * This is NOT a price calculation.
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
   * Calculate price.
   *
   * IMPORTANT:
   * There is NO pricing formula here.
   *
   * The backend pricing engine is responsible for:
   *
   * High School = $10/page
   * University = $12/page
   * Masters = $18/page
   *
   * Deadline multipliers
   *
   * < 12 hours = 2.0
   * <= 24 hours = 1.5
   * <= 72 hours = 1.2
   * > 72 hours = 1.0
   *
   * Deposit = 60%
   */
  async function handleCalculatePrice() {
    setError("");
    setPricing(null);

    /**
     * Academic level
     */
    if (!academicLevel) {
      setError(
        "Please select your academic level."
      );

      return;
    }

    /**
     * Quantity
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
     * Deadline
     */
    if (!deadline) {
      setError(
        "Please select your deadline."
      );

      return;
    }

    /**
     * Deadline hours
     *
     * The frontend calculates only the
     * number of hours remaining.
     *
     * The backend determines the multiplier.
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
     * Determine pages.
     */
    let pages: number;

    if (workType === "pages") {
      pages = numericQuantity;
    } else {
      pages = getPagesFromWords(
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

    /**
     * Send request to backend.
     *
     * IMPORTANT:
     * There is NO price calculation here.
     */
    try {
      setLoading(true);

      const result =
        await orderService.previewPrice({
          pages,
          academic_level: academicLevel,
          deadline_hours: deadlineHours,
          currency: "USD",
        });

      console.log(
        "PRICE PREVIEW RESPONSE:",
        result
      );

      setPricing(result);
    } catch (err: any) {
      console.error(
        "PRICE CALCULATION ERROR:",
        err
      );

      /**
       * Show the actual backend error when available.
       * This makes future debugging much easier.
       */
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.detail;

      setError(
        backendMessage ||
          "Pricing calculation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /**
   * Format money safely.
   */
  function formatMoney(
    value: number | null | undefined
  ) {
    if (
      value === null ||
      value === undefined ||
      !Number.isFinite(value)
    ) {
      return "—";
    }

    return value.toFixed(2);
  }

  /**
   * Today's date for the minimum deadline.
   */
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

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

          <p className="section-subtitle mt-3 leading-7">
            Receive an instant quotation based on
            your academic level, deadline and work
            size before placing your order.
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
            className="select w-full"
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

          <p className="mt-2 text-xs text-slate-500">
            Provide neccesary information to determine the price
          </p>
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
            min={today}
            onChange={(e) => {
              setDeadline(
                e.target.value
              );

              setPricing(null);
              setError("");
            }}
            className="input w-full"
          />

          <p className="mt-2 text-xs text-slate-500">
            Select the date you need the work.
          </p>
        </div>

        {/* Work Size */}

        <div className="card mt-6 rounded-2xl bg-slate-50/70 p-5 sm:mt-8 sm:p-6 dark:bg-slate-800/40">
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
            Choose whether your assignment will
            be measured in pages or words.
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
              className={`py-3 text-sm font-semibold transition-all ${
                workType === "words"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
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
              className="select w-full"
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
              step="1"
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
              className="input w-full"
            />

            {/* Word/Page conversion */}

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

        {/* Error */}

        {error && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
            <Info
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>
              {error}
            </span>
          </div>
        )}

        {/* Estimated Price */}

        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          transition={{
            duration: 0.25,
          }}
          className="card mt-6 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-5 sm:mt-8 sm:p-7 dark:border-blue-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950"
        >
          <div>
            <h3 className="card-title">
              Estimated Price
            </h3>

            <p className="card-text mt-2 text-sm">
              Your quotation will automatically
              appear.
            </p>
          </div>

          {pricing ? (
            pricing.requires_admin_review ? (
              /* Technical/Admin Review */

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900 dark:bg-orange-950/30"
              >
                <div className="flex items-start gap-3">
                  <Info
                    size={21}
                    className="mt-0.5 shrink-0 text-orange-600"
                  />

                  <div>
                    <h4 className="font-bold text-orange-900 dark:text-orange-300">
                      Price provided after admin review
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-orange-800 dark:text-orange-200">
                      This request requires
                      administrative review. Please
                      provide all necessary materials
                      and requirements. Our admin team
                      will review the work and provide
                      the final price.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Normal Pricing */

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="card mt-6 rounded-2xl p-5 sm:p-6"
              >
                <div className="text-center">
                  <p className="card-text text-sm">
                    Estimated Total
                  </p>

                  <div className="mt-2 text-4xl font-black tracking-wide text-blue-600 sm:text-5xl dark:text-blue-400">
                    {pricing.total_converted ??
                      `$${formatMoney(
                        pricing.total_usd
                      )}`}
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    {/* Price Per Page */}

                    <div className="rounded-xl bg-blue-50 p-3 dark:bg-blue-950/40">
                      <p className="text-xs font-medium text-slate-500">
                        Price / Page
                      </p>

                      <p className="mt-1 text-lg font-bold text-blue-600">
                        $
                        {formatMoney(
                          pricing.price_per_page_usd
                        )}
                      </p>
                    </div>

                    {/* Deposit */}

                    <div className="rounded-xl bg-green-50 p-3 dark:bg-green-950/40">
                      <p className="text-xs font-medium text-slate-500">
                        60% Deposit
                      </p>

                      <p className="mt-1 text-lg font-bold text-green-600">
                        {pricing.deposit_converted ??
                          `$${formatMoney(
                            pricing.deposit_usd
                          )}`}
                      </p>
                    </div>
                  </div>

                  {/* Balance */}

                  {pricing.balance_usd !==
                    undefined &&
                    pricing.balance_usd !==
                      null && (
                      <div className="mt-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                        <p className="text-xs font-medium text-slate-500">
                          Remaining Balance
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-700 dark:text-slate-200">
                          {pricing.balance_converted ??
                            `$${formatMoney(
                              pricing.balance_usd
                            )}`}
                        </p>
                      </div>
                    )}

                  <div className="mt-4 flex items-start gap-2 text-left">
                    <Info
                      size={15}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    
                    
                  </div>
                </div>
              </motion.div>
            )
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
              <div className="text-4xl font-black tracking-wide text-blue-600 sm:text-5xl dark:text-blue-400">
                ---
              </div>

              <p className="card-text mt-3 text-sm">
                Select your academic level,
                deadline and work size, then
                calculate your price.
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
          className={`btn-primary mt-6 flex w-full items-center justify-center gap-2 py-4 text-base sm:mt-8 sm:text-lg ${
            loading
              ? "cursor-not-allowed opacity-70"
              : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2
                size={19}
                className="animate-spin"
              />

              Calculating...
            </>
          ) : (
            "Calculate Price"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}