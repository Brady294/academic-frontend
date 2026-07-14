"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How is the price calculated?",
    answer:
      "The price depends on your academic level, deadline, number of pages, subject complexity, and any additional requirements. You'll receive an instant estimate before placing your order.",
  },
  {
    question: "Is the work 100% original?",
    answer:
      "Yes. Every assignment is written from scratch by a human expert. We do not resell papers, and plagiarism checks are performed before delivery.",
  },
  {
    question: "Can I request revisions?",
    answer:
      "Absolutely. If your order includes a revision period, you can request edits to ensure the final work meets your instructions.",
  },
  {
    question: "Is my personal information confidential?",
    answer:
      "Yes. We use secure systems to protect your information, and your identity is never shared with writers or third parties.",
  },
  {
    question: "Can I choose my own writer?",
    answer:
      "This feature will be available in a future update. Initially, our system will automatically assign the most suitable expert for your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support secure online payments using major debit cards, credit cards, and additional payment methods that will be displayed during checkout.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24">

      <div className="container mx-auto max-w-5xl px-6">

        <div className="text-center">

          <h2 className="text-5xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-xl text-slate-600">
            Everything you need to know before placing your order.
          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >

                <span className="text-lg font-semibold text-slate-900">

                  {faq.question}

                </span>

                {open === index ? (
                  <ChevronUp className="text-blue-600" />
                ) : (
                  <ChevronDown className="text-slate-500" />
                )}

              </button>

              {open === index && (

                <div className="border-t border-slate-100 px-6 pb-6 pt-4">

                  <p className="leading-8 text-slate-600">

                    {faq.answer}

                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}