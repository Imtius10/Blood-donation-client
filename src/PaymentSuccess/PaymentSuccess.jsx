import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxios from "../Hooks/UseAxios";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionId) {
            axiosInstance
                .post(`/success-payment?session_id=${sessionId}`)
                .catch((err) => console.error("Payment success logging error:", err));
        }
    }, [axiosInstance, sessionId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center animate-fadeIn">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6 animate-pulse" />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your donation. Your transaction has been completed successfully.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
