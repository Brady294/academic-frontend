import api from "@/lib/axios";

import {
  RegisterData,
  LoginData,
  AuthResponse,
  RefreshTokenResponse,
} from "@/types/auth";

export const registerUser = async (
  data: RegisterData
): Promise<{
  message: string;
  email: string;
  requiresVerification: boolean;
}> => {
  const response = await api.post(
    "/auth/register",
    {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
      confirmPassword:
        data.confirmPassword,
    }
  );

  return response.data;
};

export const verifyEmail = async (
  email: string,
  code: string
): Promise<AuthResponse> => {
  const response =
    await api.post<AuthResponse>(
      "/auth/verify-email",
      {
        email,
        code,
      }
    );

  return response.data;
};

export const resendVerificationCode =
  async (
    email: string
  ): Promise<{ message: string }> => {
    const response = await api.post(
      "/auth/resend-code",
      {
        email,
      }
    );

    return response.data;
  };

export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response =
    await api.post<AuthResponse>(
      "/auth/login",
      data
    );

  return response.data;
};

export const refreshToken =
  async (
    refreshToken: string
  ): Promise<RefreshTokenResponse> => {
    const response =
      await api.post<RefreshTokenResponse>(
        "/auth/refresh",
        {
          refreshToken,
        }
      );

    return response.data;
  };

export const forgotPassword =
  async (
    email: string
  ): Promise<{ message: string }> => {
    const response = await api.post(
      "/auth/forgot-password",
      {
        email,
      }
    );

    return response.data;
  };

export const resetPassword =
  async (
    token: string,
    password: string,
    confirmPassword: string
  ): Promise<{ message: string }> => {
    const response = await api.post(
      "/auth/reset-password",
      {
        token,
        password,
        confirmPassword,
      }
    );

    return response.data;
  };

export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem(
    "refreshToken"
  );
  localStorage.removeItem("user");

  delete api.defaults.headers.common
    .Authorization;
};