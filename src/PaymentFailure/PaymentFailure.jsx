import React from "react";
import { useNavigate } from "react-router";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailure = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4">
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center animate-fadeIn">
                <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-6 animate-shake" />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Failed!</h1>
                <p className="text-gray-600 mb-6">
                    Oops! Your transaction could not be completed. Please try again or contact support.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => navigate("/donate")}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold transition-all"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailure;
