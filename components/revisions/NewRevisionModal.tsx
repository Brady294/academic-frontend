"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";

import axios from "@/lib/axios";

interface Order {
  id: number;
  title: string;
  status: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: {
    order_id: number;
    title: string;
    instructions: string;
  }) => void;
}

export default function NewRevisionModal({
  open,
  onClose,
  onCreate,
}: Props) {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loadingOrders, setLoadingOrders] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [orderId, setOrderId] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [instructions, setInstructions] =
    useState("");

  useEffect(() => {
    if (open) {
      loadOrders();
    }
  }, [open]);

  async function loadOrders() {
    try {
      setLoadingOrders(true);

      const { data } = await axios.get("/orders");

      /**
       * Only completed orders
       */

      const completed = data.filter(
        (order: Order) =>
          order.status === "Completed"
      );

      setOrders(completed);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  }

  async function submit() {
    if (
      !orderId ||
      !title.trim() ||
      !instructions.trim()
    )
      return;

    try {
      setSubmitting(true);

      await onCreate({
        order_id: Number(orderId),
        title,
        instructions,
      });

      setOrderId("");
      setTitle("");
      setInstructions("");

      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="text-2xl font-bold">

              Request Revision

            </h2>

            <p className="mt-1 text-sm text-gray-500">

              Submit changes for a completed assignment.

            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-8">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Assignment

            </label>

            <select
              value={orderId}
              onChange={(e) =>
                setOrderId(
                  e.target.value
                )
              }
              disabled={loadingOrders}
              className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
            >

              <option value="">
                Select completed assignment
              </option>

              {orders.map((order) => (

                <option
                  key={order.id}
                  value={order.id}
                >
                  {order.title}
                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Revision Title

            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Example: APA Formatting Corrections"
              className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Revision Instructions

            </label>

            <textarea
              rows={8}
              value={instructions}
              onChange={(e) =>
                setInstructions(
                  e.target.value
                )
              }
              placeholder="Describe every change you need the writer to make..."
              className="w-full resize-none rounded-xl border p-3 outline-none focus:border-blue-600"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t px-8 py-6">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-3 transition hover:bg-gray-50"
          >

            Cancel

          </button>

          <button
            onClick={submit}
            disabled={submitting}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {submitting
              ? "Submitting..."
              : "Submit Revision"}

          </button>

        </div>

      </div>

    </div>
  );
}