import api from "@/utils/apiRequest";

// Request type
export interface SignInRequest {
  email: string;
  password: string;
}

// Response type
export interface SignInResponse {
  firstName: string;
  email: string;
  role: string;
}

// Sign in API function
export const signIn = async (
  credentials: SignInRequest
): Promise<SignInResponse> => {
  const response = await api.post<SignInResponse, SignInRequest>(
    "v1/signin",
    credentials
  );
  return response;
};
