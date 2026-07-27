import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        window.location.href = `${import.meta.env.VITE_CLIENT_URL || "http://localhost:5173"}/Login`;
        return null;
    }

    return children;
}

export default ProtectedRoute;