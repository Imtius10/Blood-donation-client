import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const MyDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const [myRequests, setMyRequests] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState("all");

    // Location States
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    
    // NOTE: Replace this with your actual Auth logic (e.g., const { userRole } = useAuth();)
    const userRole = "user"; 

    useEffect(() => {
        axios.get("/district.json").then((res) => setDistricts(res.data.districts));
        axios.get("/upozila.json").then((res) => setUpazilas(res.data.upazilas));
    }, []);

    const fetchRequests = () => {
        axiosSecure
            .get(`/my-requests?page=${currentPage - 1}&size=${itemsPerPage}&status=${status}`)
            .then((res) => {
                setMyRequests(res.data.requests || []);
                setTotalRequest(res.data.totalRequest || 0);
            });
    };

    useEffect(() => {
        fetchRequests();
    }, [axiosSecure, currentPage, itemsPerPage, status]);

    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        const filtered = upazilas.filter(u => u.district_id === selectedDistrictId);
        setFilteredUpazilas(filtered);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        // Find names based on selected IDs in the form
        const districtName = districts.find(d => d.id === form.district.value)?.name || selectedRequest.district;
        const upazilaName = upazilas.find(u => u.id === form.upazila.value)?.name || selectedRequest.upazila;

        const updatedDoc = {
            recipientName: form.recipientName.value,
            bloodGroup: form.bloodGroup.value,
            district: districtName,
            upazila: upazilaName,
            hospitalName: form.hospitalName.value,
            address: form.address.value, // Added Address
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            message: form.message.value,
        };

        // Only send status if the user is an admin
        if (userRole === 'admin') {
            updatedDoc.donation_status = form.donation_status.value;
        }

        try {
            const res = await axiosSecure.patch(`/blood/request-update/${selectedRequest._id}?role=${userRole}`, updatedDoc);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Request updated successfully!", "success");
                setIsModalOpen(false);
                fetchRequests();
            }
        } catch (error) {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>
            
            {/* ... Your Filter Logic ... */}

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>#</th><th>Recipient</th><th>Group</th><th>Location</th><th>Status</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myRequests.map((req, index) => (
                            <tr key={req._id}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{req.recipientName}</td>
                                <td>{req.bloodGroup}</td>
                                <td>{req.upazila}, {req.district}</td>
                                <td>{req.donation_status}</td>
                                <td>
                                    <button onClick={() => {
                                        setSelectedRequest(req);
                                        const dist = districts.find(d => d.name === req.district);
                                        if(dist) setFilteredUpazilas(upazilas.filter(u => u.district_id === dist.id));
                                        setIsModalOpen(true);
                                    }} className="btn btn-sm btn-outline btn-primary">Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- UPDATE MODAL --- */}
            {isModalOpen && selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold mb-6 text-red-600">Edit Donation Request</h3>
                        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            <div className="form-control">
                                <label className="label font-semibold">Recipient Name</label>
                                <input name="recipientName" defaultValue={selectedRequest.recipientName} required className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold">Blood Group</label>
                                <select name="bloodGroup" defaultValue={selectedRequest.bloodGroup} className="select select-bordered">
                                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold">District</label>
                                <select 
                                    name="district" 
                                    defaultValue={districts.find(d => d.name === selectedRequest.district)?.id}
                                    onChange={handleDistrictChange} 
                                    className="select select-bordered"
                                >
                                    <option value="">Select District</option>
                                    {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold">Upazila</label>
                                <select name="upazila" className="select select-bordered">
                                    <option value="">Select Upazila</option>
                                    {filteredUpazilas.map(u => (
                                        <option key={u.id} value={u.id} selected={u.name === selectedRequest.upazila}>{u.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label font-semibold">Hospital Name</label>
                                <input name="hospitalName" defaultValue={selectedRequest.hospitalName} className="input input-bordered w-full" />
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label font-semibold">Full Address</label>
                                <input name="address" defaultValue={selectedRequest.address} required className="input input-bordered w-full" />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold">Date</label>
                                <input name="donationDate" type="date" defaultValue={selectedRequest.donationDate} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold">Time</label>
                                <input name="donationTime" type="time" defaultValue={selectedRequest.donationTime} className="input input-bordered" />
                            </div>

                            {/* STATUS HIDDEN FOR USERS - ONLY SHOWN TO ADMIN */}
                            {userRole === "admin" && (
                                <div className="form-control md:col-span-2">
                                    <label className="label font-semibold text-blue-600">Donation Status (Admin Only)</label>
                                    <select name="donation_status" defaultValue={selectedRequest.donation_status} className="select select-bordered border-blue-400">
                                        <option value="pending">Pending</option>
                                        <option value="inprogress">In Progress</option>
                                        <option value="done">Done</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                </div>
                            )}

                            <div className="form-control md:col-span-2">
                                <label className="label font-semibold">Message</label>
                                <textarea name="message" defaultValue={selectedRequest.message} className="textarea textarea-bordered h-20"></textarea>
                            </div>

                            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-ghost">Cancel</button>
                                <button type="submit" className="btn bg-red-600 text-white hover:bg-red-700">Update Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyDonationRequests;