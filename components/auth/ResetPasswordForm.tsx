"use client";

import { useState } from "react";
import Link from "next/link";
import PasswordInput from "./PasswordInput";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      password,
      confirmPassword,
    });

    // Backend integration later
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">

        <PasswordInput
          id="password"
          name="password"
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          required
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Reset Password
        </button>

      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Back to{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Sign In
        </Link>
      </p>
    </>
  );
}