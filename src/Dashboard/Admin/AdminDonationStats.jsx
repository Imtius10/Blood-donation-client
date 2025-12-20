import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/UseAxios";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminDonationStats = () => {
    const axiosInstance = useAxios();
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDonors, setTotalDonors] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get("/admin/donation-stats");
                setTotalAmount(res.data.totalAmount || 0);
                setTotalDonors(res.data.totalDonors || 0);
            } catch (error) {
                console.error("Error fetching donation stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [axiosInstance]);

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6">
            <Toaster position="top-right" />
            <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
                Donation Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Donation Amount */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-red-100 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center transition-transform"
                >
                    <h2 className="text-xl font-semibold text-red-700 mb-2">
                        Total Donation Amount
                    </h2>
                    {loading ? (
                        <Skeleton height={40} width={120} />
                    ) : (
                        <p className="text-4xl font-bold text-red-600">${totalAmount}</p>
                    )}
                </motion.div>

                {/* Total Donors */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center transition-transform"
                >
                    <h2 className="text-xl font-semibold text-blue-700 mb-2">
                        Total Number of Donors
                    </h2>
                    {loading ? (
                        <Skeleton height={40} width={120} />
                    ) : (
                        <p className="text-4xl font-bold text-blue-600">{totalDonors}</p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDonationStats;
