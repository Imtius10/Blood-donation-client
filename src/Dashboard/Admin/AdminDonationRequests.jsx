import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/UseAxios";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminDonationRequests = () => {
    const axiosInstance = useAxios();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get("/admin/donation-requests");
                setRequests(res.data || []);
            } catch (error) {
                console.error("Error fetching donation requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [axiosInstance]);

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6">
            <Toaster position="top-right" />

            <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
                🩸 Blood Donation Requests
            </h1>

            {/* Loading Skeleton */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} height={220} className="rounded-2xl" />
                    ))}
                </div>
            ) : requests.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    No donation requests found
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((req, index) => (
                        <motion.div
                            key={req._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500"
                        >
                            {/* Requester Info */}
                            <h2 className="text-xl font-semibold text-gray-800">
                                {req.requesterName}
                            </h2>
                            <p className="text-sm text-gray-500 mb-2">
                                📧 {req.requesterEmail}
                            </p>

                            {/* Recipient Info */}
                            <p className="text-sm text-gray-700 mb-1">
                                👤 Recipient:{" "}
                                <span className="font-medium">
                                    {req.recipientName}
                                </span>
                            </p>

                            <p className="text-sm text-gray-700 mb-1">
                                🩸 Blood Group:{" "}
                                <span className="font-bold text-red-600">
                                    {req.bloodGroup}
                                </span>
                            </p>

                            {/* Location */}
                            <p className="text-sm text-gray-600 mb-1">
                                📍 {req.upazila}, {req.district}
                            </p>

                            <p className="text-sm text-gray-600 mb-1">
                                🏥 {req.hospitalName}
                            </p>

                            <p className="text-sm text-gray-600 mb-2">
                                🏠 {req.address}
                            </p>

                            {/* Date & Time */}
                            <p className="text-sm text-gray-600 mb-1">
                                📅 {req.donationDate} ⏰ {req.donationTime}
                            </p>

                            {/* Message */}
                            {req.message && (
                                <p className="text-sm text-gray-500 italic mb-3">
                                    “{req.message}”
                                </p>
                            )}

                            {/* Status */}
                            <span
                                className={`inline-block px-3 py-1 text-sm rounded-full font-medium
                                ${req.donation_status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : req.donation_status === "done"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {req.donation_status}
                            </span>

                            {/* Created Date */}
                            <p className="text-xs text-gray-400 mt-3">
                                Created:{" "}
                                {new Date(req.createdAt).toLocaleString()}
                            </p>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDonationRequests;
