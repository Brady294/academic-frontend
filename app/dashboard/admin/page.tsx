"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/app/api";

export default function AdminDashboard() {
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    apiFetch("/api/assignments/all")
      .then(setAssignments);
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {assignments.map(a => (
        <div key={a.id}>
          <h3>{a.title}</h3>
          <p>Status: {a.status}</p>
          <p>Paid: {a.paid_amount}/{a.total_amount}</p>
        </div>
      ))}
    </div>
  );
}
