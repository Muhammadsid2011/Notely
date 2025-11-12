"use client";
import React, { useState, useEffect } from 'react';

// Icons for the About page
const RocketIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.74-2.42.01-3.15-.29-.29-.46-.66-.46-1.05V7.83a2 2 0 1 1 2.83-2.83L14.4 13.6l-.37.36.36.37 5.24 5.24L22 17l-5.24-5.24-.37.36-.36-.37-8.31-8.31a2 2 0 0 0-2.83 0z"/></svg>);
const ZapIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
const UsersIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);

const teamMembers = [
  { name: "Alex Chen", role: "Founder & CEO", img: "https://placehold.co/100x100/10b981/ffffff?text=AC" },
  { name: "Sarah Lee", role: "Lead Developer", img: "https://placehold.co/100x100/6366f1/ffffff?text=SL" },
  { name: "Mike Johnson", role: "UX/UI Designer", img: "https://placehold.co/100x100/f59e0b/ffffff?text=MJ" },
];

const AnimatedSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate staggered entrance on load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`
        transform transition-all duration-1000 ease-out 
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      `}
    >
      {children}
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-200 font-sans p-4 sm:p-8">
      <main className="max-w-6xl mx-auto py-12">
        
        {/* Title Section */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-6xl font-extrabold text-emerald-400 tracking-tight mb-4 animate-pulse-slow">
              About Notely
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simplifying the art of organization and ensuring your ideas never fade away.
            </p>
          </div>
        </AnimatedSection>
        
        {/* Mission Section */}
        <AnimatedSection delay={200}>
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 mb-16">
            <h2 className="text-3xl font-bold text-indigo-400 flex items-center mb-4">
              <RocketIcon className="mr-3 h-7 w-7" /> Our Mission
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Notely was founded on the belief that great ideas shouldn't be trapped behind complexity. Our mission is to provide a minimalist, lightning-fast platform that helps you capture, organize, and retrieve your thoughts instantly, allowing you to focus purely on creativity and productivity.
            </p>
          </div>
        </AnimatedSection>

        {/* Core Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <AnimatedSection delay={400}>
            <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:scale-[1.03] transition duration-300 transform group">
              <ZapIcon className="h-8 w-8 text-emerald-500 mb-3 group-hover:text-emerald-300 transition" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Speed & Simplicity</h3>
              <p className="text-sm text-gray-400">
                We prioritize performance and a clean interface. No distractions, just immediate access to your notes, wherever you are.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={600}>
            <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:scale-[1.03] transition duration-300 transform group">
              <UsersIcon className="h-8 w-8 text-indigo-500 mb-3 group-hover:text-indigo-300 transition" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">User Focus</h3>
              <p className="text-sm text-gray-400">
                Every feature is built with the user in mind. We listen to feedback and continuously refine Notely to serve your needs better.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={800}>
            <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:scale-[1.03] transition duration-300 transform group">
              <SaveIcon className="h-8 w-8 text-yellow-500 mb-3 group-hover:text-yellow-300 transition" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Reliable Storage</h3>
              <p className="text-sm text-gray-400">
                Using modern database solutions ensures your data is safe, secure, and always synchronized across all your devices.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Team Section */}
        <AnimatedSection delay={1000}>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-100 mb-2">Meet the Team</h2>
            <p className="text-gray-400">The small team behind the seamless note-taking experience.</p>
          </div>
          <div className="flex justify-center flex-wrap gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="w-full max-w-[200px] p-4 bg-gray-800 rounded-xl text-center shadow-lg border border-gray-700 hover:shadow-emerald-500/30 transition duration-300 transform hover:scale-[1.05]"
              >
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="rounded-full mx-auto mb-4 border-4 border-emerald-500/50 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/6366f1/ffffff?text=User"; }}
                />
                <h4 className="text-lg font-semibold text-gray-100">{member.name}</h4>
                <p className="text-sm text-emerald-400">{member.role}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </main>
    </div>
  );
}

// Icon reused from previous file
const SaveIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
);