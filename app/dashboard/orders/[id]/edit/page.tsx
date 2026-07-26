"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getOrder,
  updateOrder,
} from "@/services/orderService";

export default function EditOrderPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    pages: 1,
    deadline: "",
    instructions: "",
  });

  useEffect(() => {
    async function loadOrder() {
      try {
        const order = await getOrder(Number(params.id));

        setFormData({
          title: order.title,
          subject: order.subject,
          pages: order.pages,
          deadline: order.deadline
            ? new Date(order.deadline)
                .toISOString()
                .slice(0, 16)
            : "",
          instructions: order.instructions || "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load order.");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [params.id]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "pages"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setSaving(true);

      await updateOrder(
        Number(params.id),
        formData
      );

      alert("Order updated successfully.");

      router.push(
        `/dashboard/orders/${params.id}`
      );
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to update order."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Edit Order
        </h1>

        <p className="text-gray-500 mt-2">
          Update your assignment details.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        <div className="bg-white rounded-xl shadow border p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="font-medium">
                Assignment Title
              </label>

              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-2 w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="font-medium">
                Subject
              </label>

              <input
                required
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-2 w-full border rounded-lg p-3"
              />

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
                className="mt-2 w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="font-medium">
                Deadline
              </label>

              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="mt-2 w-full border rounded-lg p-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="font-medium">
                Instructions
              </label>

              <textarea
                rows={8}
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="mt-2 w-full border rounded-lg p-3"
              />

            </div>

          </div>

        </div>

        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg border"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}