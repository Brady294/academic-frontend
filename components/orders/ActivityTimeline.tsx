"use client";

import {
  CheckCircle2,
  Circle,
  Clock3,
} from "lucide-react";

interface Activity {
  title: string;
  date: string;
  completed: boolean;
}

interface Props {
  activities: Activity[];
}

export default function ActivityTimeline({
  activities,
}: Props) {
  const currentIndex =
    activities.findIndex(
      (activity) => !activity.completed
    ) === -1
      ? activities.length - 1
      : activities.findIndex(
          (activity) => !activity.completed
        );

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-gray-100 px-5 py-4">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-gray-900">
              Activity Timeline
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Follow the progress of your
              assignment from creation to
              delivery.
            </p>

          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {activities.filter(
              (a) => a.completed
            ).length}
            /{activities.length} Completed
          </span>

        </div>

      </div>

      {/* Body */}

      <div className="p-5">

        {activities.length === 0 ? (

          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">

            <Clock3
              size={34}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No Activity Yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Timeline updates will appear
              here as your order progresses.
            </p>

          </div>

        ) : (

          <div className="relative">

            {activities.map(
              (activity, index) => {
                const isCompleted =
                  activity.completed;

                const isCurrent =
                  index === currentIndex &&
                  !isCompleted;

                const isLast =
                  index ===
                  activities.length - 1;

                return (
                  <div
                    key={index}
                    className="relative flex gap-4 pb-6 last:pb-0"
                  >

                    {/* Timeline */}

                    <div className="relative flex flex-col items-center">

                      {!isLast && (
                        <div
                          className={`absolute top-10 h-full w-0.5 ${
                            isCompleted
                              ? "bg-emerald-300"
                              : "bg-gray-200"
                          }`}
                        />
                      )}

                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                          isCompleted
                            ? "border-emerald-500 bg-emerald-100"
                            : isCurrent
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-300 bg-gray-100"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2
                            size={18}
                            className="text-emerald-600"
                          />
                        ) : isCurrent ? (
                          <Clock3
                            size={18}
                            className="text-blue-600"
                          />
                        ) : (
                          <Circle
                            size={14}
                            className="fill-gray-400 text-gray-400"
                          />
                        )}

                      </div>

                    </div>

                    {/* Content */}

                    <div className="flex-1 rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-sm">

                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                        <div>

                          <h3 className="font-semibold text-gray-900">
                            {activity.title}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            {activity.date}
                          </p>

                        </div>

                        <span
                          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                            isCompleted
                              ? "bg-emerald-100 text-emerald-700"
                              : isCurrent
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {isCompleted
                            ? "Completed"
                            : isCurrent
                            ? "In Progress"
                            : "Pending"}
                        </span>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>

    </section>
  );
}