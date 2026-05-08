import Link from "next/link";
import { Activity, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-jeevansparsh-blue text-white pt-16 pb-8 px-4 sm:px-6 lg:px-12 border-t border-blue-900">
      <div className="max-w-7xl mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="text-jeevansparsh-yellow flex-shrink-0" size={26} />
              <span className="text-xl font-bold tracking-tight text-white">Jeevansparsh</span>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed max-w-lg">
              Jeevansparsh Advanced Physiotherapy &amp; Rehabilitation Center is dedicated to delivering expert, compassionate care for pain relief, injury recovery, and long-term wellness. Our team specializes in manual therapy, sports rehabilitation, neurological rehabilitation, post-surgical care, pediatric therapy, IASTM, cupping therapy, kinesiology taping, and posture correction.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-jeevansparsh-yellow hover:text-jeevansparsh-blue transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://www.instagram.com/p/DRE2O-MCbiz/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-jeevansparsh-yellow hover:text-jeevansparsh-blue transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-jeevansparsh-yellow hover:text-jeevansparsh-blue transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Facilities", path: "/facilities" },
                { name: "We Care", path: "/we-care" },
                { name: "Doctors", path: "/doctors" },
                { name: "Media", path: "/media" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-blue-200 hover:text-jeevansparsh-yellow transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-3">
              {["Orthopedic Rehab", "Neuro Physiotherapy", "Pediatric Care", "Geriatric Care", "Sports Injuries", "Sports Massage"].map((s) => (
                <li key={s} className="text-blue-200 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-blue-200">
                <MapPin className="text-jeevansparsh-yellow flex-shrink-0 mt-0.5" size={16} />
                <span>Opposite Assam Forest School, Near Gauhati University, Jalukbari, Guwahati – 781014</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-200">
                <Phone className="text-jeevansparsh-yellow flex-shrink-0" size={16} />
                <a href="tel:+919387634900" className="hover:text-white transition-colors">+91 93876 34900</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-200">
                <Phone className="text-jeevansparsh-yellow flex-shrink-0" size={16} />
                <a href="tel:+919435415007" className="hover:text-white transition-colors">+91 94354 15007</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-blue-200">
                <Mail className="text-jeevansparsh-yellow flex-shrink-0" size={16} />
                <a href="mailto:info@jeevansparsh.com" className="hover:text-white transition-colors break-all">info@jeevansparsh.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-blue-300 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Jeevansparsh Physiotherapy. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs sm:text-sm text-blue-300">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
