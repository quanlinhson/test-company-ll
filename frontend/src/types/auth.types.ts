export type UserRole = 'User' | 'Admin';

export interface User {
    id: string;
    email: string;
    username?: string;
    role: UserRole;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: User;
}