import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-10 p-16 bg-white dark:bg-black rounded-lg">
        
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <div className="text-center">
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            Academic Writing Platform
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Submit assignments, track progress, and manage payments seamlessly.
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded-full bg-black px-6 py-3 text-white hover:bg-zinc-800 dark:bg-white dark:text-black"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full border px-6 py-3 text-black hover:bg-zinc-100 dark:text-white dark:border-white dark:hover:bg-zinc-900"
          >
            Register
          </Link>

          <Link
            href="/submit"
            className="rounded-full border px-6 py-3 text-black hover:bg-zinc-100 dark:text-white dark:border-white dark:hover:bg-zinc-900"
          >
            Submit Work
          </Link>
        </div>

      </main>
    </div>
  );
}
