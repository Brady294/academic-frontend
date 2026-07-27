"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ClipboardList,
  BookOpen,
  GraduationCap,
  Calendar,
  DollarSign,
  Upload,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import FileUpload from "@/components/orders/FileUpload";
import uploadService from "@/services/uploadService";
import { useOrders } from "@/contexts/OrderContext";

export default function NewOrderPage() {
  const router = useRouter();

  const { createOrder } = useOrders();

  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const [form, setForm] = useState({
    title: "",
    subject: "",
    service_type: "",
    academic_level: "",
    pages: 1,
    spacing: "Double",
    citation_style: "APA",
    deadline: "",
    instructions: "",
    budget: 0,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await createOrder(form);

      const orderId =
        response?.order?.id ??
        response?.id ??
        response?.data?.id ??
        response?.data?.order?.id;

      if (!orderId) {
        throw new Error(
          "Order ID not returned from the server."
        );
      }

      if (files.length > 0) {
        await Promise.all(
          files.map((file) =>
            uploadService.upload(
              orderId,
              file
            )
          )
        );
      }

      router.replace(
        `/dashboard/orders/${orderId}`
      );
    } catch (error) {
      console.error(
        "Failed to create order:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl">

      {/* Page Header */}

      <div className="mb-10">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">

            <ClipboardList
              className="text-blue-600"
              size={24}
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-gray-900">
              Create New Order
            </h1>

            <p className="mt-1 text-gray-500">
              Complete the information below to
              submit your assignment. Our team
              will review it immediately after
              submission.
            </p>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

          <div className="flex flex-wrap items-center gap-6">

            <div className="flex items-center gap-2 text-blue-700">

              <CheckCircle2 size={18} />

              <span className="text-sm font-semibold">
                Assignment Details
              </span>

            </div>

            <div className="h-px w-10 bg-blue-200" />

            <div className="flex items-center gap-2 text-blue-700">

              <Upload size={18} />

              <span className="text-sm font-semibold">
                Upload Files
              </span>

            </div>

            <div className="h-px w-10 bg-blue-200" />

            <div className="flex items-center gap-2 text-blue-700">

              <ShieldCheck size={18} />

              <span className="text-sm font-semibold">
                Review & Submit
              </span>

            </div>

          </div>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-3"
      >

        {/* LEFT COLUMN */}

        <div className="space-y-6 lg:col-span-2">

          {/* =========================
              Assignment Details
          ========================= */}
                    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <BookOpen
                  className="text-blue-600"
                  size={22}
                />

                <div>

                  <h2 className="text-xl font-semibold">
                    Assignment Details
                  </h2>

                  <p className="text-sm text-gray-500">
                    Tell us about your assignment.
                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-6 p-6">

              <div>

                <label className="mb-2 block font-medium">
                  Assignment Title
                </label>

                <p className="mb-3 text-sm text-gray-500">
                  Give your assignment a short,
                  descriptive title.
                </p>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Example: Strategic Management Case Study"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Subject
                </label>

                <p className="mb-3 text-sm text-gray-500">
                  Enter the academic subject.
                </p>

                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Business Management"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none"
                />

              </div>

            </div>

          </section>

          {/* Academic Details */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <GraduationCap
                  className="text-blue-600"
                  size={22}
                />

                <div>

                  <h2 className="text-xl font-semibold">
                    Academic Details
                  </h2>

                  <p className="text-sm text-gray-500">
                    Select the assignment
                    requirements.
                  </p>

                </div>

              </div>

            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  Service Type
                </label>

                <select
                  name="service_type"
                  value={form.service_type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                >
                  <option value="">
                    Select Service
                  </option>

                  <option>
                    Essay
                  </option>

                  <option>
                    Research Paper
                  </option>

                  <option>
                    Case Study
                  </option>

                  <option>
                    Programming
                  </option>

                  <option>
                    Presentation
                  </option>

                  <option>
                    Dissertation
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Academic Level
                </label>

                <select
                  name="academic_level"
                  value={form.academic_level}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                >
                  <option value="">
                    Select Level
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

              <div>

                <label className="mb-2 block font-medium">
                  Number of Pages
                </label>

                <input
                  type="number"
                  min={1}
                  name="pages"
                  value={form.pages}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Deadline
                </label>

                <input
                  type="datetime-local"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Spacing
                </label>

                <select
                  name="spacing"
                  value={form.spacing}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                >
                  <option>
                    Double
                  </option>

                  <option>
                    Single
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Citation Style
                </label>

                <select
                  name="citation_style"
                  value={form.citation_style}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                >
                  <option>
                    APA
                  </option>

                  <option>
                    MLA
                  </option>

                  <option>
                    Harvard
                  </option>

                  <option>
                    Chicago
                  </option>

                  <option>
                    IEEE
                  </option>

                </select>

              </div>

              <div className="md:col-span-2">

                <label className="mb-2 block font-medium">
                  Budget (Optional)
                </label>

                <input
                  type="number"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="Enter your preferred budget"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />

              </div>

            </div>

          </section>

          {/* Instructions */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-100 px-6 py-5">

              <h2 className="text-xl font-semibold">
                Instructions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Include assignment instructions,
                grading rubric, professor notes,
                formatting requirements and any
                other useful information.
              </p>

            </div>

            <div className="p-6">

              <textarea
                name="instructions"
                rows={10}
                value={form.instructions}
                onChange={handleChange}
                placeholder="Paste your assignment instructions here..."
                className="w-full rounded-xl border border-gray-300 p-4 transition focus:border-blue-500 focus:outline-none"
              />

            </div>

          </section>

          {/* Attachments */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-100 px-6 py-5">

              <h2 className="text-xl font-semibold">
                Attachments
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload assignment files,
                marking schemes, lecture notes,
                or any supporting documents.
              </p>

            </div>

            <div className="p-6">

              <FileUpload
                files={files}
                setFiles={setFiles}
              />

            </div>

          </section>
                  </div>

        {/* RIGHT COLUMN */}

        <aside className="lg:sticky lg:top-8 lg:self-start">

          <div className="space-y-6">

            {/* Order Summary */}

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-6 py-5">

                <div className="flex items-center gap-3">

                  <DollarSign
                    className="text-blue-600"
                    size={22}
                  />

                  <div>

                    <h2 className="text-xl font-semibold">
                      Order Summary
                    </h2>

                    <p className="text-sm text-gray-500">
                      Review your order before submitting.
                    </p>

                  </div>

                </div>

              </div>

              <div className="space-y-4 p-6">

                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

                  <span className="text-sm text-gray-600">
                    Service
                  </span>

                  <span className="font-semibold text-gray-900">
                    {form.service_type || "Not selected"}
                  </span>

                </div>

                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

                  <span className="text-sm text-gray-600">
                    Academic Level
                  </span>

                  <span className="font-semibold text-gray-900">
                    {form.academic_level || "Not selected"}
                  </span>

                </div>

                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

                  <span className="text-sm text-gray-600">
                    Pages
                  </span>

                  <span className="font-semibold text-gray-900">
                    {form.pages}
                  </span>

                </div>

                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

                  <span className="text-sm text-gray-600">
                    Files
                  </span>

                  <span className="font-semibold text-gray-900">
                    {files.length}
                  </span>

                </div>

                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

                  <span className="text-sm text-gray-600">
                    Deadline
                  </span>

                  <span className="text-right font-semibold text-gray-900">

                    {form.deadline
                      ? new Date(
                          form.deadline
                        ).toLocaleString()
                      : "Not selected"}

                  </span>

                </div>

                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white">

                  <p className="text-sm opacity-90">
                    Budget
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    ${Number(
                      form.budget || 0
                    ).toFixed(2)}
                  </h3>

                </div>

              </div>

            </section>

            {/* Why Choose Us */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <h3 className="text-lg font-semibold">
                Why Choose TopStudyTutor?
              </h3>

              <div className="mt-5 space-y-4">

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    size={20}
                    className="mt-0.5 text-green-600"
                  />

                  <div>

                    <p className="font-medium">
                      Secure & Confidential
                    </p>

                    <p className="text-sm text-gray-500">
                      Your information remains private and protected.
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <CheckCircle2
                    size={20}
                    className="mt-0.5 text-blue-600"
                  />

                  <div>

                    <p className="font-medium">
                      Professional Experts
                    </p>

                    <p className="text-sm text-gray-500">
                      Qualified specialists handle every assignment.
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <Calendar
                    size={20}
                    className="mt-0.5 text-orange-600"
                  />

                  <div>

                    <p className="font-medium">
                      On-Time Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Orders are delivered before the stated deadline.
                    </p>

                  </div>

                </div>

              </div>

            </section>

            {/* Submit */}

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">

              <h3 className="text-lg font-semibold text-blue-900">
                Ready to Submit?
              </h3>

              <p className="mt-2 text-sm text-blue-700">
                Once submitted, our support team will review your
                order and assign it to a qualified expert.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Submitting Order..."
                  : "Create Order"}
              </button>

            </section>

          </div>

        </aside>

      </form>

    </div>
  );
}