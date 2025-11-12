"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const EditIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
);
const TrashIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
);
const PlusIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg>
);



// --- Main Notes Page Component ---
export default function Page() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(); // Default as requested
    const router = useRouter();


    useEffect(() => {
        // On mount, try to get the user from localStorage, fallback to the default
        const storedUser = localStorage.getItem('username');
        if (!storedUser) {
            router.push('/login');
        }
        setUsername(storedUser);
    }, []);

    useEffect(() => {
        // Fetch notes when the username is set
        if (!username) return;

        const fetchNotes = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(`/api/note/?username=${username}`);
                console.log(res);
                setNotes(res.data || []);

            } catch (err) {
                console.error("Failed to fetch notes:", err);
                setError("Failed to load your notes. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [username]);

    const deleteNote = async (id) => {
        try {
            await axios.delete(`/api/note/?_id=${id}`);
            setNotes(notes.filter(note => note.id !== id && note._id !== id));
        } catch (err) {
            console.error('Failed to delete note:', err);
            setError('Failed to delete note.');
        }
    }

    return (
        <div className="min-h-[93.2vh] bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-200 font-sans">
            {/* This main container assumes your Navbar is in a parent layout */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* --- Page Header --- */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-100 tracking-tight">
                        My Notes
                        <span className="text-lg ml-2 text-gray-400 font-medium">({username})</span>
                    </h1>
                    <Link href={"/notes/create-note"}>
                        <button className="cursor-pointer flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-500 text-gray-900 hover:bg-emerald-400 transition transform hover:scale-105 shadow-lg">
                            <PlusIcon />
                            <span>New Note</span>
                        </button>
                    </Link>
                </div>

                {/* --- Loading State --- */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin h-10 w-10 border-4 border-t-4 border-emerald-500 border-transparent rounded-full"></div>
                        <span className="ml-4 text-lg text-gray-400">Loading Your Notes...</span>
                    </div>
                )}

                {/* --- Error State --- */}
                {error && (
                    <div className="bg-red-900/50 text-red-300 p-4 rounded-lg border border-red-700 text-center">
                        {error}
                    </div>
                )}

                {/* --- No Notes State --- */}
                {!loading && !error && notes.length === 0 && (
                    <div className="text-center py-20 bg-gray-800/50 rounded-lg border border-dashed border-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-300">No Notes Found</h2>
                        <p className="text-gray-500 mt-2">Click "New Note" to get started!</p>
                    </div>
                )}

                {/* --- Notes Grid --- */}
                {!loading && !error && notes.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div
                                key={note._id || note.id}
                                className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 flex flex-col justify-between transition duration-300 hover:border-emerald-500 hover:shadow-emerald-900/40"
                            >
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-50 mb-2 truncate">{note.title}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                        {note.desc}
                                    </p>
                                </div>

                                {/* Card Footer */}
                                <div className="bg-gray-800/50 rounded-b-xl px-6 py-4 border-t border-gray-700/50 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">{note.date}</span>
                                    <div className="flex space-x-3">
                                        <button onClick={() => deleteNote(note._id || note.id)} className="cursor-pointer text-gray-400 hover:text-red-500 transition" aria-label="Delete note">
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
}