import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...props }) => {
    return props.isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />;
}