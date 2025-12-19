import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

const MyDonationRequests = () => {
    const axiosSecure = useAxiosSecure();

    const [myRequests, setMyRequests] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState("all");

    useEffect(() => {
        axiosSecure
            .get(
                `/my-requests?page=${currentPage - 1}&size=${itemsPerPage}&status=${status}`
            )
            .then((res) => {
                setMyRequests(res.data.request);
                setTotalRequest(res.data.totalRequest);
            });
    }, [axiosSecure, currentPage, itemsPerPage, status]);

    const totalPages = Math.ceil(totalRequest / itemsPerPage);

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">
                My Donation Requests 🩸
            </h2>

            {/* Filter */}
            <div className="flex items-center gap-3 mb-4">
                <label className="font-medium">Filter by Status:</label>
                <select
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border rounded px-3 py-1"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Recipient</th>
                            <th>Blood Group</th>
                            <th>Location</th>
                            <th>Hospital</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myRequests.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No donation requests found
                                </td>
                            </tr>
                        ) : (
                            myRequests.map((req, index) => (
                                <tr key={req._id}>
                                    <td>
                                        {(currentPage - 1) * itemsPerPage +
                                            index +
                                            1}
                                    </td>
                                    <td>{req.recipientName}</td>
                                    <td>{req.bloodGroup}</td>
                                    <td>
                                        {req.upazila}, {req.district}
                                    </td>
                                    <td>{req.hospitalName}</td>
                                    <td>{req.donationDate}</td>
                                    <td>
                                        <span
                                            className={`px-2 py-1 rounded text-sm capitalize
                                            ${req.donation_status ===
                                                    "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : req.donation_status ===
                                                        "inprogress"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : req.donation_status ===
                                                            "done"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {req.donation_status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Previous
                </button>

                {[...Array(totalPages).keys()].map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page + 1)}
                        className={`px-3 py-1 border rounded
                            ${currentPage === page + 1
                                ? "bg-red-500 text-white"
                                : ""
                            }`}
                    >
                        {page + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyDonationRequests;
