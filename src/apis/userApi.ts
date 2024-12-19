import { useQuery, UseQueryResult } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { User } from "./user";

export interface ApiError extends Error {
  statusCode: number;
  message: string;
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`http://localhost:8080/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify({ email, password }),
    });

    const res = await response.json();

    if (response.ok) {
      return { success: true, token: res.data.token };
    } else {
      return { success: false, message: res.message || 'Login failed. Please try again.' };
    }
  } catch {
    return { success: false, message: 'An error occurred while logging in. Please try again.' };
  }
};

export const getUserData = async (token: string) => {
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

export function useGetUser (token: string | undefined): UseQueryResult<User> {
  return useQuery(['getUser'], () => getUserData(token || ''))
}
