import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function AuthGuard() {
    // 1. Subscribe to useAuth to get the boolean `isAuthenticated` and keep track of the client's state
    const { isAuthenticated } = useAuth();

    // 2. If the user is not authenticated, redirect them to the login page
    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        // 3. If authenticated, then return the children
        <Outlet />
    );
}