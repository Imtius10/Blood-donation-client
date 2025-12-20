import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/UseAxiosSecure";

const EditDonationRequest = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get(`/donation-request/${id}`)
            .then(res => {
                setFormData(res.data);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axiosSecure.patch(`/donation-request/${id}`, {
            recipientName: formData.recipientName,
            district: formData.district,
            upazila: formData.upazila,
            donationDate: formData.donationDate,
            donationTime: formData.donationTime,
            bloodGroup: formData.bloodGroup
        });

        Swal.fire("Updated!", "Donation request updated successfully", "success");
        navigate("/dashboard");
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-6">Edit Donation Request</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    value={formData.recipientName}
                    onChange={e => setFormData({ ...formData, recipientName: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="Recipient Name"
                />

                <input
                    value={formData.donationDate}
                    type="date"
                    onChange={e => setFormData({ ...formData, donationDate: e.target.value })}
                    className="input input-bordered w-full"
                />

                <input
                    value={formData.donationTime}
                    type="time"
                    onChange={e => setFormData({ ...formData, donationTime: e.target.value })}
                    className="input input-bordered w-full"
                />

                <button className="btn btn-error w-full">
                    Update Donation Request
                </button>
            </form>
        </div>
    );
};

export default EditDonationRequest;
