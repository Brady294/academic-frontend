"use client";

import {
  CheckCircle2,
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
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        Activity Timeline
      </h2>

      <div className="mt-8 space-y-8">

        {activities.map((activity, i) => (
          <div
            key={i}
            className="flex gap-5"
          >
            <div>

              {activity.completed ? (
                <CheckCircle2 className="text-green-600" />
              ) : (
                <Clock3 className="text-orange-500" />
              )}

            </div>

            <div>

              <h3 className="font-semibold">
                {activity.title}
              </h3>

              <p className="text-sm text-gray-500">
                {activity.date}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}