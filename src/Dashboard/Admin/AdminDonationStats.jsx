import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/UseAxios";
import { Toaster } from "react-hot-toast";

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
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <Toaster position="top-right" />
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-6">Donation Dashboard</h1>

                {loading ? (
                    <p className="text-gray-500">Loading stats...</p>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="bg-red-100 text-red-700 rounded-xl p-6">
                            <h2 className="text-xl font-semibold">Total Donation Amount</h2>
                            <p className="text-3xl font-bold">${totalAmount}</p>
                        </div>

                        <div className="bg-blue-100 text-blue-700 rounded-xl p-6">
                            <h2 className="text-xl font-semibold">Total Number of Donors</h2>
                            <p className="text-3xl font-bold">{totalDonors}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDonationStats;
