"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <TopNavbar />

          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}