const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  let data: any = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(
      data?.error || data?.message || `Request failed with status ${res.status}`
    );
  }

  return data;
}

export async function loginUser(payload: {
  email: string;
  password: string;
}) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}