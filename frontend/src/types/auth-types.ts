export type AuthUser = {
    email: string;
    password: string;
}

export type AuthContextType = {
    user: AuthUser | null;
    loading: boolean;
    login: (data: AuthUser) => void;
    logout: () => void;
}