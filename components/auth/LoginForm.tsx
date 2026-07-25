"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import TextInput from "../ui/TextInput";
import PasswordInput from "./PasswordInput";
import AuthDivider from "./AuthDivider";
import SocialLogin from "./SocialLogin";
import Spinner from "../ui/Spinner";

import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await login({
        email: form.email,
        password: form.password,
      });

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (user.is_admin) {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    } catch (error: any) {
      if (
        error.response?.data?.requiresVerification
      ) {
        router.push(
          `/verify-email?email=${encodeURIComponent(
            error.response.data.email
          )}`
        );

        return;
      }

      alert(
        error.response?.data?.error ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <TextInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />

            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Spinner className="mr-2" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <AuthDivider />

      <SocialLogin />

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Create one
        </Link>
      </p>
    </>
  );
}