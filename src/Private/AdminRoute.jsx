import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";


const AdminRoute = ({ children }) => {
    const { role, loading, roleloading } = useContext(AuthContext);

    if (loading || roleloading) {
        return <p>Loading...</p>;
    }

    if (role !== "admin") {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default AdminRoute;
