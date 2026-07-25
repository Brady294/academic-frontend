"use client";

interface AuthDividerProps {
  text?: string;
}

export default function AuthDivider({
  text = "or continue with",
}: AuthDividerProps) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-300 dark:border-slate-700" />
      </div>

      <div className="relative flex justify-center">
        <span className="bg-white px-4 text-sm text-slate-500 dark:bg-slate-900 dark:text-slate-400">
          {text}
        </span>
      </div>
    </div>
  );
}