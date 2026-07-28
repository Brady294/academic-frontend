import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

import MouseSpotlight from "@/components/MouseSpotlight";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { SocketProvider } from "@/contexts/SocketContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "TopStudyTutor",
    template: "%s | TopStudyTutor",
  },

  description:
    "TopStudyTutor provides premium academic writing, tutoring, proofreading, editing, research assistance, coursework help, and assignment support from experienced academic experts.",

  keywords: [
    "Essay Writing",
    "Academic Writing",
    "Assignment Help",
    "Coursework Help",
    "Homework Help",
    "Research Paper",
    "Dissertation Help",
    "Online Tutor",
    "Academic Tutoring",
    "Proofreading",
    "Editing",
    "TopStudyTutor",
  ],

  authors: [
    {
      name: "TopStudyTutor",
    },
  ],

  creator: "TopStudyTutor",

  applicationName: "TopStudyTutor",

  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${inter.variable}`}
    >
      <body className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 font-sans antialiased transition-colors duration-500 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <ThemeProvider>
          <SocketProvider>
            <MouseSpotlight />

            {/* Premium Background */}
            <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">

              {/* Top Left */}
              <div className="absolute -left-60 -top-60 h-[700px] w-[700px] rounded-full bg-blue-400/15 blur-[170px] dark:bg-blue-500/10" />

              {/* Top Right */}
              <div className="absolute right-[-260px] top-[8%] h-[650px] w-[650px] rounded-full bg-indigo-400/12 blur-[180px] dark:bg-indigo-500/10" />

              {/* Bottom Left */}
              <div className="absolute bottom-[-260px] left-[8%] h-[700px] w-[700px] rounded-full bg-cyan-300/12 blur-[180px] dark:bg-cyan-500/10" />

              {/* Bottom Right */}
              <div className="absolute bottom-[-250px] right-[-200px] h-[650px] w-[650px] rounded-full bg-sky-300/10 blur-[180px] dark:bg-sky-500/10" />

              {/* Center */}
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/10 blur-[180px] dark:bg-blue-600/10" />

              {/* Extra Purple Glow */}
              <div className="absolute left-[35%] top-[15%] h-[450px] w-[450px] rounded-full bg-purple-300/5 blur-[170px] dark:bg-purple-500/10" />
            </div>

            <main className="relative z-10">
              {children}
            </main>
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}