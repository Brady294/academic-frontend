"use client";

import { LoaderCircle } from "lucide-react";

interface SpinnerProps {
  size?: number;
  className?: string;
}

export default function Spinner({
  size = 20,
  className = "",
}: SpinnerProps) {
  return (
    <LoaderCircle
      size={size}
      className={`animate-spin ${className}`}
    />
  );
}