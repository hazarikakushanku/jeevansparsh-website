"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function DoctorAssistant() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [isRightSide, setIsRightSide] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    // Start it at the bottom right corner
    const initX = window.innerWidth - 90 - 24;
    const initY = window.innerHeight - 90 - 24;
    
    gsap.set(el, { x: initX, y: initY });
    currentPos.current = { x: initX, y: initY };
    
    const handleResize = () => snapToCorner();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const snapToCorner = () => {
    const el = containerRef.current;
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    const paddingX = 24;
    const paddingY = 24;
    
    const targetY = screenHeight - rect.height - paddingY;
    let targetX = paddingX; 
    let rightSide = false;
    
    if (centerX > screenWidth / 2) {
      targetX = screenWidth - rect.width - paddingX; 
      rightSide = true;
    }
    
    setIsRightSide(rightSide);

    // Bounce animation back to the closest bottom corner
    gsap.to(el, {
      x: targetX,
      y: targetY,
      duration: 1.2,
      ease: "elastic.out(1, 0.4)",
      onUpdate: () => {
         currentPos.current = { x: gsap.getProperty(el, "x"), y: gsap.getProperty(el, "y") };
      }
    });
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startPos.current = {
      x: e.clientX - currentPos.current.x,
      y: e.clientY - currentPos.current.y
    };
    e.target.setPointerCapture(e.pointerId);
    gsap.killTweensOf(containerRef.current); // Stop ongoing bounce
    document.body.style.userSelect = "none";
    setIsHovered(false); // Hide bubble while dragging
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const newX = e.clientX - startPos.current.x;
    const newY = e.clientY - startPos.current.y;
    currentPos.current = { x: newX, y: newY };
    gsap.set(containerRef.current, { x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    e.target.releasePointerCapture(e.pointerId);
    document.body.style.userSelect = "";
    snapToCorner();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      <div 
        ref={containerRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ width: '90px', height: '90px' }}
      >
        {/* Speech Bubble */}
        <div 
          className={`absolute bottom-[100%] mb-2 bg-white p-4 shadow-xl border border-gray-100 transition-all duration-300 w-[220px] pointer-events-auto ${
            isHovered && !isDragging.current ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-4"
          } ${isRightSide ? "right-0 origin-bottom-right rounded-2xl rounded-br-none" : "left-0 origin-bottom-left rounded-2xl rounded-bl-none"}`}
        >
          <p className="text-sm text-gray-800 font-semibold mb-1 text-rehab-blue">
            Hello! 👋
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            I'm your virtual Rehab Assistant. Feel free to explore our facilities or book an appointment!
          </p>
        </div>

        {/* 2D Character Container */}
        <div 
          className="w-full h-full relative cursor-grab active:cursor-grabbing hover:-translate-y-2 transition-transform duration-300 pointer-events-auto"
          onMouseEnter={() => !isDragging.current && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
              <img 
                src="/doctor-assistant.png" 
                alt="Doctor Assistant" 
                className="w-[130%] h-[130%] object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]" 
                draggable="false"
              />
          </div>
        </div>
      </div>
    </div>
  );
}
