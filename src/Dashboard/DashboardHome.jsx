import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import {
    FaTint,
    FaTrash,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AdminDonationStats from "./Admin/AdminDonationStats";
import AdminDonationRequests from "./Admin/AdminDonationRequests";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [recentRequests, setRecentRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inprogress: 0,
        done: 0,
        canceled: 0,
    });

    useEffect(() => {
        fetchRecentRequests();
    }, []);

    const fetchRecentRequests = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get("/my-requests?size=3&page=0");
            const requests = res.data.requests || [];

            setRecentRequests(requests);

            const computed = {
                total: requests.length,
                pending: 0,
                inprogress: 0,
                done: 0,
                canceled: 0,
            };

            requests.forEach((r) => {
                if (r.donation_status) computed[r.donation_status]++;
            });

            setStats(computed);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await axiosSecure.patch(`/donation-request/${id}`, {
                donation_status: status,
            });

            Swal.fire({
                icon: "success",
                title: "Updated",
                text: `Status changed to ${status}`,
                timer: 1500,
                showConfirmButton: false,
            });

            fetchRecentRequests();
        } catch (err) {
            Swal.fire("Error", "Failed to update status", "error");
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete request?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.delete(`/donation-request/${id}`);
            Swal.fire("Deleted", "Request removed", "success");
            fetchRecentRequests();
        } catch (err) {
            Swal.fire("Error", "Delete failed", "error");
        }
    };

    const badge = (status) => {
        const map = {
            pending: "bg-yellow-100 text-yellow-700",
            inprogress: "bg-blue-100 text-blue-700",
            done: "bg-green-100 text-green-700",
            canceled: "bg-red-100 text-red-700",
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Welcome Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-600 flex gap-4 items-center"
                >
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                        <FaTint className="text-white text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome back, {user?.displayName || "Donor"} 👋
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Quick overview of your donation activity
                        </p>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Object.keys(stats).map((key) => (
                        <motion.div
                            key={key}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl shadow-lg p-5 text-center transition-transform"
                        >
                            {loading ? (
                                <Skeleton height={30} />
                            ) : (
                                <>
                                    <p className="text-2xl font-bold text-red-600">{stats[key]}</p>
                                    <p className="text-sm text-gray-500 capitalize">{key}</p>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Recent Requests Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-red-600 px-6 py-4 text-white font-bold text-lg">
                        Recent Donation Requests
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                <tr>
                                    {["Recipient", "Location", "Date", "Blood", "Status", "Actions"].map((h) => (
                                        <th key={h} className="px-6 py-3 text-left">{h}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {loading ? (
                                    [...Array(3)].map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan="6" className="px-6 py-4">
                                                <Skeleton height={40} />
                                            </td>
                                        </tr>
                                    ))
                                ) : recentRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-6 text-gray-500">
                                            No requests found
                                        </td>
                                    </tr>
                                ) : (
                                    recentRequests.map((r) => (
                                        <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">{r.recipientName}</td>
                                            <td className="px-6 py-4">{r.upazila}, {r.district}</td>
                                            <td className="px-6 py-4">{r.donationDate}</td>
                                            <td className="px-6 py-4 font-bold text-red-600">{r.bloodGroup}</td>
                                            <td className="px-6 py-4">{badge(r.donation_status)}</td>
                                            <td className="px-6 py-4 flex gap-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(r._id, "done")}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                                                >
                                                    <FaCheckCircle />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(r._id, "canceled")}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                                >
                                                    <FaTimesCircle />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(r._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Admin Donation Stats */}
                <AdminDonationStats />
                <AdminDonationRequests></AdminDonationRequests>
            </div>
        </div>
    );
};

export default DashboardHome;