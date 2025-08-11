import { request } from "./request";
import { setToken } from "../services/actions/user";
import { AppDispatch } from "../services/types";

type TTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

const getAccessToken = (): Promise<TTokenResponse> => {
  const token = localStorage.getItem("refreshToken");
  return request<TTokenResponse>("/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
};

export const requestWithRefresh = async <T>(
  endpoint: string,
  options: RequestInit,
  dispatch: AppDispatch
) => {
  try {
    return await request<T>(endpoint, options);
  } catch (err: any) {
    if (
      err.message === "jwt expired" ||
      err.message === "You should be authorised"
    ) {
      try {
        const refreshData = await getAccessToken();

        const newAccessToken = refreshData.accessToken.split("Bearer ")[1];
        const newRefreshToken = refreshData.refreshToken;
        localStorage.setItem("refreshToken", newRefreshToken);
        dispatch(setToken(newAccessToken));

        options.headers = {
          ...options.headers,
          Authorization: "Bearer " + newAccessToken,
        };

        return await request<T>(endpoint, options);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(err);
    }
  }
};
