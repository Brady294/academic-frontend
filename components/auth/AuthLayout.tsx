"use client";

import { ReactNode } from "react";
import Logo from "@/components/layout/Logo";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-52 -top-52 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute right-[-180px] top-1/4 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="absolute bottom-[-220px] left-1/3 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>

        {/* Card */}
        <AuthCard>
          <AuthHeader
            title={title}
            subtitle={subtitle}
          />

          <div className="mt-8">
            {children}
          </div>
        </AuthCard>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} TopStudyTutor. All rights reserved.
        </p>
      </div>
    </div>
  );
}