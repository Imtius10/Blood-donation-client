import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import Loading from "./Loading";

const AdminOrVolunteerRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [dbRole, setDbRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setDbRole(res.data.role);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user, axiosSecure]);

    if (authLoading || loading) return <Loading></Loading>;

    if (user && (dbRole === 'admin' || dbRole === 'volunteer')) {
        return children;
    }

    return <Navigate to="/dashboard" replace />;
};

export default AdminOrVolunteerRoute;