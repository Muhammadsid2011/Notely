import Link from 'next/link';
import React from 'react';

// === Icon Components (Self-Contained SVGs) ===
// Note: We only keep the icons required for the logo and feature cards.
const PenIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5l4 4L7.5 21H3v-4.5L16.5 3.5z" /></svg>
);
const CloudIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.78 10h1.72a5 5 0 0 1 0 10H5a5 5 0 0 1-1-9.899z" /></svg>
);
const FolderIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 9.8 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z" /></svg>
);
const CodeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l4-4-4-4" /><path d="M8 6l-4 4 4 4" /><path d="M12 2v20" /></svg>
);
const LockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
const SunMoonIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" /><path d="M1.01 12H3" /><path d="M21.01 12H23" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" /></svg>
);
const WifiOffIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1.05 9c.7-.64 2.1-1.63 3.45-2.28m5.68-1.55c.29-.09.59-.15.91-.17m4.94 1.35c.74.34 1.48.74 2.22 1.15" /><path d="M4.09 15c.95-1.09 2.13-2.12 3.42-3.13m5.88-3.4c.29-.18.59-.34.9-.49m4.84 2.07c.39.29.78.6 1.16.92" /><path d="M15.42 19c.47-.53.95-1.07 1.4-1.63m-5.45-5.2c-.3-.21-.6-.4-.91-.59m-4.66 1.83c.27.18.55.36.83.54" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
);


// Component for the feature cards with hover animation
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col p-6 rounded-xl bg-gray-800 shadow-2xl border border-gray-700/50 transition duration-300 ease-in-out transform hover:scale-[1.02] hover:border-emerald-500 hover:shadow-emerald-900/40">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500 text-gray-900 mb-4 shadow-lg">
      <Icon className="h-6 w-6 stroke-2" />
    </div>
    <h3 className="text-xl font-bold text-gray-50 mb-3">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);


const App = () => {

  // Simulated handler for the "Get Started" button
  const handleGetStarted = () => {
    console.log("Get Started button clicked! (Simulated redirection to Signup/Auth flow)");
    // In a real app, this would trigger navigation, e.g., router.push('/signup')
  }


  return (
    // Applied gradient background and added top padding (pt-16) to ensure content 
    // clears the space where your external layout's navbar will sit.
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-200 font-sans overflow-x-hidden pt-16">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* 1. HERO SECTION (Welcoming Message & Get Started Button) */}
        <section className="text-center py-16 md:py-24" id="home">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-50 mb-4 animate-fadeInUp">
            Capture Brilliance with <span className="text-emerald-400">Notely</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 opacity-0 animate-fadeIn delay-200">
            The simple, secure, and **smart way to organize your thoughts**, ideas, and tasks across all your devices.
            Get rid of the clutter and focus on what truly matters.
          </p>
          {/* Vibrant Gradient Button with Animation */}
          <button
            className="cursor-pointer px-10 py-4 text-xl font-extrabold rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-gray-900 shadow-xl hover:shadow-emerald-500/50 transition duration-300 transform hover:scale-[1.03] animate-bounceOnce"
          >
            <Link href={"/notes"}>
              Start Taking Notes
            </Link>
          </button>
        </section>

        <hr className="border-gray-700 my-16 opacity-50" />

        {/* 2. CAPABILITIES SECTION (Cards) */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center text-gray-100 mb-12">
            Features Designed for Focus
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

            <FeatureCard
              icon={CloudIcon}
              title="Seamless Cloud Sync"
              description="Access your notes instantly from any device. Your data is always up-to-date and securely backed up in the cloud."
            />

            <FeatureCard
              icon={FolderIcon}
              title="Intuitive Organization"
              description="Use tags, folders, and customizable categories to keep even thousands of notes perfectly structured and easy to find."
            />

            <FeatureCard
              icon={CodeIcon}
              title="Rich Text & Markdown"
              description="Draft beautiful documents with a powerful Markdown editor. Support for code blocks, tables, and multimedia."
            />

            <FeatureCard
              icon={LockIcon}
              title="Private & Secure"
              description="Your privacy is paramount. Notes are end-to-end encrypted, ensuring only you can read your most sensitive information."
            />

            <FeatureCard
              icon={SunMoonIcon}
              title="Customizable Themes"
              description="Switch between light and dark modes, or choose from multiple color palettes to match your mood and environment."
            />

            <FeatureCard
              icon={WifiOffIcon}
              title="Works Offline"
              description="Take notes even without an internet connection. Changes sync automatically the moment you come back online."
            />
          </div>
        </section>

      </main>

      {/* Tailwind Keyframes for Animation */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes bounceOnce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-bounceOnce {
            animation: bounceOnce 0.6s ease-in-out;
        }
        .delay-200 {
            animation-delay: 0.2s;
        }
        
      `}</style>
    </div>
  );
};

export default App;