import React, { useState } from "react";

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validation
    if (!email || !password || (isSignup && !name)) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 2) {
      setError("Password must be at least 2 characters");
      return;
    }

    try {
      setError("");

      const endpoint = isSignup
        ? "https://localhost:5000/api/auth/signup"
        : "https://localhost:5000/api/auth/login";

      const body = isSignup
        ? { name, email, password }
        : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }
      //gemini code
      if (isSignup) {
        setIsSignup(false);
        alert("Account created successfully! Please login.");
        return;
      }
      // till here

      // Save token
      localStorage.setItem("token", data.token);
      // Save Name
      localStorage.setItem("name", data.teacher.name);

      onLogin();
    } catch (err) {
      setError("Server error");
    }
  };

  return (
  <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-sky-50">

    {/* Left Panel - Desktop Only */}
    <div className="hidden md:flex w-1/2 bg-indigo-600 text-white flex-col justify-center px-16">
      <h1 className="text-4xl font-extrabold mb-6">
        AttendexPro
      </h1>

      <p className="text-lg opacity-90 mb-8">
        AI-powered attendance management made effortless.
      </p>

      <ul className="space-y-4 text-sm opacity-90">
        <li>✔ Scan attendance registers instantly</li>
        <li>✔ Automatic database updates</li>
        <li>✔ Download structured Excel reports</li>
      </ul>
    </div>

    {/* Right Panel */}
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-12 relative">

      {/* Mobile Logo */}
      <div className="md:hidden text-center mb-8 w-full animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          AttendexPro
        </h1>
        <p className="text-gray-500 mt-2 text-sm font-medium">Manage attendance with AI</p>
      </div>

      <div className="
        w-full 
        max-w-md 
        bg-white/80 
        backdrop-blur-xl
        md:bg-white
        md:p-10 
        p-8 
        rounded-3xl 
        shadow-2xl 
        border 
        border-white/50
        md:border-gray-100
      ">

        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>

        </form>

        <p className="text-sm text-center mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-indigo-600 ml-1 font-medium hover:underline"
          >
            {isSignup ? "Login" : "Create one"}
          </button>
        </p>

      </div>
    </div>
  </div>
);

};

export default Login;
