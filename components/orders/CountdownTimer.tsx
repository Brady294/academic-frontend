"use client";

import { useEffect, useState } from "react";

interface Props {
  deadline: string;
}

export default function CountdownTimer({
  deadline,
}: Props) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function updateTimer() {
      const end = new Date(deadline).getTime();
      const now = Date.now();

      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft("Deadline Passed");
        return;
      }

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

      setTimeLeft(
        `${days}d ${String(hours).padStart(2, "0")}h ${String(
          minutes
        ).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`
      );
    }

    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
        Time Remaining
      </p>

      <h2 className="mt-2 text-2xl font-bold text-orange-700">
        {timeLeft}
      </h2>
    </div>
  );
}