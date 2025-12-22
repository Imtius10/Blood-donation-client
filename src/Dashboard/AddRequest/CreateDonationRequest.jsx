import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import {
    FaHospitalUser,
    FaEnvelope,
    FaUser,
    FaMapMarkerAlt,
    FaHospital,
} from "react-icons/fa";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

const CreateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const [formData, setFormData] = useState({
        recipientName: "",
        district: "",
        upazila: "",
        hospitalName: "",
        address: "",
        bloodGroup: "",
        donationDate: "",
        donationTime: "",
        message: "",
    });

    /* ---------------- FETCH DATA ---------------- */
    useEffect(() => {
        axios.get("/district.json").then(res => setDistricts(res.data.districts));
        axios.get("/upozila.json").then(res => setUpazilas(res.data.upazilas));
    }, []);

    /* ---------------- HANDLE CHANGE ---------------- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /* ---------------- VALIDATION ---------------- */
    const validateForm = () => {
        for (const key in formData) {
            if (!formData[key].trim()) {
                toast.error("All fields are required");
                return false;
            }
        }
        if (!user?.email || !user?.displayName) {
            toast.error("User not authenticated");
            return false;
        }
        return true;
    };

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const donationRequest = {
            requesterName: user.displayName,
            requesterEmail: user.email,
            ...formData,
            donation_status: "pending",
            createdAt: new Date(),
        };

        try {
            await axiosSecure.post("/donation-request", donationRequest);
            toast.success("Donation request created successfully!");

            setFormData({
                recipientName: "",
                district: "",
                upazila: "",
                hospitalName: "",
                address: "",
                bloodGroup: "",
                donationDate: "",
                donationTime: "",
                message: "",
            });
        } catch (err) {
            toast.error("Failed to create donation request");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4 py-10">
            <Toaster position="top-right" />

            <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-8 border-t-8 border-red-500">
                <h1 className="text-3xl font-bold text-center mb-8 text-red-600">
                    Create Donation Request
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-black">

                    {/* Name */}
                    <div className="relative">
                        <FaUser className="absolute top-3 left-3 text-red-500" />
                        <input
                            value={user?.displayName || ""}
                            readOnly
                            className="w-full pl-10 border rounded-xl p-3 bg-gray-100"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <FaEnvelope className="absolute top-3 left-3 text-red-500" />
                        <input
                            value={user?.email || ""}
                            readOnly
                            className="w-full pl-10 border rounded-xl p-3 bg-gray-100"
                        />
                    </div>

                    {/* Recipient */}
                    <div className="relative">
                        <FaHospitalUser className="absolute top-3 left-3 text-red-500" />
                        <input
                            name="recipientName"
                            value={formData.recipientName}
                            onChange={handleChange}
                            placeholder="Recipient Name"
                            className="w-full pl-10 border rounded-xl p-3"
                        />
                    </div>

                    {/* District & Upazila */}
                    <div className="flex gap-4">
                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className="flex-1 border rounded-xl p-3"
                        >
                            <option value="">Select District</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.name}>{d.name}</option>
                            ))}
                        </select>

                        <select
                            name="upazila"
                            value={formData.upazila}
                            onChange={handleChange}
                            className="flex-1 border rounded-xl p-3"
                        >
                            <option value="">Select Upazila</option>
                            {upazilas.map(u => (
                                <option key={u.id} value={u.name}>{u.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Hospital */}
                    <div className="relative">
                        <FaHospital className="absolute top-3 left-3 text-red-500" />
                        <input
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleChange}
                            placeholder="Hospital Name"
                            className="w-full pl-10 border rounded-xl p-3"
                        />
                    </div>

                    {/* Address */}
                    <div className="relative">
                        <FaMapMarkerAlt className="absolute top-3 left-3 text-red-500" />
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Full Address"
                            className="w-full pl-10 border rounded-xl p-3"
                        />
                    </div>

                    {/* Blood */}
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    >
                        <option value="">Select Blood Group</option>
                        {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>

                    {/* Date & Time */}
                    <div className="flex gap-4">
                        <input
                            type="date"
                            name="donationDate"
                            value={formData.donationDate}
                            onChange={handleChange}
                            className="flex-1 border rounded-xl p-3"
                        />
                        <input
                            type="time"
                            name="donationTime"
                            value={formData.donationTime}
                            onChange={handleChange}
                            className="flex-1 border rounded-xl p-3"
                        />
                    </div>

                    {/* Message */}
                    <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Why you need blood..."
                        className="w-full border rounded-xl p-3"
                    />

                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-3 rounded-2xl font-semibold hover:bg-red-600"
                    >
                        Request Blood
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateDonationRequest;
