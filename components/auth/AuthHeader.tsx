"use client";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="text-center">

      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">

        {title}

      </h1>

      <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">

        {subtitle}

      </p>

    </div>
  );
}