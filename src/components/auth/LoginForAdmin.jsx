import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

const LoginAdmin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://localhost:3000/admin-login", {
                email: username,
                password,
            });

            if (response.status === 200) {
                const { token } = response.data; // Giả sử token nằm trong response.data.token
                localStorage.setItem("authToken", token); // Lưu token vào localStorage

                setSuccess("Login successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/admin/dashboard"; // Điều hướng đến trang Dashboard
                }, 2000);
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "Something went wrong. Please try again.";
            setError(errorMessage);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                {/* Avatar Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                        <Icon icon="akar-icons:person" width="35" height="35" color="white" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-bold text-gray-700 mb-4">
                    Admin Login
                </h2>

                {/* Success Message */}
                {success && (
                    <div className="alert alert-success text-center" role="alert">
                        {success}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-gray-600 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-4 mt-4 rounded-full font-semibold hover:bg-purple-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginAdmin;
