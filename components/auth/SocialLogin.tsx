"use client";

import { Globe } from "lucide-react";

interface SocialLoginProps {
  onGoogleLogin?: () => void;
}

export default function SocialLogin({
  onGoogleLogin,
}: SocialLoginProps) {
  return (
    <button
      type="button"
      onClick={onGoogleLogin}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
    >
      <Globe size={20} />
      Continue with Google
    </button>
  );
}