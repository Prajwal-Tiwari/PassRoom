import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token , setToken] = useState(null);
    const [loading, setLoading] = useState(true);


    // Restore session from localStorage if it exists 
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);
    
    const signup = async (name, email, password) => {
        const res = await api.post("/auth/signup", {name, email, password });
        saveSession(res.data.token, res.data.user);
        return res.data;
    }

    const login = async (email, password) => {
        const res = await api.post("/auth/login", {email, password});
        saveSession(res.data.token, res.data.user);
        return res.data;
    };

    const saveSession = (newToken, newUser) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    const value = {
        user, 
        token,
        loading,
        isAuthenticated: !!token,
        signup,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }
    return context;
}