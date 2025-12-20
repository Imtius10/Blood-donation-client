import React, { useEffect, useState } from "react";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

const AllUserRequests = () => {
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);
    const [total, setTotal] = useState(0);
    const [itemsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("all");
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get(`/admin/requests?page=${page - 1}&size=${itemsPerPage}&status=${status}`);
            setRequests(res.data.requests || []);
            setTotal(res.data.totalRequest || 0);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [page, status]);

    const totalPages = Math.ceil(total / itemsPerPage);

    const badge = (status) => {
        const map = {
            pending: 'bg-yellow-100 text-yellow-700',
            inprogress: 'bg-blue-100 text-blue-700',
            done: 'bg-green-100 text-green-700',
            canceled: 'bg-red-100 text-red-700'
        };
        return <span className={`px-2 py-1 rounded text-xs font-semibold ${map[status]}`}>{status}</span>;
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">All User Donation Requests</h2>

            <div className="flex items-center gap-3 mb-4">
                <label>Status Filter:</label>
                <select
                    value={status}
                    onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                    className="border rounded px-3 py-1"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Requester</th>
                            <th>Recipient</th>
                            <th>Blood Group</th>
                            <th>Location</th>
                            <th>Hospital</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? Array(itemsPerPage).fill().map((_, i) => (
                            <tr key={i}><td colSpan="8"><Skeleton height={40} /></td></tr>
                        )) : requests.length === 0 ? (
                            <tr><td colSpan="8" className="text-center py-4">No requests found</td></tr>
                        ) : requests.map((r, idx) => (
                            <tr key={r._id} className="hover:bg-gray-50">
                                <td>{(page - 1) * itemsPerPage + idx + 1}</td>
                                <td>{r.requesterName}</td>
                                <td>{r.recipientName}</td>
                                <td>{r.bloodGroup}</td>
                                <td>{r.upazila}, {r.district}</td>
                                <td>{r.hospitalName}</td>
                                <td>{r.donationDate}</td>
                                <td>{badge(r.donation_status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
                {[...Array(totalPages).keys()].map(p => (
                    <button key={p} onClick={() => setPage(p + 1)} className={`px-3 py-1 border rounded ${page === p + 1 ? 'bg-red-500 text-white' : ''}`}>{p + 1}</button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
        </div>
    );
};

export default AllUserRequests;
