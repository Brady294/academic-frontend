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

      <div className="badge mt-10 shadow-sm">
        ⭐ Trusted by 10,000+ Students Across 40+ Countries
      </div>

      {/* Main Heading */}

      <h1 className="section-title mt-8 text-6xl leading-tight lg:text-7xl">
        Excel in Every
        <br />
        Assignment with
        <br />
        <span className="text-blue-600 dark:text-blue-400">
          Expert Academic Support
        </span>
      </h1>

      {/* Description */}

      <p className="section-subtitle mt-8 max-w-xl text-xl leading-9">
        From essays and dissertations to tutoring, proofreading,
        editing, and research assistance, TopStudyTutor connects
        students with experienced academic professionals committed
        to delivering high-quality, original work on time.
      </p>

      {/* Feature Cards */}

      <div className="mt-12 grid grid-cols-2 gap-5">

        {/* Card 1 */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="card card-hover rounded-2xl p-5"
        >
          <GraduationCap
            size={34}
            className="text-blue-600"
          />

          <h3 className="card-title mt-4">
            Human Experts
          </h3>

          <p className="card-text mt-2 text-sm">
            Qualified academic professionals across multiple disciplines.
          </p>

        </motion.div>

        {/* Card 2 */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="card card-hover rounded-2xl p-5"
        >
          <ShieldCheck
            size={34}
            className="text-green-600"
          />

          <h3 className="card-title mt-4">
            100% Original
          </h3>

          <p className="card-text mt-2 text-sm">
            Every assignment is written from scratch and plagiarism-free.
          </p>

        </motion.div>

        {/* Card 3 */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="card card-hover rounded-2xl p-5"
        >
          <Bot
            size={34}
            className="text-purple-600"
          />

          <h3 className="card-title mt-4">
            AI-Free Writing
          </h3>

          <p className="card-text mt-2 text-sm">
            Human-crafted content tailored to your assignment requirements.
          </p>

        </motion.div>

        {/* Card 4 */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.4,
          }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="card card-hover rounded-2xl p-5"
        >
          <Headset
            size={34}
            className="text-orange-500"
          />

          <h3 className="card-title mt-4">
            24/7 Support
          </h3>

          <p className="card-text mt-2 text-sm">
            Our support team is available whenever you need assistance.
          </p>

        </motion.div>

      </div>

      {/* Statistics */}
            <div className="mt-12 grid grid-cols-3 gap-5">

        {/* Rating */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="card card-hover rounded-2xl p-6 text-center"
        >

          <Star
            size={34}
            className="mx-auto mb-3 fill-yellow-400 text-yellow-400"
          />

          <div className="text-4xl font-extrabold text-blue-600">

            4.9

          </div>

          <p className="card-text mt-2 text-sm">

            Student Rating

          </p>

        </motion.div>

        {/* Orders */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.6,
          }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="card card-hover rounded-2xl p-6 text-center"
        >

          <CheckCircle
            size={34}
            className="mx-auto mb-3 text-green-600"
          />

          <div className="text-4xl font-extrabold text-green-600">

            18,000+

          </div>

          <p className="card-text mt-2 text-sm">

            Completed Orders

          </p>

        </motion.div>

        {/* Delivery */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.7,
          }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="card card-hover rounded-2xl p-6 text-center"
        >

          <Clock3
            size={34}
            className="mx-auto mb-3 text-orange-500"
          />

          <div className="text-4xl font-extrabold text-orange-500">

            98%

          </div>

          <p className="card-text mt-2 text-sm">

            On-Time Delivery

          </p>

        </motion.div>

      </div>

    </motion.div>
  );
}