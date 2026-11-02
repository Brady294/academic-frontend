import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| REQUEST INTERCEPTOR
|--------------------------------------------------------------------------
| Attach the access token to every browser request.
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window === "undefined") {
      return config;
    }

    const token =
      window.localStorage.getItem(
        "accessToken"
      );

    if (token) {
      config.headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    } else {
      config.headers.delete(
        "Authorization"
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
|--------------------------------------------------------------------------
| REFRESH QUEUE
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| RESPONSE INTERCEPTOR
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

    /*
    |--------------------------------------------------------------------------
    | Only handle 401 responses
    |--------------------------------------------------------------------------
    */

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    /*
    |--------------------------------------------------------------------------
    | Wait if another request is refreshing
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
        window.localStorage.getItem(
          "refreshToken"
        );

      if (!refreshToken) {
        throw new Error(
          "No refresh token found."
        );
      }

      /*
      |--------------------------------------------------------------------------
      | IMPORTANT
      |--------------------------------------------------------------------------
      | Use plain axios here.
      | Do NOT use `api`, otherwise the refresh request itself can enter
      | the interceptor again.
      |--------------------------------------------------------------------------
      */

      const response =
        await axios.post<{
          accessToken: string;
        }>(
          `${API_URL}/api/auth/refresh`,
          {
            refreshToken,
          }
        );

      const newAccessToken =
        response.data.accessToken;

      if (!newAccessToken) {
        throw new Error(
          "Refresh response did not contain accessToken."
        );
      }

      window.localStorage.setItem(
        "accessToken",
        newAccessToken
      );

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;

      processQueue(
        null,
        newAccessToken
      );

      originalRequest.headers.set(
        "Authorization",
        `Bearer ${newAccessToken}`
      );

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

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

      window.location.href = "/login";

      return Promise.reject(
        refreshError
      );
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;