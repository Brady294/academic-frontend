"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  GraduationCap,
  Calendar,
  FileText,
  Star,
  Plus,
  Minus,
} from "lucide-react";

export default function HeroCalculator() {

  const [pages, setPages] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: {
          duration: 0.7,
        },
        x: {
          duration: 0.7,
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="relative pt-16"
    >

      {/* Floating Rating */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.5,
        }}
        className="absolute top-6 right-8 z-20 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-xl"
      >

        <Star
          size={28}
          className="mx-auto mb-2 fill-yellow-400 text-yellow-400"
        />

        <h3 className="text-center text-3xl font-extrabold text-blue-600">

          4.9

        </h3>

        <p className="text-center text-sm text-slate-500">

          Student Rating

        </p>

      </motion.div>

      {/* Calculator Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
        }}
        className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl"
      >

        <div className="flex items-center gap-3">

          <Calculator
            size={34}
            className="text-blue-600"
          />

          <h2 className="text-3xl font-bold text-slate-900">

            Calculate Your Price

          </h2>

        </div>

        <p className="mt-3 text-slate-500">

          Get an instant estimate before placing your order.

        </p>

        {/* Academic Level */}

        <div className="mt-8">

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

            <GraduationCap size={18} />

            Academic Level

          </label>

          <select className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500">

            <option>Choose Academic Level</option>

            <option>High School</option>

            <option>College</option>

            <option>University</option>

            <option>Masters</option>

            <option>PhD</option>

          </select>

        </div>

        {/* Deadline */}

        <div className="mt-6">

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

            <Calendar size={18} />

            Deadline

          </label>

          <input
            type="date"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Number of Pages */}

        <div className="mt-6">

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

            <FileText size={18} />

            Number of Pages

          </label>

          <div className="flex items-center gap-4">

            <button
              onClick={() => pages > 1 && setPages(pages - 1)}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-blue-100"
            >

              <Minus size={20} />

            </button>

            <input
              readOnly
              value={pages}
              className="h-12 flex-1 rounded-xl border border-slate-200 text-center font-bold"
            />

            <button
              onClick={() => setPages(pages + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-blue-100"
            >

              <Plus size={20} />

            </button>

          </div>

        </div>

        {/* Estimated Price */}

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="mt-8 rounded-2xl border border-dashed border-blue-300 bg-blue-50 p-6"
        >

          <h3 className="text-lg font-bold text-slate-900">

            Estimated Price

          </h3>

          <p className="mt-2 text-slate-500">

            Your quotation will automatically appear here once the pricing engine is connected.

          </p>

          <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm">

            <div className="text-5xl font-extrabold text-blue-600">

              ---

            </div>

          </div>

        </motion.div>

        <button className="btn-primary mt-8 w-full py-4 text-lg">

          Calculate Price

        </button>
                {/* Completed Orders */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <div className="rounded-2xl border border-slate-200 bg-white px-10 py-6 text-center shadow-lg">

            <div className="text-4xl font-extrabold text-green-600">
              18,000+
            </div>

            <p className="mt-2 text-slate-500">
              Completed Orders
            </p>

          </div>
        </motion.div>

      </motion.div>

      {/* Trust Cards */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg"
        >

          <GraduationCap
            size={34}
            className="text-blue-600"
          />

          <h3 className="mt-4 font-bold text-slate-900">

            Human Experts

          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">

            Qualified academic professionals across more than 100 subjects.

          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg"
        >

          <FileText
            size={34}
            className="text-green-600"
          />

          <h3 className="mt-4 font-bold text-slate-900">

            Turnitin Ready

          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">

            Every assignment is written from scratch with originality reports available.

          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg"
        >

          <Star
            size={34}
            className="fill-yellow-400 text-yellow-400"
          />

          <h3 className="mt-4 font-bold text-slate-900">

            4.9 Student Rating

          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">

            Rated highly by thousands of students from universities worldwide.

          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg"
        >

          <Calendar
            size={34}
            className="text-orange-500"
          />

          <h3 className="mt-4 font-bold text-slate-900">

            On-Time Delivery

          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">

            98% of assignments are delivered before the agreed deadline.

          </p>

        </motion.div>

      </div>

    </motion.div>
  );
}