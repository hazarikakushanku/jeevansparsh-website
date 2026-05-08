"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Activity } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Facilities", path: "/facilities" },
  { name: "We Care", path: "/we-care" },
  { name: "Doctors", path: "/doctors" },
  { name: "Media", path: "/media" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2 sm:py-3" : "bg-jeevansparsh-blue text-white py-3 sm:py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className={`p-2 rounded-lg ${scrolled ? "bg-jeevansparsh-blue text-white" : "bg-white/10 text-rehab-yellow"} group-hover:scale-105 transition-transform`}>
            <Activity size={24} />
          </div>
          <span className={`text-lg sm:text-2xl font-bold tracking-tight ${scrolled ? "text-jeevansparsh-blue" : "text-white"}`}>Jeevansparsh</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-jeevansparsh-yellow ${pathname === link.path
                ? (scrolled ? "text-blue-600" : "text-jeevansparsh-yellow")
                : (scrolled ? "text-gray-600" : "text-gray-300")
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/login" className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${scrolled ? "bg-Jeevansparsh-blue text-white hover:bg-blue-800" : "bg-Jeevansparsh-yellow text-Jeevansparsh-blue hover:bg-yellow-400"
            }`}>
            Login
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} className={scrolled ? "text-Jeevansparsh-blue" : "text-white"} /> : <Menu size={28} className={scrolled ? "text-Jeevansparsh-blue" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium py-2 ${pathname === link.path ? "text-blue-600" : "text-gray-700"}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3 mt-2 bg-jeevansparsh-blue text-white rounded-lg font-semibold">
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
