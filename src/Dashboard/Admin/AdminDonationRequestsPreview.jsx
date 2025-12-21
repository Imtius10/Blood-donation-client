import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/UseAxios";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";
import {
    FaTint,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
} from "react-icons/fa";

const AdminDonationRequestsPreview = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get(
                    "/admin/donation-requests/preview"
                );
                setRequests(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPreview();
    }, [axiosInstance]);

    const statusStyle = (status) => {
        const map = {
            done: "bg-green-100 text-green-700",
            pending: "bg-yellow-100 text-yellow-700",
            canceled: "bg-red-100 text-red-700",
            inprogress: "bg-blue-100 text-blue-700",
        };
        return map[status] || "bg-gray-100 text-gray-700";
    };

    return (
        <section className="mt-16">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-gray-800">
                    Recent Donation Requests
                </h2>
                <p className="text-gray-500 mt-2">
                    Latest blood donation activities across all regions
                </p>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} height={220} className="rounded-2xl" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((req, index) => (
                        <motion.div
                            key={req._id}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 }}
                            whileHover={{ y: -6 }}
                            className="relative bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                        >
                            {/* Accent */}
                            <div className="absolute top-0 left-0 h-full w-1 bg-red-600" />

                            <div className="p-6 space-y-3">
                                {/* Name + Status */}
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {req.recipientName}
                                    </h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                                            req.donation_status
                                        )}`}
                                    >
                                        {req.donation_status}
                                    </span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center text-sm text-gray-500 gap-2">
                                    <FaMapMarkerAlt className="text-red-500" />
                                    {req.upazila}, {req.district}
                                </div>

                                {/* Blood */}
                                <div className="flex items-center gap-2 text-red-600 font-bold text-lg">
                                    <FaTint />
                                    {req.bloodGroup}
                                </div>

                                {/* Date & Time */}
                                <div className="flex justify-between text-sm text-gray-500 pt-2 border-t">
                                    <span className="flex items-center gap-1">
                                        <FaCalendarAlt />
                                        {req.donationDate}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaClock />
                                        {req.donationTime}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* See All */}
            <div className="flex justify-center mt-12">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("donation-requests")}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition"
                >
                    View All Requests
                </motion.button>
            </div>
        </section>
    );
};

export default AdminDonationRequestsPreview;
