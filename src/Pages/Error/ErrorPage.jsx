import React from "react";
import { Link } from "react-router";
import { FaTint, FaHome, FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 overflow-hidden relative">

            {/* Aesthetic Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-50 rounded-full blur-[120px] opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-red-100 rounded-full blur-[100px] opacity-40"></div>

            <div className="max-w-2xl w-full text-center relative z-10">

                {/* Animated Icon Section */}
                <div className="relative inline-block mb-8">
                    {/* Pulsing Ring Animation */}
                    <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>

                    <div className="relative bg-white p-8 rounded-full shadow-2xl shadow-red-100 border border-red-50 transition-transform hover:scale-105 duration-500">
                        <div className="relative">
                            <span className="text-8xl font-black text-gray-100 select-none">404</span>
                            <FaTint className="text-red-600 text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce drop-shadow-md" />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                        Oops! This link is <span className="text-red-600">empty.</span>
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
                        The page you are looking for might have been moved or never existed. Let’s get you back to saving lives.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl shadow-gray-200 hover:bg-red-600 hover:shadow-red-200 transition-all duration-300 group"
                    >
                        <FaHome className="group-hover:-translate-y-1 transition-transform" />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Previous Page
                    </button>
                </div>

                {/* Footer Brand */}
                <div className="mt-16 flex items-center justify-center gap-2 opacity-30 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                    <FaTint className="text-red-600" />
                    <span className="font-black tracking-tighter text-gray-800">BloodCare</span>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;