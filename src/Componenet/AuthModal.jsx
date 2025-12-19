import React from "react";
import { HiX } from "react-icons/hi";

const AuthModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative mt-20 md:mt-0 p-6 max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-600 z-50"
                >
                    <HiX />
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold text-center text-red-600 mb-4">{title}</h2>

                {/* Content */}
                <div className="space-y-4">{children}</div>
            </div>
        </div>
    );
};

export default AuthModal;
