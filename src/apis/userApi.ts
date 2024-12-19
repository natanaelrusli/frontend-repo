import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { User } from "./user";
import { ApiResponse, LoginCredentials, LoginResponse, UpdateProfilePayload } from "./types";
import { ApiError } from "next/dist/server/api-utils";

const loginUser = async ({ email, password }: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(`http://localhost:8080/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const res = await response.json();

  if (response.ok) {
    Cookies.set("token", res.data.token);
    return { success: true, token: res.data.token };
  }

  return { success: false, message: res.message || "Login failed. Please try again." };
};

const updateProfile = async ({ email, name }: UpdateProfilePayload): Promise<ApiResponse> => {
  const token = Cookies.get("token");
  if (!token) {
    return { success: false, message: "No token" }; 
  }

  const response = await fetch("http://localhost:8080/update-user-data", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  });

  const data = await response.json();

  if (response.ok) {
    return { success: true, message: data.message }
  } else {
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return({ success: false, message: data.message });
  }
}

const getUserData = async (token: string) => {
  const response = await fetch('http://localhost:8080/fetch-user-data', {
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
