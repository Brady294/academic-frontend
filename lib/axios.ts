import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| REQUEST INTERCEPTOR
|--------------------------------------------------------------------------
| Attach the access token to EVERY API request.
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("accessToken");

      console.log(
        "[API REQUEST]",
        config.method?.toUpperCase(),
        config.url,
        "TOKEN:",
        token ? "FOUND" : "MISSING"
      );

      if (token) {
        config.headers.set(
          "Authorization",
          `Bearer ${token}`
        );
      } else {
        config.headers.delete("Authorization");
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (
  error: unknown,
  token: string | null = null
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

/*
|--------------------------------------------------------------------------
| RESPONSE INTERCEPTOR
|--------------------------------------------------------------------------
| If access token expires, refresh it and retry the request.
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | (InternalAxiosRequestConfig & {
            _retry?: boolean;
          })
        | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    /*
    |--------------------------------------------------------------------------
    | Another request is already refreshing
    |--------------------------------------------------------------------------
    */

    if (isRefreshing) {
      return new Promise<string>(
        (resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        }
      ).then((token) => {
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
        localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error(
          "No refresh token found."
        );
      }

      console.log(
        "[AUTH] Access token expired. Refreshing..."
      );

      /*
      |----------------------------------------------------------------------
      | IMPORTANT:
      | Use plain axios here, not api, so we don't trigger the interceptor
      | recursively.
      |----------------------------------------------------------------------
      */

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
        {
          refreshToken,
        }
      );

      const accessToken =
        response.data.accessToken;

      if (!accessToken) {
        throw new Error(
          "Refresh response did not contain an access token."
        );
      }

      localStorage.setItem(
        "accessToken",
        accessToken
      );

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      processQueue(null, accessToken);

      originalRequest.headers.set(
        "Authorization",
        `Bearer ${accessToken}`
      );

      console.log(
        "[AUTH] Access token refreshed successfully."
      );

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      console.error(
        "[AUTH] Token refresh failed:",
        refreshError
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      delete api.defaults.headers.common[
        "Authorization"
      ];

      if (
        typeof window !== "undefined"
      ) {
        window.location.href = "/login";
      }

      return Promise.reject(
        refreshError
      );
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;