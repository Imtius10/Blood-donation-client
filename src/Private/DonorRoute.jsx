import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";

const DonorRoute = ({ children }) => {
    const { role, loading, roleloading } = useContext(AuthContext);

    if (loading || roleloading) {
        return <p>Loading...</p>;
    }

    if (role !== "donor") {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default DonorRoute;
