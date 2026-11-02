
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

/* ==========================================================================
   API CONFIGURATION
============================================================================ */

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || ""
)
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

if (!API_URL) {
  console.error(
    "NEXT_PUBLIC_API_URL is not configured."
  );
}

const API_BASE_URL = `${API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ==========================================================================
   REQUEST CONFIGURATION
============================================================================ */

interface RetryRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/* ==========================================================================
   REQUEST INTERCEPTOR
   Attach access token to every API request.
============================================================================ */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window === "undefined") {
      return config;
    }

    const token =
      window.localStorage.getItem("accessToken");

    if (token) {
      config.headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    } else {
      config.headers.delete("Authorization");
    }

    return config;
  },

  (error) => Promise.reject(error)
);

/* ==========================================================================
   TOKEN REFRESH QUEUE
============================================================================ */

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

function processQueue(
  error: unknown,
  token: string | null = null
) {
  failedQueue.forEach(
    ({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else if (token) {
        resolve(token);
      }
    }
  );

  failedQueue = [];
}

/* ==========================================================================
   RESPONSE INTERCEPTOR
============================================================================ */

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | RetryRequestConfig
        | undefined;

    /* Only process authentication failures */

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    /* Wait for an ongoing token refresh */

    if (isRefreshing) {
      return new Promise<string>(
        (resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        }
      ).then((token) => {
        originalRequest._retry = true;

        originalRequest.headers.set(
          "Authorization",
          `Bearer ${token}`
        );

        return api(originalRequest);
      });
    }

    originalRequest._retry = true;

    isRefreshing = true;

    try {
      const refreshToken =
        window.localStorage.getItem(
          "refreshToken"
        );

      if (!refreshToken) {
        throw new Error(
          "No refresh token found."
        );
      }

      /*
       * Use plain axios to prevent the refresh request
       * from triggering this interceptor recursively.
       */

      const response = await axios.post<{
        accessToken: string;
      }>(
        `${API_BASE_URL}/auth/refresh`,
        {
          refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newAccessToken =
        response.data?.accessToken;

      if (!newAccessToken) {
        throw new Error(
          "Refresh response did not contain accessToken."
        );
      }

      /* Save new token */

      window.localStorage.setItem(
        "accessToken",
        newAccessToken
      );

      /* Update Axios defaults */

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;

      /* Release waiting requests */

      processQueue(
        null,
        newAccessToken
      );

      /* Retry original request */

      originalRequest.headers.set(
        "Authorization",
        `Bearer ${newAccessToken}`
      );

      return api(originalRequest);

    } catch (refreshError) {
      /* Reject all waiting requests */

      processQueue(refreshError);

      /* Clear invalid authentication session */

      window.localStorage.removeItem(
        "accessToken"
      );

      window.localStorage.removeItem(
        "refreshToken"
      );

      window.localStorage.removeItem(
        "user"
      );

      delete api.defaults.headers.common[
        "Authorization"
      ];

      /* Return to login */

      window.location.href = "/login";

      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false;
    }
  }
);

/* ==========================================================================
   EXPORT
============================================================================ */

export default api;
