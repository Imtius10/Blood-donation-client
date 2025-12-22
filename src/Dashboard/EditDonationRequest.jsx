import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router"; 
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";

const EditDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        recipientName: '',
        donationDate: '',
        donationTime: '',
        district: '',
        upazila: '',
        hospitalName: '',
        address: '',
        bloodGroup: '',
        message: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Wait until user email is available from AuthContext
        if (!user?.email) return;

        axiosSecure.get(`/donation-request/user/${user.email}`)
            .then(res => {
                if (!res.data) {
                    Swal.fire("Not Found", "No donation request found", "error");
                    navigate("/dashboard");
                } else {
                    setFormData(res.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
                // Only error out if the request actually fails
                if(err.response?.status !== 404) {
                    Swal.fire("Error", "Failed to fetch donation request", "error");
                }
            });
    }, [user?.email, axiosSecure, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Show loading state on button if possible
        try {
            const res = await axiosSecure.patch(`/donation-request/user/${user.email}`, formData);
            
            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                Swal.fire("Updated!", "Donation request updated successfully", "success");
                navigate("/dashboard");
            } else {
                Swal.fire("No Changes", "No fields were modified", "info");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Update failed. Check console for details.", "error");
        }
    };

    if (loading) return <div className="flex justify-center p-20">Loading...</div>;

    return (
        <div className="bg-white p-8 rounded-xl shadow max-w-xl mx-auto my-10">
            <h2 className="text-xl font-bold mb-6 text-center">Edit Donation Request</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label font-semibold">Recipient Name</label>
                    <input
                        value={formData.recipientName || ""}
                        onChange={e => setFormData({ ...formData, recipientName: e.target.value })}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label font-semibold">Date</label>
                        <input
                            value={formData.donationDate || ""}
                            type="date"
                            onChange={e => setFormData({ ...formData, donationDate: e.target.value })}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="label font-semibold">Time</label>
                        <input
                            value={formData.donationTime || ""}
                            type="time"
                            onChange={e => setFormData({ ...formData, donationTime: e.target.value })}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        value={formData.district || ""}
                        onChange={e => setFormData({ ...formData, district: e.target.value })}
                        className="input input-bordered w-full"
                        placeholder="District"
                        required
                    />
                    <input
                        value={formData.upazila || ""}
                        onChange={e => setFormData({ ...formData, upazila: e.target.value })}
                        className="input input-bordered w-full"
                        placeholder="Upazila"
                        required
                    />
                </div>

                <input
                    value={formData.hospitalName || ""}
                    onChange={e => setFormData({ ...formData, hospitalName: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="Hospital Name"
                    required
                />

                <input
                    value={formData.address || ""}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="Full Address"
                    required
                />

                <select 
                    value={formData.bloodGroup || ""}
                    onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="" disabled>Select Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>

                <textarea
                    value={formData.message || ""}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="textarea textarea-bordered w-full"
                    placeholder="Explain why you need blood..."
                    rows="3"
                    required
                />

                <button type="submit" className="btn btn-error w-full text-white">
                    Update Request
                </button>
            </form>
        </div>
    );
};

export default EditDonationRequest;