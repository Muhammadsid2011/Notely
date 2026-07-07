"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // Using next/navigation for app router - REMOVED
// import axios from 'axios'; // You would uncomment this in your real app

// --- Icons for this Page ---
const SaveIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
);
const ArrowLeftIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
);
const CheckCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

// --- Main Create Note Page Component ---
export default function Page() {
  // const router = useRouter(); // REMOVED - This caused the build error
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await axios.get('/api/user');
        if (res.data?.user?.username) {
          setUsername(res.data.user.username);
        } else {
          router.push('/login');
        }
      } catch {
        router.push('/login');
      }
    };

    loadSession();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim()) {
      setError("Please provide a title for your note.");
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/note', {
        title,
        desc: content,
      });
    } catch (err) {
      console.error("Failed to save note:", err);
      setError("Failed to save your note. Please try again later.");
    } finally {
      setLoading(false);
      router.push('/notes');
    }
  };

  const handleCancel = () => {
    router.push('/notes');
  };

  return (
    <div className="min-h-[93.2vh] bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-200 font-sans">
      {/* This main container assumes your Navbar is in a parent layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- Page Header --- */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-100 tracking-tight">
            Create New Note
          </h1>
          <button 
            onClick={handleCancel}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg text-emerald-400 border border-emerald-500/50 hover:bg-gray-700 hover:border-emerald-500 transition"
          >
            <ArrowLeftIcon />
            <span>Back to Notes</span>
          </button>
        </div>

        {/* --- Form Container --- */}
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* --- Title Input --- */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="note-title">
                Note Title
              </label>
              <input
                id="note-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="My Awesome Note Title"
              />
            </div>
            
            {/* --- Content Textarea --- */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="note-content">
                Content
              </label>
              <textarea
                id="note-content"
                rows="12"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Start writing your thoughts, ideas, or to-do list here..."
              />
            </div>

            {/* --- Feedback Messages --- */}
            {error && (
              <div className="bg-red-900/50 text-red-300 p-3 rounded-lg text-sm border border-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-900/50 text-green-300 p-3 rounded-lg text-sm border border-green-700 flex items-center space-x-2">
                <CheckCircleIcon />
                <span>{success}</span>
              </div>
            )}

            {/* --- Action Buttons --- */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700/50">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-2 text-sm font-semibold rounded-lg text-gray-300 hover:bg-gray-700 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || success} // Disable if loading or on success
                className="w-36 flex items-center justify-center space-x-2 px-6 py-2 text-sm font-bold rounded-lg bg-emerald-500 text-gray-900 hover:bg-emerald-400 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && <span className="animate-spin h-4 w-4 border-2 border-t-2 border-t-gray-900 border-transparent rounded-full"></span>}
                <span>{loading ? 'Saving...' : 'Save Note'}</span>
                {!loading && <SaveIcon />}
              </button>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  );
}