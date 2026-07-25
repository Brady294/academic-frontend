"use client";

import { LoaderCircle } from "lucide-react";

interface SpinnerProps {
  size?: number;
}

export default function Spinner({
  size = 20,
}: SpinnerProps) {
  return (
    <LoaderCircle
      size={size}
      className="animate-spin"
    />
  );
}