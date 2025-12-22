import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Private/Loading";

const AllUserRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalRequests, setTotalRequests] = useState(0);
    const itemsPerPage = 10;

    // State to store the LOGGED-IN user's info from MongoDB
    const [dbUser, setDbUser] = useState(null);

    // 1. Fetch current user's role from MongoDB
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setDbUser(res.data);
                })
                .catch(err => console.error("Error fetching MongoDB profile:", err));
        }
    }, [user?.email, axiosSecure]);

    // 2. Fetch requests (Accessible by Admin/Volunteer)
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get(
                `/admin-requests?page=${page - 1}&size=${itemsPerPage}&status=${statusFilter}`
            );

            setRequests(res.data.requests || []);
            setTotalRequests(res.data.totalRequest || 0);
        } catch (error) {
            toast.error("Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Ensure user is not a donor before fetching
        if (dbUser && dbUser.role !== 'donor') {
            fetchRequests();
        }
    }, [statusFilter, page, dbUser]);

    // 3. Update donation status
   const handleStatusChange = async (id, newStatus) => {
    try {
        await axiosSecure.patch(`/requests/${id}/status`, {
            status: newStatus,
        });

        toast.success("Status updated successfully");
        fetchRequests();
    } catch (error) {
        console.error(error);
        toast.error("Failed to update status");
    }
};


    const totalPages = Math.ceil(totalRequests / itemsPerPage);

    const statusClass = {
        pending: "bg-yellow-100 text-yellow-700",
        inprogress: "bg-blue-100 text-blue-700",
        done: "bg-green-100 text-green-700",
        canceled: "bg-red-100 text-red-700",
    };

    // Access control: If role is still loading or user is a donor
    if (!dbUser) return <Loading></Loading>
    if (dbUser.role === 'donor') return <div className="p-8 text-center text-red-600 font-bold">Access Denied: Admin or Volunteer only.</div>;

    return (
        <div className="p-6 md:p-8">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    All User Donation Requests
                    <span className="ml-2 text-sm text-white bg-red-600 px-3 py-1 rounded-full">
                        {totalRequests}
                    </span>
                </h2>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Filter Status:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        className="border px-3 py-1 rounded bg-white shadow-sm focus:ring-2 focus:ring-red-500"
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                {loading ? (
                    <Loading></Loading>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-700 text-left border-b">
                                    <th className="px-6 py-3">#</th>
                                    <th className="px-6 py-3">Requester</th>
                                    <th className="px-6 py-3">Recipient</th>
                                    <th className="px-6 py-3">Blood</th>
                                    <th className="px-6 py-3">Location</th>
                                    <th className="px-6 py-3">Hospital</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {requests.map((r, idx) => (
                                    <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">{(page - 1) * itemsPerPage + idx + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{r.requesterName}</td>
                                        <td className="px-6 py-4">{r.recipientName}</td>
                                        <td className="px-6 py-4 font-bold text-red-600">{r.bloodGroup}</td>
                                        <td className="px-6 py-4 text-gray-600">{r.upazila}, {r.district}</td>
                                        <td className="px-6 py-4">{r.hospitalName || "N/A"}</td>
                                        <td className="px-6 py-4">{r.donationDate}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={r.donation_status}
                                                onChange={(e) => handleStatusChange(r._id, e.target.value)}
                                                className={`px-2 py-1 rounded text-xs font-semibold border ${statusClass[r.donation_status] || "bg-gray-100"}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="inprogress">In Progress</option>
                                                <option value="done">Done</option>
                                                <option value="canceled">Canceled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                                {requests.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-10 text-gray-400">No requests found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all"
                >
                    Previous
                </button>

                <div className="flex gap-1">
                    {[...Array(totalPages).keys()].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p + 1)}
                            className={`w-10 h-10 rounded-lg border font-medium transition-all ${
                                page === p + 1 ? "bg-red-600 text-white border-red-600 shadow-md" : "hover:bg-gray-50"
                            }`}
                        >
                            {p + 1}
                        </button>
                    ))}
                </div>

                <button
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllUserRequests;