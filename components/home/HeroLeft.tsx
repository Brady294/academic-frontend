"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  ShieldCheck,
  Bot,
  Headset,
  Star,
  CheckCircle,
  Clock3,
} from "lucide-react";

export default function HeroLeft() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {/* Trust Badge */}

      <div className="mt-10 inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm">
        ⭐ Trusted by 10,000+ Students Across 40+ Countries
      </div>

      {/* Main Heading */}

      <h1 className="mt-8 text-6xl font-extrabold leading-tight text-slate-900">
        Excel in Every
        <br />
        Assignment with
        <br />
        <span className="text-blue-600">
          Expert Academic Support
        </span>
      </h1>

      {/* Description */}

      <p className="mt-8 max-w-xl text-xl leading-9 text-slate-600">
        From essays and dissertations to tutoring, proofreading,
        editing, and research assistance, TopStudyTutor connects
        students with experienced academic professionals committed
        to delivering high-quality, original work on time.
      </p>

      {/* Feature Cards */}

      <div className="mt-12 grid grid-cols-2 gap-5">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white p-5 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <GraduationCap
            size={34}
            className="text-blue-600"
          />

          <h3 className="mt-4 font-bold text-slate-800">
            Human Experts
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Qualified academic professionals across multiple disciplines.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-white p-5 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <ShieldCheck
            size={34}
            className="text-green-600"
          />

          <h3 className="mt-4 font-bold text-slate-800">
            100% Original
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Every assignment is written from scratch and plagiarism-free.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl bg-white p-5 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <Bot
            size={34}
            className="text-purple-600"
          />

          <h3 className="mt-4 font-bold text-slate-800">
            AI-Free Writing
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Human-crafted content tailored to your assignment requirements.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl bg-white p-5 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <Headset
            size={34}
            className="text-orange-500"
          />

          <h3 className="mt-4 font-bold text-slate-800">
            24/7 Support
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Our support team is available whenever you need assistance.
          </p>

        </motion.div>

      </div>

      {/* Statistics */}

      <div className="mt-12 grid grid-cols-3 gap-5">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white p-6 text-center shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <Star
            size={34}
            className="mx-auto mb-3 fill-yellow-400 text-yellow-400"
          />

          <div className="text-4xl font-extrabold text-blue-600">
            4.9
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Student Rating
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-white p-6 text-center shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <CheckCircle
            size={34}
            className="mx-auto mb-3 text-green-600"
          />

          <div className="text-4xl font-extrabold text-green-600">
            18,000+
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Completed Orders
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl bg-white p-6 text-center shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <Clock3
            size={34}
            className="mx-auto mb-3 text-orange-500"
          />

          <div className="text-4xl font-extrabold text-orange-500">
            98%
          </div>

          <p className="mt-2 text-sm text-slate-500">
            On-Time Delivery
          </p>

        </motion.div>

      </div>

    </motion.div>
  );
}