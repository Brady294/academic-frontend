"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Clock3,
 Timer,
} from "lucide-react";

interface Props {
  deadline: string;
}

export default function CountdownTimer({
  deadline,
}: Props) {
  const [timeLeft, setTimeLeft] = useState("");
  const [expired, setExpired] = useState(false);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    function updateTimer() {
      const end = new Date(deadline).getTime();
      const now = Date.now();

      const distance = end - now;

      if (distance <= 0) {
        setExpired(true);
        setWarning(false);
        setTimeLeft("Deadline Passed");
        return;
      }

      setExpired(false);

      const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      );

      setWarning(
        distance <= 24 * 60 * 60 * 1000
      );

      setTimeLeft(
        `${days}d ${String(hours).padStart(
          2,
          "0"
        )}h ${String(minutes).padStart(
          2,
          "0"
        )}m ${String(seconds).padStart(
          2,
          "0"
        )}s`
      );
    }

    updateTimer();

    const interval = setInterval(
      updateTimer,
      1000
    );

    return () => clearInterval(interval);
  }, [deadline]);

  const theme = expired
    ? {
        bg: "bg-red-50",
        border: "border-red-200",
        badge: "bg-red-100 text-red-700",
        icon: AlertTriangle,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
      }
    : warning
    ? {
        bg: "bg-amber-50",
        border: "border-amber-200",
        badge: "bg-amber-100 text-amber-700",
        icon: AlertTriangle,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      }
    : {
        bg: "bg-blue-50",
        border: "border-blue-200",
        badge: "bg-blue-100 text-blue-700",
        icon: Clock3,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      };

  const Icon = theme.icon;

  return (
    <section
      className={`overflow-hidden rounded-2xl border ${theme.border} ${theme.bg} shadow-sm`}
    >
      <div className="flex items-center justify-between p-4">

        <div className="flex items-center gap-3">

          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${theme.iconBg}`}
          >
            <Icon
              size={20}
              className={theme.iconColor}
            />
          </div>

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Time Remaining
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-900">
              {timeLeft}
            </h2>

          </div>

        </div>

        <div
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${theme.badge}`}
        >
          <Timer size={14} />

          {expired
            ? "Expired"
            : warning
            ? "Urgent"
            : "On Track"}

        </div>

      </div>

      <div className="border-t border-white/70 bg-white/40 px-4 py-3">

        <div className="flex items-center justify-between">

          <span className="text-sm text-gray-500">
            Deadline
          </span>

          <span className="text-sm font-semibold text-gray-900">
            {new Date(deadline).toLocaleString()}
          </span>

        </div>

      </div>

    </section>
  );
}