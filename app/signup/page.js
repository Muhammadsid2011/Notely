"use client"
import Link from 'next/link';
import React, { useState } from 'react'; // Removed unused useEffect
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct import for navigation

// --- Main Application Component (Standalone Signup Page) ---
export default function Page() {
    const router = useRouter(); // Initialize the router
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // For API/general errors
    const [inputError, setInputError] = useState(''); // For form validation errors
    const [username, setUsername] = useState(''); // Fixed casing
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Dummy handler for signup
    const handleSubmit = async (e) => {
        e.preventDefault();
        setInputError('');
        setError(null);

        if (password !== confirmPassword) {
            setInputError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setInputError("Password must be at least 6 characters long.");
            return;
        }

        try {
            setLoading(true);
            // Simulated API call - replace with real endpoint
            await axios.post('/api/user', { username, password });
            router.push('/'); 
            try { window.dispatchEvent(new Event('authChange')); } catch (e) {}
        }catch (err) {
            setError(err.response?.data?.message || 'An error occurred during signup.');
        }finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-[93.2vh] bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 font-sans flex justify-center items-start p-4">
            {/* AuthFormContainer logic merged directly here */}
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-emerald-500/30 mt-10">
                <h2 className="text-3xl font-extrabold text-center text-gray-100 mb-6 border-b pb-2 border-gray-700">
                    Create Your Notely Account
                </h2>
                {(error || inputError) && (
                    <p className="bg-red-900/50 text-red-300 p-3 rounded-lg text-sm mb-4 border border-red-700">
                        {error || inputError}
                    </p>
                )}

                {/* SignupComponent logic merged directly here */}
                <form className="space-y-6" onSubmit={(e) =>handleSubmit(e)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="signup-username">
                            Username
                        </label>
                        <input
                            id="signup-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Fixed casing
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Choose a professional username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="signup-password">
                            Password
                        </label>
                        <input
                            id="signup-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Min 6 characters"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="signup-confirm-password">
                            Confirm Password
                        </label>
                        <input
                            id="signup-confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Re-enter password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-gray-900 font-bold rounded-lg transition transform hover:scale-[1.01] shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                        {loading && <span className="animate-spin h-5 w-5 border-2 border-t-2 border-t-white border-transparent rounded-full"></span>}
                        <span>{loading ? 'Creating Account...' : 'Sign Up'}</span>
                    </button>
                    <p className="text-center text-sm text-gray-400 mt-4">
                        Already have an account?{' '}
                        <span
                            className="text-emerald-400 hover:text-emerald-300 cursor-pointer font-semibold transition"
                        >
                            <Link href="/login">
                            Log In
                            </Link>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}