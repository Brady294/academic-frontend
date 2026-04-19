const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(`${API_URL}/api${path}`, {
      ...options,
      signal: controller.signal,
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
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out. Backend did not respond.");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
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