"use client";

import { useEffect, useState } from "react";
import { Clock3, AlertTriangle } from "lucide-react";

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

      // Warning when less than 24 hours remain
      setWarning(distance <= 1000 * 60 * 60 * 24);

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

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const colors = expired
    ? {
        border: "border-red-200",
        bg: "bg-red-50",
        icon: "text-red-600",
        title: "text-red-600",
        value: "text-red-700",
      }
    : warning
    ? {
        border: "border-orange-200",
        bg: "bg-orange-50",
        icon: "text-orange-600",
        title: "text-orange-600",
        value: "text-orange-700",
      }
    : {
        border: "border-blue-200",
        bg: "bg-blue-50",
        icon: "text-blue-600",
        title: "text-blue-600",
        value: "text-blue-700",
      };

  return (
    <div
      className={`rounded-2xl border ${colors.border} ${colors.bg} p-5 shadow-sm`}
    >
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">

          {expired ? (
            <AlertTriangle
              size={20}
              className={colors.icon}
            />
          ) : (
            <Clock3
              size={20}
              className={colors.icon}
            />
          )}

        </div>

        <div>

          <p
            className={`text-xs font-semibold uppercase tracking-wider ${colors.title}`}
          >
            Time Remaining
          </p>

          <h2
            className={`mt-1 text-xl font-bold ${colors.value}`}
          >
            {timeLeft}
          </h2>

        </div>

      </div>
    </div>
  );
}