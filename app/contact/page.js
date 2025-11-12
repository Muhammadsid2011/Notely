"use client";
import React, { useState, useEffect } from 'react';

// Icons for the Contact page
const SendIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15.5 22 11 13 2 9.5 22 2"/></svg>);
const MailIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>);
const GitHubIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-1.7 1.3-3 3-3h1c1.7 0 3 1.3 3 3v3.8m1.2 2.2a.7.7 0 0 1-.7-.7c-.2-.5-.1-1-.1-1.2v-2.5c0-.6.4-1.2 1-1.2h1.5c.6 0 1 .4 1 1v1.5c0 0 .5.3.7.8.2.5.1 1 .1 1.2a.7.7 0 0 1-.7.7zM12 6.5c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zM12 2C6.48 2 2 6.48 2 12c0 4.42 2.86 8.17 6.83 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.45-1.1-1.45-.9-.6.07-.6.07-.6 1.05.07 1.6 1.08 1.6 1.08.93 1.6 2.45 1.14 3.05.88.09-.7.36-1.14.6-1.4-2.3-.26-4.7-1.15-4.7-5 0-1.15.4-2.1 1.05-2.85-.1-.26-.45-1.35.1-2.8 0 0 .85-.28 2.85 1.08A9.97 9.97 0 0 1 12 5.97c.95 0 1.9.13 2.7.4a9.62 9.62 0 0 1 2.85-1.08c.55 1.45.2 2.54.1 2.8.65.75 1.05 1.7 1.05 2.85 0 3.85-2.4 4.74-4.7 5 .38.33.68.96.68 1.92v2.85c0 .26.18.57.68.48C19.14 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/></svg>);
const CheckCircleIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);


const AnimatedSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Staggered entrance animation
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


export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submissionStatus) setSubmissionStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name || !formData.email || !formData.message) {
      setSubmissionStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful submission
    console.log('Contact form submitted:', formData);
    setSubmissionStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    // Clear status after 5 seconds
    setTimeout(() => setSubmissionStatus(null), 5000);
  };

  return (
    <div className="min-h-[93.2vh] bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-200 font-sans p-4 sm:p-8">
      <main className="max-w-4xl mx-auto py-12">
        
        {/* Title Section with Animation */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-emerald-400 tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have a question, feedback, or suggestion? We're here to help.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">
            
          {/* Contact Information / Details */}
          <AnimatedSection delay={200}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">Connect with Us</h2>
              <div className="space-y-4">
                
                {/* Updated Email Contact */}
                <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-emerald-500/50 transition duration-300 transform hover:scale-[1.02]">
                  <MailIcon className="text-emerald-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email Address</p>
                    <p className="text-gray-200 font-medium">muhammadsid2011@gmail.com</p>
                  </div>
                </div>
                
                {/* New GitHub Contact */}
                <a 
                  href="https://github.com/Muhammadsid2011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition duration-300 transform hover:scale-[1.02]">
                    <GitHubIcon className="text-indigo-400" />
                    <div>
                      <p className="text-sm text-gray-400">View on GitHub</p>
                      <p className="text-gray-200 font-medium">Muhammadsid2011</p>
                    </div>
                  </div>
                </a>
              </div>
              
              <p className="pt-4 text-gray-500 text-sm">
                  We look forward to hearing from you regarding features or development collaboration.
              </p>
            </div>
          </AnimatedSection>
            
          {/* Contact Form */}
          <AnimatedSection delay={400}>
            <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700/50">
              <h2 className="text-3xl font-bold text-gray-100 mb-6">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name Input */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                    required
                  />
                </div>
                
                {/* Email Input */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                    required
                  />
                </div>

                {/* Message Textarea */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                    required
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submissionStatus === 'error' && (
                  <div className="bg-red-900/50 text-red-300 p-3 rounded-lg text-sm border border-red-700 transition duration-300 opacity-100">
                    Please fill out all fields before submitting.
                  </div>
                )}
                {submissionStatus === 'success' && (
                  <div className="flex items-center space-x-2 bg-green-900/50 text-green-300 p-3 rounded-lg text-sm border border-green-700 transition duration-500 animate-pulse-once">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}

                {/* Submit Button with Loading State */}
                <button
                  type="submit"
                  disabled={isSubmitting || submissionStatus === 'success'}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-lg font-bold rounded-xl bg-emerald-500 text-gray-900 hover:bg-emerald-400 transition duration-300 shadow-xl shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin h-5 w-5 border-3 border-t-3 border-t-gray-900 border-transparent rounded-full"></span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <SendIcon />
                    </>
                  )}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  );
}