export interface ApiResponse {
  success: boolean;
  message?: string;
}
export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  email: string;
  name: string;
}

export interface ApiError extends Error {
  statusCode: number;
  message: string;
}