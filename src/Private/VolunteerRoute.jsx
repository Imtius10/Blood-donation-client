import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";

const VolunteerRoute = ({ children }) => {
    const { role, loading, roleloading } = useContext(AuthContext);

    if (loading || roleloading) {
        return <p>Loading...</p>;
    }

    if (role !== "volunteer" && role !== "admin") {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default VolunteerRoute;
