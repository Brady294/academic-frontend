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
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    const contentType = res.headers.get("content-type") || "";
    let data: any = null;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = text ? { message: text } : null;
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
    headers: {
      "Content-Type": "application/json",
    },
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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function submitAssignment(payload: {
  title: string;
  subject: string;
  deadline: string;
  instructions: string;
  files: FileList | null;
}) {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("subject", payload.subject);
  formData.append("deadline", payload.deadline);
  formData.append("instructions", payload.instructions);

  if (payload.files) {
    Array.from(payload.files).forEach((file) => {
      formData.append("files", file);
    });
  }

  return apiFetch("/assignments", {
    method: "POST",
    body: formData,
  });
}