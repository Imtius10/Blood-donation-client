import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
    const { loginUser, signInWithGoogle, setUser } =
        useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        loginUser(email, password)
            .then((res) => {
                setUser(res.user);
                toast.success("Login successful 🩸");
                navigate("/");
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((res) => {
                setUser(res.user);
                toast.success("Login successful 🩸");
                navigate("/");
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                {/* Header */}
                <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
                    Welcome Back
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Login to continue saving lives
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            required
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Login
                    </button>
                </form>

                {/* Google */}
                <div className="flex items-center justify-center mt-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg hover:bg-gray-100 w-full justify-center"
                    >
                        <FcGoogle size={22} /> Continue with Google
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <NavLink
                        to="/register"
                        className="text-red-600 font-semibold hover:underline"
                    >
                        Become a Donor
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
