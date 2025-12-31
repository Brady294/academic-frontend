"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/app/api";
import { logout } from "@/lib/auth";

export default function Dashboard() {
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    apiFetch("/api/assignments")
      .then(setAssignments)
      .catch(() => logout());
  }, []);

  return (
    <div>
      <h1>My Assignments</h1>
      <button onClick={logout}>Logout</button>

      {assignments.map(a => (
        <div key={a.id}>
          <h3>{a.title}</h3>
          <p>Status: {a.status}</p>
          <p>Payment: {a.payment_status}</p>
        </div>
      ))}
    </div>
  );
}
