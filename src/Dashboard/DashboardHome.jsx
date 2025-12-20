import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosSecure from '../Hooks/UseAxiosSecure';
import { Link, useNavigate } from 'react-router';
import { FaTint, FaEdit, FaTrash, FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [recentRequests, setRecentRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecentRequests();
    }, []);

    const fetchRecentRequests = async () => {
        try {
            const response = await axiosSecure.get('/my-requests?size=3&page=0');
            setRecentRequests(response.data.requests || response.data.request || []);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/donation-request/${id}`, {
                donation_status: newStatus
            });

            Swal.fire({
                icon: 'success',
                title: 'Status Updated!',
                text: `Donation status changed to ${newStatus}`,
                timer: 2000,
                showConfirmButton: false
            });

            fetchRecentRequests();
        } catch (error) {
            console.error('Error updating status:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update status'
            });
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

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Your donation request has been deleted.',
                    timer: 2000,
                    showConfirmButton: false
                });

                fetchRecentRequests();
            } catch (error) {
                console.error('Error deleting request:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete request'
                });
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

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-red-600">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                            <FaTint className="text-3xl text-white animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Welcome back, {user?.displayName || user?.name || 'Donor'}! 👋
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Thank you for being a lifesaver. Here are your recent donation requests.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Donation Requests */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading your requests...</p>
                    </div>
                ) : recentRequests.length > 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4">
                            <h2 className="text-xl font-bold text-white">Recent Donation Requests</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b-2 border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Recipient Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Recipient Location
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Donation Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Donation Time
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Blood Group
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Donation Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Donor Information
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {recentRequests.map((request) => (
                                        <tr key={request._id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{request.recipientName}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600">
                                                    <div className="font-medium">{request.district}</div>
                                                    <div className="text-xs text-gray-500">{request.upazila}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{request.donationDate}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{request.donationTime}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full font-bold text-sm shadow-sm">
                                                    {request.bloodGroup}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    {getStatusBadge(request.donation_status)}

                                                    {request.donation_status === 'inprogress' && (
                                                        <div className="flex gap-2 mt-2">
                                                            <button
                                                                onClick={() => handleStatusUpdate(request._id, 'done')}
                                                                className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-lg hover:bg-green-600 transition shadow-sm"
                                                                title="Mark as Done"
                                                            >
                                                                <FaCheckCircle /> Done
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(request._id, 'canceled')}
                                                                className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition shadow-sm"
                                                                title="Cancel Request"
                                                            >
                                                                <FaTimesCircle /> Cancel
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {request.donation_status === 'inprogress' && (request.donorName || request.donorEmail) ? (
                                                    <div className="text-sm">
                                                        <div className="font-medium text-gray-900">{request.donorName || 'N/A'}</div>
                                                        <div className="text-gray-500 text-xs">{request.donorEmail || 'N/A'}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-sm italic">N/A</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => navigate(`/dashboard/edit-request/${request._id}`)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="Edit Request"
                                                    >
                                                        <FaEdit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(request._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete Request"
                                                    >
                                                        <FaTrash size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/dashboard/request-details/${request._id}`)}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                                        title="View Details"
                                                    >
                                                        <FaEye size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* View All Button */}
                        <div className="bg-gray-50 px-6 py-4 border-t flex justify-center">
                            <Link
                                to="/dashboard/my-requests"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-600 transition shadow-lg hover:shadow-xl"
                            >
                                View My All Requests
                            </Link>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default DashboardHome;