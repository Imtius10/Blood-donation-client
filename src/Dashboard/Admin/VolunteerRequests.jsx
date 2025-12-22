import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Private/Loading";

const VolunteerRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalRequests, setTotalRequests] = useState(0);
    const [dbUser, setDbUser] = useState(null);
    const itemsPerPage = 10;

    // Fetch role from MongoDB
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => setDbUser(res.data))
                .catch(err => console.error(err));
        }
    }, [user?.email, axiosSecure]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get(
                `/volunteer/all-requests?page=${page - 1}&size=${itemsPerPage}&status=${statusFilter}`
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
        if (dbUser?.role === 'volunteer' || dbUser?.role === 'admin') {
            fetchRequests();
        }
    }, [statusFilter, page, dbUser]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/donation-request/${id}`, {
                donation_status: newStatus,
            });
            toast.success("Status updated");
            fetchRequests(); 
        } catch (error) {
            toast.error("Update failed");
        }
    };

    if (!dbUser && loading) return <Loading></Loading>;
    if (dbUser && dbUser.role === 'donor') return <div className="p-10 text-center text-red-500">Access Denied</div>;

    const totalPages = Math.ceil(totalRequests / itemsPerPage);

    return (
        <div className="p-6 md:p-8">
            <Toaster position="top-right" />
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Volunteer: All Donation Requests
                    <span className="ml-2 text-sm text-white bg-blue-600 px-3 py-1 rounded-full">{totalRequests}</span>
                </h2>
                <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                    className="border px-3 py-1 rounded bg-white"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden border">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Recipient</th>
                                <th className="px-6 py-3">Blood</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {loading ? (
                                <tr><Loading></Loading></tr>
                            ) : (
                                requests.map((r, idx) => (
                                    <tr key={r._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">{(page - 1) * itemsPerPage + idx + 1}</td>
                                        <td className="px-6 py-4 font-medium">{r.recipientName}</td>
                                        <td className="px-6 py-4 font-bold text-red-600">{r.bloodGroup}</td>
                                        <td className="px-6 py-4">{r.upazila}, {r.district}</td>
                                        <td className="px-6 py-4">{r.donationDate}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={r.donation_status}
                                                onChange={(e) => handleStatusChange(r._id, e.target.value)}
                                                className="px-2 py-1 rounded text-xs border font-semibold bg-white"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="inprogress">In Progress</option>
                                                <option value="done">Done</option>
                                                <option value="canceled">Canceled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
                {[...Array(totalPages).keys()].map((p) => (
                    <button key={p} onClick={() => setPage(p + 1)} className={`w-10 h-10 rounded border ${page === p + 1 ? "bg-blue-600 text-white" : ""}`}>
                        {p + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default VolunteerRequests;