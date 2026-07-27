import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");

        if(urlToken) {
            localStorage.setItem("token",urlToken);
            setToken(urlToken);

            window.history.replaceState({}, "", window.location.pathname);
        }else{
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        }

        setLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        window.location.href = import.meta.env.VITE_CLIENT_URL || "/";
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!token,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }
    return context;
}