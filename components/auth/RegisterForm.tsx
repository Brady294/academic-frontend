"use client";

import { useState } from "react";
import Link from "next/link";
import TextInput from "../ui/TextInput";
import PasswordInput from "./PasswordInput";
import AuthDivider from "./AuthDivider";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
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

    console.log(form);

    // Backend integration next
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="grid gap-5 md:grid-cols-2">

          <TextInput
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="John"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <TextInput
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            value={form.lastName}
            onChange={handleChange}
            required
          />

        </div>

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
          autoComplete="new-password"
          required
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />

        <label className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">

          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            required
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />

          <span>
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Privacy Policy
            </Link>
          </span>

        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Create Account
        </button>

      </form>

      <AuthDivider />

      <SocialLogin />

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{" "}
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