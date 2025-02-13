export type AuthUser = {
    username: string;
    password: string;
    authToken?: string
}

export type AuthContextType = {
    user: AuthUser | null;
    loading: boolean;
    saveAuthUser: (data: AuthUser) => void;
    login: (data: AuthUser) => void;
    logout: () => void;
}