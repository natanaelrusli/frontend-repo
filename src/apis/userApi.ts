import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ApiResponse, LoginCredentials, LoginResponse, UpdateProfilePayload } from "./types";
import { ApiError } from "next/dist/server/api-utils";
import { ErrorWithStatusCode } from "@/errors/errorWithStatusCode";
import { User } from "./user";

const loginUser = async ({ email, password }: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const res = await response.json();
  if (response.ok) {
    Cookies.set("token", res.data.token);
    return { success: true, statusCode: response.status, token: res.data.token };
  }

  throw new ErrorWithStatusCode(res.message || "Login failed", response.status);
};

const updateProfile = async ({ email, name }: UpdateProfilePayload): Promise<ApiResponse> => {
  const token = Cookies.get("token");
  if (!token) {
    throw new ErrorWithStatusCode("Update profile failed", 400);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/update-user-data`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  });

  const res = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new ErrorWithStatusCode(res.errors || "Unauthorized", response.status);
    } else if (response.status === 400) {
      throw new ErrorWithStatusCode(res.errors || "Invalid data", response.status);
    }

    throw new ErrorWithStatusCode(res.errors || "Update profile failed", response.status);
  }

  return { success: true, message: res.message };
}

const getUserData = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/fetch-user-data`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      Cookies.remove('token');
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    const error: ApiError = {
      name: "ApiError",
      statusCode: response.status,
      message: (await response.json()).message || `Error ${response.status}`,
    };

    throw error;
  }

  const resp = await response.json();
  return resp.data;
};

export const useLogin = (): UseMutationResult<LoginResponse, Error, LoginCredentials> => {
  return useMutation(loginUser);
};

export const useGetUser = (token: string | undefined): UseQueryResult<User> => {
  return useQuery(['getUser'], () => getUserData(token || ''), {
    retry: false
  })
}

export const useUpdateProfile = (): UseMutationResult<ApiResponse, Error, UpdateProfilePayload> => {
  return useMutation(updateProfile);
}
