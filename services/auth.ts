import api from "@/lib/axios";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/api/auth/register", {
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  });

  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/api/auth/login", data);

  return response.data;
};

export const verifyEmail = async (
  email: string,
  code: string
) => {
  const response = await api.post("/api/auth/verify-email", {
    email,
    code,
  });

  return response.data;
};

export const resendVerificationCode = async (
  email: string
) => {
  const response = await api.post("/api/auth/resend-code", {
    email,
  });

  return response.data;
};