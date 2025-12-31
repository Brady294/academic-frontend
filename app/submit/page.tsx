"use client";
import { useState } from "react";
import { apiFetch } from "@/app/api";

export default function Submit() {
  const [pages, setPages] = useState(1);
  const [deadline, setDeadline] = useState(24);
  const [price, setPrice] = useState<any>(null);

  async function preview() {
    const res = await apiFetch("/api/assignments/preview-price", {
      method: "POST",
      body: JSON.stringify({
        pages,
        deadline_hours: deadline,
        currency: "KES",
      }),
    });
    setPrice(res);
  }

  return (
    <div>
      <h1>Submit Assignment</h1>
      <input type="number" placeholder="Pages" onChange={e=>setPages(+e.target.value)} />
      <input type="number" placeholder="Deadline (hours)" onChange={e=>setDeadline(+e.target.value)} />
      <button onClick={preview}>Preview Price</button>

      {price && (
        <p>
          Total: {price.total_converted} {price.currency}
        </p>
      )}
    </div>
  );
}
