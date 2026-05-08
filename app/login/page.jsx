"use client";

import { useState } from "react";
// Mock Firebase imports removed
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "abc@gmail.com" && password === "abc@123") {
        localStorage.setItem("isAdmin", "true");
        router.push("/admin");
      } else {
        setError("Invalid admin credentials. Access denied.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center overflow-hidden shadow-md">
            <img src="/logo.jpg" alt="Jeevansparsh Logo" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-jeevansparsh-blue mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Sign in to your account</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 sm:px-5 py-3 rounded-xl border border-gray-200 focus:border-jeevansparsh-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 sm:px-5 py-3 rounded-xl border border-gray-200 focus:border-jeevansparsh-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 sm:py-4 bg-jeevansparsh-blue text-white rounded-xl font-bold hover:bg-blue-900 transition-colors flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Don't have an account? <Link href="/register" className="text-rehab-blue font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
