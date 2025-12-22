import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import Loading from "./Loading";

const VolunteerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`)
        .then(res => setRole(res.data.role));
    }
  }, [user, axiosSecure]);

  if (loading || !role) return <Loading></Loading>;

  if (role === "admin" || role === "volunteer") {
    return children;
  }

  return <Navigate to="/dashboard" replace />;
};
export default VolunteerRoute;