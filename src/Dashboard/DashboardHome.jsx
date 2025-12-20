import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosSecure from '../Hooks/UseAxiosSecure';
import { FaTint, FaEdit, FaTrash, FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
        canceled: 0
    });

    useEffect(() => {
        fetchRecentRequests();
    }, []);

    const fetchRecentRequests = async () => {
        setLoading(true);
        try {
            const response = await axiosSecure.get('/my-requests?size=3&page=0');
            const requests = response.data.requests || response.data.request || [];
            setRecentRequests(requests);

            // Compute stats
            const computedStats = { total: requests.length, pending: 0, inprogress: 0, done: 0, canceled: 0 };
            requests.forEach(r => {
                if (r.donation_status) computedStats[r.donation_status] = (computedStats[r.donation_status] || 0) + 1;
            });
            setStats(computedStats);

        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/donation-request/${id}`, { donation_status: newStatus });
            Swal.fire({ icon: 'success', title: 'Status Updated!', text: `Donation status changed to ${newStatus}`, timer: 2000, showConfirmButton: false });
            fetchRecentRequests();
        } catch (error) {
            console.error(error);
            Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update status' });
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/donation-request/${id}`);
                Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Your donation request has been deleted.', timer: 2000, showConfirmButton: false });
                fetchRecentRequests();
            } catch (error) {
                console.error(error);
                Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete request' });
            }
        }
    };

    const getStatusBadge = (status) => {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
            inprogress: 'bg-blue-100 text-blue-700 border border-blue-300',
            done: 'bg-green-100 text-green-700 border border-green-300',
            canceled: 'bg-red-100 text-red-700 border border-red-300'
        };
        return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-red-600 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <FaTint className="text-3xl text-white animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome back, {user?.displayName || user?.name || 'Donor'}! 👋
                        </h1>
                        <p className="text-gray-600 mt-1">Thank you for being a lifesaver. Here are your recent donation requests.</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {loading ? Array(5).fill().map((_, i) => <Skeleton key={i} height={80} />)
                        : Object.keys(stats).map((key) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                            >
                                <span className="text-red-500 font-bold text-xl">{stats[key]}</span>
                                <span className="text-gray-500 capitalize text-sm">{key}</span>
                            </motion.div>
                        ))}
                </div>

                {/* Recent Requests Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4">
                        <h2 className="text-xl font-bold text-white">Recent Donation Requests</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    {['Recipient', 'Location', 'Date', 'Time', 'Blood Group', 'Status', 'Donor', 'Actions'].map((h) => (
                                        <th key={h} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? Array(3).fill().map((_, i) => (
                                    <tr key={i}><td colSpan={8}><Skeleton height={50} /></td></tr>
                                )) : recentRequests.map((r) => (
                                    <tr key={r._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">{r.recipientName}</td>
                                        <td className="px-6 py-4">{r.district}, {r.upazila}</td>
                                        <td className="px-6 py-4">{r.donationDate}</td>
                                        <td className="px-6 py-4">{r.donationTime}</td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full font-bold text-sm shadow-sm">{r.bloodGroup}</span></td>
                                        <td className="px-6 py-4">{getStatusBadge(r.donation_status)}</td>
                                        <td className="px-6 py-4">{r.donorName || 'N/A'}</td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button onClick={() => handleStatusUpdate(r._id, 'done')} className="text-green-600 hover:bg-green-50 p-2 rounded transition"><FaCheckCircle /></button>
                                            <button onClick={() => handleStatusUpdate(r._id, 'canceled')} className="text-red-600 hover:bg-red-50 p-2 rounded transition"><FaTimesCircle /></button>
                                            <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:bg-red-50 p-2 rounded transition"><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
