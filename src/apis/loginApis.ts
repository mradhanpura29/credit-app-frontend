import api from "@/utils/apiRequest";

// Request type
export interface SignInRequest {
  email: string;
  password: string;
}

// Response type
export interface SignInResponse {
  message: string;
  firstName: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

// Sign in API function
export const signIn = async (
  credentials: SignInRequest
): Promise<SignInResponse> => {
  const response = await api.post<SignInResponse, SignInRequest>(
    "/signin",
    credentials
  );
  return response;
};
