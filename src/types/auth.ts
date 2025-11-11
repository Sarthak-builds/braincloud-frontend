import {User} from "./user"
export interface AuthFormData {
    username?: string;
    email?: string;
    password:string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
