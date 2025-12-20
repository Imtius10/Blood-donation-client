import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { FaEdit, FaSave, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const DashboardProfile = () => {
    const { user, setUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [profile, setProfile] = useState({});
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axiosSecure.get(`/users/profile?email=${user?.email}`);
            setProfile(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = async () => {
        try {
            const { _id, email, ...updateData } = profile;

            await axiosSecure.patch(`/users/update/${_id}`, updateData);

            Swal.fire({
                icon: "success",
                title: "Profile Updated",
                timer: 2000,
                showConfirmButton: false
            });

            setEditable(false);
            setUser({ ...user, ...updateData });
        } catch (error) {
            Swal.fire("Error", "Failed to update profile", "error");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>

                {!editable ? (
                    <button
                        onClick={() => setEditable(true)}
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <FaEdit /> Edit
                    </button>
                ) : (
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <FaSave /> Save
                    </button>
                )}
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-6">
                {profile.mainPhotoUrl ? (
                    <img
                        src={profile.mainPhotoUrl}
                        alt="avatar"
                        className="w-28 h-28 rounded-full object-cover border-4 border-red-500"
                    />
                ) : (
                    <FaUserCircle className="text-8xl text-gray-400" />
                )}
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Name" name="name" value={profile.name} onChange={handleChange} disabled={!editable} />
                <Input label="Email" name="email" value={profile.email} disabled />
                <Input label="Blood Group" name="bloodGroup" value={profile.bloodGroup} onChange={handleChange} disabled={!editable} />
                <Input label="District" name="district" value={profile.district} onChange={handleChange} disabled={!editable} />
                <Input label="Upazila" name="upazila" value={profile.upazila} onChange={handleChange} disabled={!editable} />
                <Input label="Role" name="role" value={profile.role} disabled />
            </div>
        </div>
    );
};

const Input = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
        <input
            {...props}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none
            ${props.disabled ? "bg-gray-100 text-gray-500" : "focus:ring-2 focus:ring-red-500"}`}
        />
    </div>
);

export default DashboardProfile;
