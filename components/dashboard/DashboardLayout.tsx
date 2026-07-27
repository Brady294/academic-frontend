"use client";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar />

      <main className="flex-1 flex flex-col">

        <TopNavbar />

        <section className="flex-1 p-8 overflow-y-auto">

          {children}

        </section>

      </main>

    </div>
  );
}