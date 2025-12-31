"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    window.location.href = "/login";
  }

  return (
    <div>
      <h1>Register</h1>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}
