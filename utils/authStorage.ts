import { User } from "@/types/auth";

export const saveAuthSession = (
  accessToken: string,
  refreshToken: string,
  user: User
) => {
  localStorage.setItem(
    "accessToken",
    accessToken
  );

  localStorage.setItem(
    "refreshToken",
    refreshToken
  );

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
};

export const clearAuthSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const getStoredUser = (): User | null => {
  try {
    const user = localStorage.getItem("user");

    if (!user) return null;

    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const getAccessToken = () =>
  localStorage.getItem("accessToken");

export const getRefreshToken = () =>
  localStorage.getItem("refreshToken");

export const isLoggedIn = () =>
  !!getAccessToken();