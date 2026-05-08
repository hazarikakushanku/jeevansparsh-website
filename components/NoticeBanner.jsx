"use client";

import { useState, useEffect } from "react";
import { Megaphone, X } from "lucide-react";

export default function NoticeBanner() {
  const [notice, setNotice] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchNotice = () => {
      const savedNotice = localStorage.getItem("globalNotice");
      if (savedNotice) {
        setNotice(savedNotice);
        setIsVisible(true);
      } else {
        setNotice("");
      }
    };

    fetchNotice();

    // Listen for custom event so it updates immediately across the app
    window.addEventListener('noticeUpdated', fetchNotice);
    return () => window.removeEventListener('noticeUpdated', fetchNotice);
  }, []);

  if (!notice || !isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-rehab-blue via-blue-900 to-rehab-blue text-white py-1 px-4 shadow-sm border-b border-white/10 relative overflow-hidden z-[40]">
      {/* Premium decorative background highlights */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute -top-10 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 right-1/4 w-40 h-40 bg-rehab-yellow rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-center relative z-10 text-center">
        <div className="flex items-center gap-2">
          <Megaphone size={12} className="text-rehab-yellow animate-pulse flex-shrink-0" />
          <p className="font-medium text-[11px] md:text-xs leading-none">
            <span className="font-bold text-rehab-yellow tracking-wider mr-1.5 uppercase text-[9px]">NEW:</span>
            {notice}
          </p>
        </div>
      </div>
    </div>
  );
}
