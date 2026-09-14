"use client";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Application */}
        <main className="flex min-w-0 flex-1 flex-col">
          <TopNavbar />

          <section className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}