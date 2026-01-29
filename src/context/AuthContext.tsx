import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import api from "../api/axios";
import { logoutApi } from "../api/auth.api";
import { getAuthToken, setAuthToken, clearAuth } from "../utils/auth";

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (userData: User, t: string) => void;
    setToken: (t: string | null) => void;
    logout: () => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(getAuthToken());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) setAuthToken(token);
        else clearAuth();
    }, [token]);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.get("/auth/me"); 
                setUser(res.data);
            } catch (err: any) {
                console.error("Failed to fetch user", err);

                if (err.response?.status && err.response.status !== 401) {
                    setToken(null);
                    clearAuth();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const login = (userData: User, t: string) => {
        setUser(userData);
        setToken(t);
    };

    const logout = async () => {
        try {
            await logoutApi();
        } catch (err) {
            console.error("Logout API failed", err);
        }
        setUser(null);
        setToken(null);
        clearAuth();
    };

    return (
        <AuthContext.Provider value={{ user, token, login, setToken, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within an AuthProvider");
    return context;
};
