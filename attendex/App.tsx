
import React, { useState } from 'react';
import Login from "./components/Login";
import { useEffect } from "react";
import { Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ClassPage from "./pages/ClassPage";

// --- Static Pages ---

const HowItWorksPage: React.FC = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto py-12 px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        Mastering <span className="text-indigo-600">AttendexPro</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        From paper registers to digital spreadsheets in four simple steps.
      </p>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">1</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Create Your Class</h3>
        <p className="text-gray-600">
          Start by creating a class in your dashboard. This helps organize your attendance records and keeps everything structured by subject or grade.
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">2</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Upload Register</h3>
        <p className="text-gray-600">
          Select a class and upload a clear photo of your attendance register. Ensure good lighting and that the entire table is visible for best results.
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">3</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">AI Processing</h3>
        <p className="text-gray-600">
          Our advanced Gemini AI scans the image, recognizing handwritten ticks, crosses, and student names, converting them into structured digital data.
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">4</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Export to Excel</h3>
        <p className="text-gray-600">
          Review the digitized attendance in the app. Once satisfied, download it as a formatted Excel file ready for your administrative reports.
        </p>
      </div>
    </div>
    <div className="mt-12 text-center">
      <Link to="/dashboard" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
        Go to Dashboard
      </Link>
    </div>
  </div>
);

const PrivacyPage: React.FC = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto py-12 px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Privacy & Security</h2>
      <p className="text-gray-600">Your data security is our top priority.</p>
    </div>
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Processing</h3>
          <p className="text-gray-600 leading-relaxed">
            AttendexPro uses industry-standard encryption for data transmission. Your images are processed securely by Google's Gemini API and are not used to train public AI models.
          </p>
        </div>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Data Minimization</h3>
          <p className="text-gray-600 leading-relaxed">
            We practice strict data minimization. We only process the specific image you upload to extract attendance data. Once the session ends or you close the tab, temporary data is cleared from the client side.
          </p>
        </div>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">User Control</h3>
          <p className="text-gray-600 leading-relaxed">
            You have full control over your data. You can delete classes and attendance records at any time. We do not share your data with third parties for marketing purposes.
          </p>
        </div>
      </div>
    </div>
    <div className="mt-12 text-center">
      <Link to="/dashboard" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors flex items-center justify-center gap-2 mx-auto">
        <span>←</span> Back to Dashboard
      </Link>
    </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto py-12">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Get in Touch</h2>
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
      <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-xl font-bold text-gray-800">Support & Feedback</p>
      <p className="text-gray-600 mt-2 mb-8">Have questions or found a bug? We'd love to hear from you.</p>
      <a href="mailto:rounakmodi22@outlook.com" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
        Rounak
      </a>
      <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Response Time</p>
          <p className="text-gray-800 font-bold">Within 24 Hours</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Availability</p>
          <p className="text-gray-800 font-bold">Mon - Fri</p>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const teacherName = localStorage.getItem("name") || "Teacher";
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setShowProfileMenu(false);
    setIsAuthenticated(false);
    navigate('/login');
  };

  // This effect will redirect user if auth state changes
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {/* Redirect any other path to /login if not authenticated */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 pb-12">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* <div className="flex items-center gap-2 cursor-pointer group" onClick={reset}> */}
          <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">
              AttendexPro
            </span>
          </Link>
          
<div className="hidden md:flex gap-6 text-sm font-medium text-gray-500 items-center relative">
  <Link to="/how-it-works" className="hover:text-indigo-600 transition-colors">How it works</Link>
  <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy</Link>
  <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>

  {/* Profile Icon */}
  <div className="relative ml-4">
    <button
      onClick={() => setShowProfileMenu(!showProfileMenu)}
      className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold"
    >
      {teacherName.charAt(0).toUpperCase()}
    </button>

    {/* Dropdown */}
    {showProfileMenu && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-semibold text-gray-800">{teacherName}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Logout
        </button>

        <button
          onClick={async () => {
            const confirmDelete = window.confirm(
              "This will permanently delete your account and all data. Continue?"
            );
            if (!confirmDelete) return;

            const token = localStorage.getItem("token");

            await fetch("http://localhost:5000/api/auth/delete", {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            localStorage.clear();
            setIsAuthenticated(false);
            navigate("/login", { replace: true });
          }}
          className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
        >
          Delete Account
        </button>
      </div>
    )}
  </div>
</div>


          {/* Mobile Profile Icon */}
<div className="md:hidden relative">
  <button
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold"
  >
    {teacherName.charAt(0).toUpperCase()}
  </button>

  {showProfileMenu && (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
      <div className="px-4 py-3 border-b">
        <p className="text-sm font-semibold text-gray-800">
          {teacherName}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Logout
      </button>

      <button
        onClick={async () => {
          const confirmDelete = window.confirm(
            "This will permanently delete your account and all data. Continue?"
          );
          if (!confirmDelete) return;

          const token = localStorage.getItem("token");

          await fetch("http://localhost:5000/api/auth/delete", {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          localStorage.clear();
          setIsAuthenticated(false);
          navigate("/login", { replace: true });
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
      >
        Delete Account
      </button>
    </div>
  )}
</div>

        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 pt-12">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/class/:id" element={<ClassPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>

      <footer className="mt-20 border-t border-gray-100 py-10 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
             <div className="flex gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
               <Link to="/how-it-works" className="hover:text-indigo-600">Manual</Link>
               <span>&bull;</span>
               <Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link>
               <span>&bull;</span>
               <Link to="/contact" className="hover:text-indigo-600">Support</Link>
             </div>
             <p className="text-gray-400 text-sm">
               &copy; {new Date().getFullYear()} Attendex. Built for effortless administrative work.
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
