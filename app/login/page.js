"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function App() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // ✅ Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post('/api/auth/login', { username, password });
            window.dispatchEvent(new Event("authChange"));
            router.push('/');
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                setError("Invalid username or password");
            } else {
                setError(err.response?.data?.error || "Server error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[93.2vh] bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 font-sans flex justify-center items-start p-4">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-emerald-500/30 mt-10">
                <h2 className="text-3xl font-extrabold text-center text-gray-100 mb-6 border-b pb-2 border-gray-700">
                    Log In to Notely
                </h2>

                {error && (
                    <p className="bg-red-900/50 text-red-300 p-3 rounded-lg text-sm mb-4 border border-red-700">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="login-username">
                            Username
                        </label>
                        <input
                            id="login-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="login-password">
                            Password
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="your Password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-gray-900 font-bold rounded-lg transition transform hover:scale-[1.01] shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                        {loading && (
                            <span className="animate-spin h-5 w-5 border-2 border-t-2 border-t-white border-transparent rounded-full"></span>
                        )}
                        <span>{loading ? "Logging In..." : "Log In"}</span>
                    </button>

                    <p className="text-center text-sm text-gray-400 mt-4">
                        Don’t have an account?{" "}
                        <span className="text-emerald-400 hover:text-emerald-300 cursor-pointer font-semibold transition">
                            <Link href="/signup">Sign Up</Link>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}
