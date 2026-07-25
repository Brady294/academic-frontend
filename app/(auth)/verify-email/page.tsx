"use client";

import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

import Spinner from "@/components/ui/Spinner";

import {
  verifyEmail,
  resendVerificationCode,
} from "@/services/auth";

import { saveAuthSession } from "@/utils/authStorage";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();

  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!email) {
      router.replace("/register");
    }
  }, [email, router]);

  const handleVerify = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (code.length !== 6) {
      alert("Please enter the 6-digit verification code.");
      return;
    }

    setLoading(true);

    try {
      const response = await verifyEmail(email, code);

      saveAuthSession(
        response.accessToken,
        response.refreshToken,
        response.user
      );

      setUser(response.user);

      if (response.user.is_admin) {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      alert(
        error.response?.data?.error ??
          "Verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setResending(true);

    try {
      await resendVerificationCode(email);

      alert(
        "A new verification code has been sent."
      );
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      alert(
        error.response?.data?.error ??
          "Unable to resend verification code."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6">
      <form
        onSubmit={handleVerify}
        className="w-full space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Verify Email
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Enter the 6-digit verification code sent to
          </p>

          <p className="mt-1 break-all font-semibold text-blue-600">
            {email}
          </p>
        </div>

        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) =>
            setCode(
              e.target.value.replace(/\D/g, "")
            )
          }
          placeholder="000000"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800"
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Spinner className="mr-2" />
              Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </button>

        <button
          type="button"
          onClick={resendCode}
          disabled={resending}
          className="flex w-full items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {resending ? (
            <>
              <Spinner className="mr-2" size={16} />
              Sending...
            </>
          ) : (
            "Resend Verification Code"
          )}
        </button>
      </form>
    </main>
  );
}