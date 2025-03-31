import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import LoadingScreen from "./LoadingScreen";

type AuthProviderProps = {
    children: React.ReactNode;
};

const ProtectedRoute = ({ children }: AuthProviderProps) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return user ? <>{children}</> : <Navigate to="/auth/login" />;
}

export default ProtectedRoute;

