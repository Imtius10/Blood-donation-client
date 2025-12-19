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
import useAxios from "../../Hooks/UseAxios";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

const CreateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();
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

    // ---------------- FETCH DISTRICT & UPAZILA ----------------
    useEffect(() => {
        axios.get("/district.json")
            .then(res => setDistricts(res.data.districts))
            .catch(err => console.log(err));

        axios.get("/upozila.json")
            .then(res => setUpazilas(res.data.upazilas))
            .catch(err => console.log(err));
    }, []);

    // ---------------- HANDLE CHANGE ----------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ---------------- HANDLE SUBMIT ----------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const donationRequest = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName: formData.recipientName,
            district: formData.district,
            upazila: formData.upazila,
            hospitalName: formData.hospitalName,
            address: formData.address,
            bloodGroup: formData.bloodGroup,
            donationDate: formData.donationDate,
            donationTime: formData.donationTime,
            message: formData.message,
            donation_status: "pending",
            createdAt: new Date(),
        };

        try {
            await axiosSecure.post("/donation-request", donationRequest);
            toast.success("Donation request created successfully!");

            // Reset form
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
            console.error(err);
            toast.error("Failed to create donation request");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white px-4 py-10">
            <Toaster position="top-right" />

            <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8 border-t-8 border-red-500">
                <h1 className="text-3xl font-bold text-center mb-8 text-red-600">
                    Create Donation Request
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    {/* Requester Name */}
                    <div className="relative">
                        <FaUser className="absolute top-3 left-3 text-red-500" />
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="w-full pl-10 border border-red-300 rounded-xl p-3 bg-red-50"
                        />
                    </div>

                    {/* Requester Email */}
                    <div className="relative">
                        <FaEnvelope className="absolute top-3 left-3 text-red-500" />
                        <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="w-full pl-10 border border-red-300 rounded-xl p-3 bg-red-50"
                        />
                    </div>

                    {/* Recipient Name */}
                    <div className="relative">
                        <FaHospitalUser className="absolute top-3 left-3 text-red-500" />
                        <input
                            type="text"
                            name="recipientName"
                            placeholder="Recipient Name"
                            value={formData.recipientName}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 border border-red-300 rounded-xl p-3"
                        />
                    </div>

                    {/* District & Upazila */}
                    <div className="flex gap-4">
                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            required
                            className="flex-1 border border-red-300 rounded-xl p-3"
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
                            required
                            className="flex-1 border border-red-300 rounded-xl p-3"
                        >
                            <option value="">Select Upazila</option>
                            {upazilas.map(u => (
                                <option key={u.id} value={u.name}>{u.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Hospital Name */}
                    <div className="relative">
                        <FaHospital className="absolute top-3 left-3 text-red-500" />
                        <input
                            type="text"
                            name="hospitalName"
                            placeholder="Hospital Name"
                            value={formData.hospitalName}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 border border-red-300 rounded-xl p-3"
                        />
                    </div>

                    {/* Address */}
                    <div className="relative">
                        <FaMapMarkerAlt className="absolute top-3 left-3 text-red-500" />
                        <input
                            type="text"
                            name="address"
                            placeholder="Full Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 border border-red-300 rounded-xl p-3"
                        />
                    </div>

                    {/* Blood Group */}
                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        required
                        className="w-full border border-red-300 rounded-xl p-3"
                    >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>

                    {/* Date & Time */}
                    <div className="flex gap-4">
                        <input
                            type="date"
                            name="donationDate"
                            value={formData.donationDate}
                            onChange={handleChange}
                            required
                            className="flex-1 border border-red-300 rounded-xl p-3"
                        />
                        <input
                            type="time"
                            name="donationTime"
                            value={formData.donationTime}
                            onChange={handleChange}
                            required
                            className="flex-1 border border-red-300 rounded-xl p-3"
                        />
                    </div>

                    {/* Message */}
                    <textarea
                        name="message"
                        placeholder="Why you need blood..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full border border-red-300 rounded-xl p-3"
                    />

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-3 rounded-2xl font-semibold hover:bg-red-600 transition shadow-lg"
                    >
                        Request Blood
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateDonationRequest;
