"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
// import Link from 'next/link'; // Removed due to build environment limitations

// === Icon Components (Self-Contained SVGs) ===

const MenuIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);
const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);
const NotesIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
);
const HomeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const InfoIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
);
const MailIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
// Icon for Signup
const UserPlusIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="16" x2="22" y1="11" y2="11" /></svg>
);

// New Icon for the redesigned logo
const PenIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5l4 4L7.5 21H3v-4.5L16.5 3.5z" /></svg>
);



// Navigation links configuration
const navLinks = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Notes', href: '/notes', icon: NotesIcon },
    { name: 'About', href: '/about', icon: InfoIcon },
    { name: 'Contact Us', href: '/contact', icon: MailIcon },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Initialize user from localStorage on client
        const storedUser = localStorage.getItem("username");
        setUser(storedUser);

        // Keep user state in sync across tabs (storage event) and within the app via a custom event
        const onStorage = () => setUser(localStorage.getItem("username"));
        const onAuthChange = () => setUser(localStorage.getItem("username"));
        window.addEventListener('storage', onStorage);
        window.addEventListener('authChange', onAuthChange);
        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('authChange', onAuthChange);
        };
    }, []);

    // Close on Escape key for accessibility
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isMenuOpen]);

    // Function to handle link click (closes menu on mobile and logs action)
    const handleLinkClick = (name) => {
        setIsMenuOpen(false); // Close menu on mobile after selection
    };

    // Helper component to replace Link with <a>
    const NavLink = ({ href, children, className, onClick }) => (
        <Link href={href} className={className} onClick={onClick}>
            {children}
        </Link>
    );

    const handleLogout = () => {
        // Remove locally and update UI state immediately
        localStorage.removeItem('username');
        setUser(null);
        // Notify other parts of the app (and other tabs) that auth changed
        try { window.dispatchEvent(new Event('authChange')); } catch (e) { }
    };

    return (
        <div className="bg-gray-900 text-gray-200 font-sans overflow-x-hidden">

            {/* =====================================================
            MAIN NAVIGATION BAR (TOP)
            ===================================================== */}
            <header className="sticky top-0 z-40 shadow-xl bg-gray-800 border-b border-emerald-500/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo/Brand */}
                        <div className="shrink-0">
                            <NavLink href="/" className="flex items-center space-x-2 transition duration-150 ease-in-out hover:opacity-90" onClick={() => handleLinkClick("Logo Home")}>
                                <PenIcon className="h-7 w-7 text-emerald-500 transform -rotate-12" />
                                <span className="text-3xl font-extrabold tracking-wider text-gray-100">
                                    Note
                                    <span className="text-emerald-400">ly</span>
                                </span>
                            </NavLink>
                        </div>

                        {/* Desktop Navigation Links (Hidden on Mobile) */}
                        <nav className="hidden md:flex md:space-x-8">
                            {navLinks.map((item) => (
                                <NavLink
                                    key={item.name}
                                    href={item.href}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-150 ease-in-out border-b-2 border-transparent hover:border-emerald-500 text-gray-300 hover:text-emerald-400"
                                    onClick={() => handleLinkClick(item.name)}
                                >
                                    <item.icon className="mr-2 h-5 w-5" />
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Login/Signup Buttons (Desktop) and Mobile Menu Button */}
                        <div className="flex items-center">

                            {/* Login/Signup Buttons (Desktop/Tablet) */}
                            <div className="hidden sm:flex items-center space-x-3">
                                {user ? (
                                    <NavLink
                                        href="/"
                                        className="cursor-pointer px-3 py-1.5 text-sm font-semibold rounded-lg text-emerald-400 border border-emerald-500/50 hover:bg-gray-700 hover:border-emerald-500 transition flex items-center"
                                        onClick={handleLogout}
                                    >
                                        <UserPlusIcon className="mr-2 h-5 w-5 stroke-2" />
                                        Logout
                                    </NavLink>
                                ) : (
                                    <>
                                        <NavLink
                                            href="/login"
                                            className="cursor-pointer px-3 py-1.5 text-sm font-semibold rounded-lg text-emerald-400 border border-emerald-500/50 hover:bg-gray-700 hover:border-emerald-500 transition flex items-center"
                                            onClick={() => handleLinkClick("Login")}
                                        >
                                            <UserIcon className="mr-2 h-5 w-5 stroke-2" />
                                            Login
                                        </NavLink>
                                        <NavLink
                                            href="/signup"
                                            className="cursor-pointer px-3 py-1.5 text-sm font-semibold rounded-lg bg-emerald-500 text-gray-900 hover:bg-emerald-400 transition transform hover:scale-105 shadow-lg flex items-center"
                                            onClick={() => handleLinkClick("Signup")}
                                        >
                                            <UserPlusIcon className="mr-2 h-5 w-5 stroke-2" />
                                            Signup
                                        </NavLink>
                                    </>
                                )}
                            </div>

                            {/* Mobile Menu Button (Hamburger) */}
                            <button
                                type="button"
                                className="md:hidden p-2 ml-4 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition"
                                onClick={() => {
                                    console.log('Toggle mobile menu ->', !isMenuOpen);
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                                aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
                            >
                                <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                            </button>
                        </div>

                    </div>
                </div>

                {/* =====================================================
                MOBILE MENU (SLIDEOUT) - Now using <a> tag to fix compilation
                ===================================================== */}
                {/* Backdrop (click to close) - sits under the menu */}
                <div
                    className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden={!isMenuOpen}
                />

                <div
                    // Use transform + opacity to animate slide down/up. Make fixed so it isn't clipped by other stacking contexts.
                    className={`md:hidden fixed top-16 left-0 right-0 bg-gray-800 shadow-2xl z-50 transform origin-top transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-2 opacity-0 pointer-events-none'}`}
                    id="mobile-menu"
                    role="menu"
                    aria-hidden={!isMenuOpen}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {/* Nav Links */}
                        {navLinks.map((item) => (
                            <NavLink
                                key={item.name}
                                href={item.href}
                                // Apply mobile link styling directly to the NavLink component
                                className="flex items-center px-3 py-2 text-base font-medium rounded-md transition duration-150 ease-in-out text-gray-300 hover:bg-gray-700 hover:text-emerald-400"
                                onClick={() => handleLinkClick(item.name)}
                            >
                                <item.icon className="mr-3 h-6 w-6" />
                                {item.name}
                            </NavLink>
                        ))}

                        {/* Mobile Login/Signup Links - Use NavLink component for navigation */}
                        <div className="flex space-x-3 pt-4 border-t border-gray-700/50">
                            {/* Mobile Login Link */}
                            {user ? (
                                <NavLink
                                    href="/login"
                                    className="w-full flex items-center justify-center px-3 py-2 text-base font-medium rounded-md text-emerald-400 border border-emerald-500/50 hover:bg-gray-700 transition"
                                    onClick={handleLogout}
                                >
                                    <UserIcon className="mr-2 h-6 w-6" />
                                    Logout
                                </NavLink>
                            )
                                :
                                (<>
                                    <NavLink
                                        href="/login"
                                        className="w-1/2 flex items-center justify-center px-3 py-2 text-base font-medium rounded-md text-emerald-400 border border-emerald-500/50 hover:bg-gray-700 transition"
                                        onClick={() => handleLinkClick("Login")}
                                    >
                                        <UserIcon className="mr-2 h-6 w-6" />
                                        Login
                                    </NavLink>
                                    <NavLink
                                        href="/signup"
                                        className="w-1/2 flex items-center justify-center px-3 py-2 text-base font-bold rounded-md text-gray-900 bg-emerald-500 hover:bg-emerald-400 transition shadow-md"
                                        onClick={() => handleLinkClick("Signup")}
                                    >
                                        <UserPlusIcon className="mr-2 h-6 w-6" />
                                        Signup
                                    </NavLink>
                                </>
                                )}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;