import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import {
  FaHospitalUser,
  FaEnvelope,
  FaUser,
  FaMapMarkerAlt,
  FaHospital,
} from "react-icons/fa";
import useAxios from "../../Hooks/UseAxios";

const UpdateDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const axiosInstance=useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location; // Contains recipientName if passed from dashboard
  const { id } = useParams(); // Request ID from the URL

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [formData, setFormData] = useState({
    recipientName: state?.recipientName || "",
    district: "",
    upazila: "",
    hospitalName: "",
    address: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch districts and upazilas
  useEffect(() => {
    axiosInstance.get("/district.json").then((res) => setDistricts(res.data.districts));
    axiosInstance.get("/upozila.json").then((res) => setUpazilas(res.data.upazilas));
  }, [axiosInstance]);

  // Fetch existing donation request data by ID
  useEffect(() => {
    if (!id) return;

    axiosSecure
      .get(`/donation-request/${id}`)
      .then((res) => {
        if (res.data) setFormData(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Donation request not found");
        navigate("/dashboard");
      });
  }, [id, axiosSecure, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/donation-request/${id}`, formData);
      toast.success("Donation request updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update donation request");
    }
  };

  if (loading) return <div className="flex justify-center p-20">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4 py-10">
      <Toaster position="top-right" />
      <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-8 border-t-8 border-red-500">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-600">
          Update Donation Request
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Recipient Name */}
          <div className="relative">
            <FaHospitalUser className="absolute top-3 left-3 text-red-500" />
            <input
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="Recipient Name"
              className="w-full pl-10 border rounded-xl p-3"
              required
            />
          </div>

          {/* District & Upazila */}
          <div className="flex gap-4">
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="flex-1 border rounded-xl p-3"
              required
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              className="flex-1 border rounded-xl p-3"
              required
            >
              <option value="">Select Upazila</option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
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
              required
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
              required
            />
          </div>

          {/* Blood Group */}
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
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
              required
            />
            <input
              type="time"
              name="donationTime"
              value={formData.donationTime}
              onChange={handleChange}
              className="flex-1 border rounded-xl p-3"
              required
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
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-2xl font-semibold hover:bg-red-600"
          >
            Update Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonationRequest;
