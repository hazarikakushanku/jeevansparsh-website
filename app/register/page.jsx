"use client";

import { useState } from "react";
// Mock Firebase imports removed
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      // Mock successful registration
      router.push("/");
    }, 1000);
    // } catch (err) {
    //   setError(err.message || "Failed to create account.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 py-24">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100">
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center overflow-hidden border shadow-sm">
            <img src="/logo.jpg" alt="Jeevansparsh Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-jeevansparsh-blue mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join the Jeevansparsh community</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 sm:px-5 py-3 rounded-xl border border-gray-200 focus:border-jeevansparsh-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            className="w-full py-3 sm:py-4 bg-jeevansparsh-yellow text-jeevansparsh-blue rounded-xl font-bold hover:bg-yellow-400 transition-colors flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-jeevansparsh-blue border-t-transparent rounded-full animate-spin"></span>
            ) : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Already have an account? <Link href="/login" className="text-jeevansparsh-blue font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
