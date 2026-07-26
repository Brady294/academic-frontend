"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrders } from "@/contexts/OrderContext";

export default function NewOrderPage() {
  const router = useRouter();
  const { addOrder } = useOrders();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    service_type: "Essay",
    academic_level: "Undergraduate",
    pages: 1,
    spacing: "Double",
    citation_style: "APA",
    deadline: "",
    instructions: "",
    budget: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "pages" || name === "budget"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addOrder(formData);

      alert("Order created successfully!");

      router.push("/dashboard/orders");
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          "Failed to create order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Place New Order
        </h1>

        <p className="text-gray-500 mt-2">
          Fill in the assignment details below.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        <div className="bg-white rounded-2xl shadow border p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="font-medium">
                Assignment Title
              </label>

              <input
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label className="font-medium">
                Subject
              </label>

              <input
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label className="font-medium">
                Service Type
              </label>

              <select
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border p-3"
              >
                <option>Essay</option>
                <option>Research Paper</option>
                <option>Dissertation</option>
                <option>Case Study</option>
                <option>Programming</option>
                <option>Presentation</option>
              </select>

            </div>

            <div>

              <label className="font-medium">
                Academic Level
              </label>

              <select
                name="academic_level"
                value={formData.academic_level}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border p-3"
              >
                <option>High School</option>
                <option>College</option>
                <option>Undergraduate</option>
                <option>Masters</option>
                <option>PhD</option>
              </select>

            </div>

            <div>

              <label className="font-medium">
                Pages
              </label>

              <input
                type="number"
                min={1}
                name="pages"
                value={formData.pages}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label className="font-medium">
                Spacing
              </label>

              <select
                name="spacing"
                value={formData.spacing}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border p-3"
              >
                <option>Single</option>
                <option>Double</option>
              </select>

            </div>

            <div>

              <label className="font-medium">
                Citation Style
              </label>

              <select
                name="citation_style"
                value={formData.citation_style}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border p-3"
              >
                <option>APA</option>
                <option>MLA</option>
                <option>Harvard</option>
                <option>Chicago</option>
                <option>IEEE</option>
              </select>

            </div>

            <div>

              <label className="font-medium">
                Deadline
              </label>

              <input
                type="datetime-local"
                name="deadline"
                required
                value={formData.deadline}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border p-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="font-medium">
                Budget ($)
              </label>

              <input
                type="number"
                min={0}
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border p-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="font-medium">
                Assignment Instructions
              </label>

              <textarea
                rows={8}
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border p-3"
              />

            </div>

          </div>

        </div>

        <div className="flex justify-end">

          <button
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-8 py-3 font-semibold transition disabled:opacity-50"
          >
            {loading
              ? "Submitting..."
              : "Submit Order"}
          </button>

        </div>

      </form>

    </div>
  );
}