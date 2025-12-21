import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaHospital, FaUserEdit } from "react-icons/fa";

const AdminDonationRequestsPage = () => {
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 8;
    const [loading, setLoading] = useState(true);

    const totalPages = Math.ceil(count / size);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoading(true);
                const res = await axiosSecure.get(
                    `/admin/donation-requests?page=${page}&size=${size}`
                );
                setRequests(res.data.requests || []);
                setCount(res.data.count || 0);
            } catch (err) {
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [page, axiosSecure]);

    const getStatusStyles = (status) => {
        const styles = {
            done: "bg-green-100 text-green-700 border-green-200",
            pending: "bg-amber-100 text-amber-700 border-amber-200",
            inprogress: "bg-blue-100 text-blue-700 border-blue-200",
            canceled: "bg-red-100 text-red-700 border-red-200",
        };
        return styles[status] || "bg-gray-100 text-gray-700";
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                       Total Donor
                    </h2>
                    <p className="text-gray-500 text-sm">Managing {count} total donation requests</p>
                </div>
            </div>

            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Recipient</th>
                            <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Hospital</th>
                            <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Blood Group</th>
                            <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            [...Array(size)].map((_, i) => (
                                <tr key={i}><td colSpan="4" className="px-6 py-4"><Skeleton height={40} /></td></tr>
                            ))
                        ) : (
                            requests.map((req) => (
                                <tr key={req._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-600 font-bold border border-red-100">
                                                {req.recipientName?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 leading-none">{req.recipientName}</p>
                                                <p className="text-[10px] text-gray-400 mt-1 uppercase">Date: {req.donationDate}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                        {req.hospitalName}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 rounded text-[10px] font-black bg-red-600 text-white">
                                            {req.bloodGroup}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyles(req.donation_status)}`}>
                                            {req.donation_status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden space-y-4">
                {loading ? (
                    <Skeleton count={3} height={120} borderRadius={16} />
                ) : (
                    requests.map((req) => (
                        <div key={req._id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusStyles(req.donation_status)}`}>
                                    {req.donation_status}
                                </span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">{req.donationDate}</span>
                            </div>
                            <h4 className="font-bold text-gray-800">{req.recipientName}</h4>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <FaHospital className="text-[10px]" /> {req.hospitalName}
                            </p>
                            <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
                                <span className="text-[10px] font-black text-red-600 bg-red-50 px-2 py-1 rounded tracking-tighter">
                                    GROUP: {req.bloodGroup}
                                </span>
                                <button className="text-gray-400">
                                    <FaUserEdit />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-10 flex justify-center items-center gap-2">
                {[...Array(totalPages).keys()].map((p) => (
                    <button
                        key={p}
                        onClick={() => { setPage(p); window.scrollTo(0, 0); }}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${page === p ? "bg-red-600 text-white shadow-lg" : "bg-white text-gray-400 border border-gray-200"
                            }`}
                    >
                        {p + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminDonationRequestsPage;