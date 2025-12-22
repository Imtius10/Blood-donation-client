import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const AllUserRequests = () => {
    const axiosSecure = useAxiosSecure();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);

    const itemsPerPage = 10;
    const [totalRequests, setTotalRequests] = useState(0);

    // 🔹 Fetch requests
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get(
                `/admin/requests?page=${page - 1}&size=${itemsPerPage}&status=${statusFilter}`
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
        fetchRequests();
    }, [statusFilter, page]);

    // 🔹 Update donation status (ADMIN)
    const handleStatusChange = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/admin/requests/${id}/status`, {
                status: newStatus,
            });

            toast.success("Status updated successfully");
            fetchRequests(); // refresh list
        } catch (error) {
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

    return (
        <div className="p-6 md:p-8">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    All User Donation Requests
                    <span className="ml-2 text-sm text-white bg-red-600 px-3 py-1 rounded-full">
                        {totalRequests}
                    </span>
                </h2>

                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setPage(1);
                    }}
                    className="border px-3 py-1 rounded"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-6 text-center text-gray-500">
                        Loading requests...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-left">
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

                            <tbody>
                                {requests.map((r, idx) => (
                                    <tr
                                        key={r._id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            {(page - 1) * itemsPerPage + idx + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            {r.requesterName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {r.recipientName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {r.bloodGroup}
                                        </td>
                                        <td className="px-6 py-4">
                                            {r.upazila}, {r.district}
                                        </td>
                                        <td className="px-6 py-4">
                                            {r.hospitalName || "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {r.donationDate}
                                        </td>

                                        {/* 🔥 ADMIN STATUS CONTROL */}
                                        <td className="px-6 py-4">
                                            <select
                                                value={r.donation_status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        r._id,
                                                        e.target.value
                                                    )
                                                }
                                                className={`px-2 py-1 rounded text-sm border ${statusClass[r.donation_status]}`}
                                            >
                                                <option value="pending">
                                                    Pending
                                                </option>
                                                <option value="inprogress">
                                                    In Progress
                                                </option>
                                                <option value="done">
                                                    Done
                                                </option>
                                                <option value="canceled">
                                                    Canceled
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}

                                {requests.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            No requests found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-5">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Previous
                </button>

                {[...Array(totalPages).keys()].map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p + 1)}
                        className={`px-3 py-1 border rounded ${
                            page === p + 1
                                ? "bg-red-500 text-white"
                                : ""
                        }`}
                    >
                        {p + 1}
                    </button>
                ))}

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllUserRequests;
