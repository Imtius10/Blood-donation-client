import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [selectedStatus, setSelectedStatus] = useState({});

    // Fetch all users
    const fetchUsers = () => {
        if (!user) return;

        axiosSecure
            .get("/users")
            .then((res) => {
                setUsers(res.data);
                const roles = {};
                const status = {};
                res.data.forEach((u) => {
                    roles[u._id] = u.role || "user";
                    status[u._id] = u.status || "active";
                });
                setSelectedRoles(roles);
                setSelectedStatus(status);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, [axiosSecure, user]);

    // Update selected role
    const handleRoleSelect = (id, role) => {
        setSelectedRoles((prev) => ({ ...prev, [id]: role }));
    };

    // Update selected status
    const handleStatusSelect = (id, status) => {
        setSelectedStatus((prev) => ({ ...prev, [id]: status }));
    };

    // Update both role and status in backend
    const handleUpdateStatus = (email, status, role) => {
        axiosSecure
            .patch(`/update/user/status?email=${email}&status=${status}&role=${role}`)
            .then(() => {
                toast.success(`Status updated to ${status} and role updated to ${role}`);
                fetchUsers();
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to update status or role");
            });
    };

    return (
        <div className="p-6 md:p-8">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    All Users
                    <span className="ml-2 text-sm text-white bg-red-600 px-3 py-1 rounded-full">
                        {users.length}
                    </span>
                </h2>
            </div>

            {/* Users Table */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-6 text-center text-gray-500">Loading users...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-left">
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Role</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr
                                        key={u._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {u.name || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{u.email}</td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${u.role === "admin"
                                                        ? "bg-red-100 text-red-700"
                                                        : u.role === "donor"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-gray-200 text-gray-700"
                                                    }`}
                                            >
                                                {u.role || "user"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${u.status === "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-200 text-gray-700"
                                                    }`}
                                            >
                                                {u.status || "active"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 flex flex-wrap gap-2">
                                            {/* Role select */}
                                            <select
                                                value={selectedRoles[u._id]}
                                                onChange={(e) =>
                                                    handleRoleSelect(u._id, e.target.value)
                                                }
                                                className="border px-2 py-1 rounded"
                                            >
                                                <option value="user">User</option>
                                                <option value="donor">Donor</option>
                                                <option value="admin">Admin</option>
                                            </select>

                                            {/* Status select */}
                                            <select
                                                value={selectedStatus[u._id]}
                                                onChange={(e) =>
                                                    handleStatusSelect(u._id, e.target.value)
                                                }
                                                className="border px-2 py-1 rounded"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>

                                            {/* Single Update Button */}
                                            <button
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        u.email,
                                                        selectedStatus[u._id],
                                                        selectedRoles[u._id]
                                                    )
                                                }
                                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {users.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
