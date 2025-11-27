import axios from "axios";
import { AuthFormData, AuthResponse, ApiError } from "@/types";
import { Content, ContentFormData, ContentListResponse, ContentResponse } from "@/types/content";

const API_BASE_URL = 'http://localhost:3069/api';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
//for rest of the routes
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.Authorization;
  }
};
///////////////////
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
/////content add
export const addContentApi = async (formData: ContentFormData): Promise<ContentResponse> => {
  const { data } = await axios.post<ContentResponse>(`${API_BASE_URL}/v1/content`, formData)
  return data;
}
export const getContentApi = async (): Promise<ContentListResponse>=> {
const { data } = await axios.get<ContentListResponse>(`${API_BASE_URL}/v1/content`);
return data;
}



export default api;