import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "./Loading";

const VolunteerRoute = ({ children }) => {
    const { role, loading, roleloading } = useContext(AuthContext);

    if (loading || roleloading) {
        return <Loading></Loading>
    }

    if (role !== "volunteer" && role !== "admin") {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default VolunteerRoute;
