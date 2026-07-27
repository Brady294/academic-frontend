"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      [name]: type === "number" ? Number(value) : value,
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
        throw new Error("Order ID not returned from the server.");
      }

      if (files.length > 0) {
        await Promise.all(
          files.map((file) =>
            uploadService.upload(orderId, file)
          )
        );
      }

      router.replace(`/dashboard/orders/${orderId}`);
    } catch (error) {
      console.error("Failed to create order:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Place New Order
        </h1>

        <p className="mt-2 text-gray-500">
          Complete the form below to submit your assignment.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Assignment Details */}

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-bold">
            Assignment Details
          </h2>

          <div className="grid gap-5">

            <div>

              <label className="mb-2 block font-medium">
                Assignment Title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                placeholder="Enter assignment title"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Subject
              </label>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                placeholder="e.g Business Management"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Instructions
              </label>

              <textarea
                name="instructions"
                rows={7}
                value={form.instructions}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                placeholder="Paste assignment instructions here..."
              />

            </div>

          </div>

        </section>

        {/* Academic Details */}

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-bold">
            Academic Details
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium">
                Service Type
              </label>

              <select
                name="service_type"
                value={form.service_type}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 p-3"
              >
                <option value="">Select Service</option>
                <option>Essay</option>
                <option>Research Paper</option>
                <option>Case Study</option>
                <option>Programming</option>
                <option>Presentation</option>
                <option>Dissertation</option>
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
                className="w-full rounded-xl border border-gray-300 p-3"
              >
                <option value="">Select Level</option>
                <option>High School</option>
                <option>College</option>
                <option>Undergraduate</option>
                <option>Masters</option>
                <option>PhD</option>
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
                className="w-full rounded-xl border border-gray-300 p-3"
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
                className="w-full rounded-xl border border-gray-300 p-3"
              >
                <option>Double</option>
                <option>Single</option>
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
                className="w-full rounded-xl border border-gray-300 p-3"
              >
                <option>APA</option>
                <option>MLA</option>
                <option>Harvard</option>
                <option>Chicago</option>
                <option>IEEE</option>
              </select>

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
                className="w-full rounded-xl border border-gray-300 p-3"
              />

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
                className="w-full rounded-xl border border-gray-300 p-3"
              />

            </div>

          </div>

        </section>

        {/* File Upload */}

        <FileUpload
          files={files}
          setFiles={setFiles}
        />

        {/* Submit */}

        <div className="flex justify-end">

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Order"}
          </button>

        </div>

      </form>

    </div>
  );
}