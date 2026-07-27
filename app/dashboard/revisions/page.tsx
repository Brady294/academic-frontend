"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Plus,
  Calendar,
  ClipboardList,
  CheckCircle2,
  Clock3,
  AlertCircle,
  XCircle,
} from "lucide-react";

import revisionService from "@/services/revisionService";

import { Revision } from "@/types/revision";

import NewRevisionModal from "@/components/revisions/NewRevisionModal";

export default function RevisionsPage() {
  const [loading, setLoading] =
    useState(true);

  const [revisions, setRevisions] =
    useState<Revision[]>([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {
    loadRevisions();
  }, []);

  async function loadRevisions() {
    try {
      setLoading(true);

      const data =
        await revisionService.getRevisions();

      setRevisions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createRevision(
    payload: {
      order_id: number;
      title: string;
      instructions: string;
    }
  ) {
    try {
      const revision =
        await revisionService.createRevision(
          payload
        );

      setRevisions((prev) => [
        revision,
        ...prev,
      ]);

      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  const filtered =
    useMemo(() => {
      return revisions.filter((r) =>
        `${r.title}
         ${r.order_title}
         ${r.instructions}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }, [revisions, search]);

  function statusBadge(
    status: string
  ) {
    switch (status) {
      case "Completed":
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Completed
          </span>
        );

      case "In Progress":
        return (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            In Progress
          </span>
        );

      case "Rejected":
        return (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Rejected
          </span>
        );

      default:
        return (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            Pending
          </span>
        );
    }
  }

  function statusIcon(
    status: string
  ) {
    switch (status) {
      case "Completed":
        return (
          <CheckCircle2 className="text-green-600" />
        );

      case "In Progress":
        return (
          <Clock3 className="text-blue-600" />
        );

      case "Rejected":
        return (
          <XCircle className="text-red-600" />
        );

      default:
        return (
          <AlertCircle className="text-yellow-600" />
        );
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 rounded-3xl border bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold">

            Revision Requests

          </h1>

          <p className="mt-2 text-gray-500">

            Submit and monitor revision requests
            for completed assignments.

          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Revision
        </button>

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search revisions..."
          className="w-full rounded-2xl border bg-white py-4 pl-12 pr-5 shadow-sm outline-none focus:border-blue-600"
        />

      </div>

      {/* Loading */}

      {loading && (
        <div className="flex h-72 items-center justify-center">
          Loading revisions...
        </div>
      )}

      {/* Empty */}

      {!loading &&
        filtered.length === 0 && (

          <div className="rounded-3xl border bg-white py-24 shadow-sm">

            <ClipboardList
              size={70}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-6 text-center text-2xl font-bold">

              No Revision Requests

            </h2>

            <p className="mt-3 text-center text-gray-500">

              Your submitted revisions
              will appear here.

            </p>

          </div>

        )}

      {/* Cards */}

      {!loading &&
        filtered.length > 0 && (

          <div className="space-y-6">

            {filtered.map(
              (revision) => (

                <div
                  key={revision.id}
                  className="rounded-3xl border bg-white p-7 shadow-sm"
                >

                  <div className="flex flex-col gap-4 md:flex-row md:justify-between">

                    <div>

                      <h2 className="text-xl font-bold">

                        {revision.title}

                      </h2>

                      <p className="mt-2 text-sm text-gray-500">

                        {revision.order_title}

                      </p>

                    </div>

                    {statusBadge(
                      revision.status
                    )}

                  </div>

                  <div className="mt-6 rounded-2xl bg-gray-50 p-5">

                    <p className="whitespace-pre-wrap text-gray-700">

                      {revision.instructions}

                    </p>

                  </div>

                  {revision.admin_response && (

                    <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                      <h4 className="font-semibold text-blue-700">

                        Writer Response

                      </h4>

                      <p className="mt-2 whitespace-pre-wrap text-gray-700">

                        {revision.admin_response}

                      </p>

                    </div>

                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-500">

                    <div className="flex items-center gap-2">

                      {statusIcon(
                        revision.status
                      )}

                      {revision.status}

                    </div>

                    <div className="flex items-center gap-2">

                      <Calendar
                        size={16}
                      />

                      Created

                      {new Date(
                        revision.created_at
                      ).toLocaleDateString()}

                    </div>

                    {revision.due_date && (

                      <div className="flex items-center gap-2">

                        <Calendar
                          size={16}
                        />

                        Due

                        {new Date(
                          revision.due_date
                        ).toLocaleDateString()}

                      </div>

                    )}

                  </div>

                </div>

              )
            )}

          </div>

        )}

      <NewRevisionModal
        open={showModal}
        onClose={() =>
          setShowModal(false)
        }
        onCreate={createRevision}
      />

    </div>
  );
}