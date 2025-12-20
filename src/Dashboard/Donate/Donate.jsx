import React, { useContext } from 'react';
import useAxios from '../../Hooks/UseAxios';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Donate = () => {
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);

    const handleCheckout = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donateAmount.value;

        const formData = {
            donateAmount,
            donorEmail: user?.email,
            donarName: user?.displayName
        };

        axiosInstance.post('/create-payment-checkout', formData)
            .then(res => {
                window.location.href = res.data.url;
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">

                <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
                    🩸 Blood Care Donation
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Your contribution helps save lives
                </p>

                <form onSubmit={handleCheckout} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Donor Name
                        </label>
                        <input
                            type="text"
                            value={user?.displayName || ''}
                            disabled
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Donation Amount (USD)
                        </label>
                        <input
                            name="donateAmount"
                            type="number"
                            min="1"
                            required
                            placeholder="Enter amount"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-full bg-red-600 hover:bg-red-700 text-white text-lg"
                    >
                        ❤️ Donate Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Donate;
