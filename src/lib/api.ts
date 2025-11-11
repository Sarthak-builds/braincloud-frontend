import axios from "axios";
import { AuthFormData, AuthResponse, ApiError } from "@/types";

const API_BASE_URL = 'http://localhost:3069/api';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.Authorization;
  }
};
//signup
export const signupApi = async (formData:AuthFormData): Promise<AuthResponse> => {
const { data } = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signup`,formData);
  return data;
}
//signin
export const signinApi = async (formData:AuthFormData): Promise<AuthResponse> => {

    const { data } = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signin`, formData);
    return data;
};
