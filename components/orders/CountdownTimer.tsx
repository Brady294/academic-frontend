"use client";

import { useEffect, useState } from "react";

interface Props {
  deadline: string;
}

export default function CountdownTimer({
  deadline,
}: Props) {
  const [timeLeft, setTimeLeft] =
    useState("");

  useEffect(() => {
    const timer = setInterval(() => {
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
        (distance %
          (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (distance %
          (1000 * 60 * 60)) /
          (1000 * 60)
      );

      setTimeLeft(
        `${days}d ${hours}h ${minutes}m`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">

      <p className="text-sm uppercase tracking-wide text-orange-600">
        Time Remaining
      </p>

      <h2 className="mt-3 text-3xl font-bold text-orange-700">
        {timeLeft}
      </h2>

    </div>
  );
}