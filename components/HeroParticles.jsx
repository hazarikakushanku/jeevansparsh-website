"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
    // Resize canvas to fill parent
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
      }
    };
    
    let particles = [];
    const mouse = { x: null, y: null, radius: 120 };

    const handleMouseMove = (event) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
      } else {
        mouse.x = null;
        mouse.y = null;
      }
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    resizeCanvas();

    const image = new Image();
    image.src = "/dr-ref.jpg";
    
    let animationFrameId;

    const initParticles = () => {
      particles = [];
      
      const sampleWidth = 120;
      const sampleHeight = 120 * (image.height / image.width || 1);
      
      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = sampleWidth;
      offscreenCanvas.height = sampleHeight;
      const offCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
      
      if (image.complete && image.naturalWidth > 0) {
        offCtx.drawImage(image, 0, 0, sampleWidth, sampleHeight);
        const imageData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight).data;
        
        // Find background color by sampling the top-left pixel
        const bgR = imageData[0];
        const bgG = imageData[1];
        const bgB = imageData[2];
        const isBgDark = (bgR + bgG + bgB) / 3 < 128;

        // Scale to fit nicely in the right half of the hero or centered
        const scale = Math.min(canvas.width * 0.4 / sampleWidth, canvas.height * 0.5 / sampleHeight);
        
        // Center the logo horizontally in the middle of the screen, and move it almost to the top
        const offsetX = (canvas.width - sampleWidth * scale) / 2;
        const offsetY = (canvas.height - sampleHeight * scale) * 0.05; // 0.05 pushes it very close to the top

        for (let y = 0; y < sampleHeight; y += 2) {
          for (let x = 0; x < sampleWidth; x += 2) {
            const index = (y * sampleWidth + x) * 4;
            const r = imageData[index];
            const g = imageData[index + 1];
            const b = imageData[index + 2];
            const a = imageData[index + 3];
            
            // Skip transparent pixels
            if (a < 128) continue;
            
            const brightness = (r + g + b) / 3;
            let isLogoPixel = false;
            
            // If background is dark, logo is bright, and vice versa
            // We also check if it's not a uniform background color
            const colorDiff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
            if (colorDiff > 50) {
                isLogoPixel = true;
            }

            if (isLogoPixel) { 
              const baseX = offsetX + x * scale;
              const baseY = offsetY + y * scale;
              
              particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                baseX: baseX,
                baseY: baseY,
                radius: Math.random() * 1.5 + 0.5,
                color: `rgba(74, 222, 128, ${Math.random() * 0.3 + 0.7})`, // Brighter green
                isLogo: true,
                vx: 0,
                vy: 0,
                ease: 0.02 + Math.random() * 0.05
              });
            }
          }
        }
      }

      // Add free floating particles
      const numFloatingParticles = 80;
      for (let i = 0; i < numFloatingParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          color: `rgba(74, 222, 128, ${Math.random() * 0.4 + 0.6})`, // Brighter green
          isLogo: false
        });
      }
    };

    image.onload = () => {
      initParticles();
    };
    
    if (image.complete) {
        initParticles();
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        if (p.isLogo) {
          // Logo particles seek their base position
          let dx = mouse.x != null ? mouse.x - p.x : 0;
          let dy = mouse.y != null ? mouse.y - p.y : 0;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius && mouse.x != null) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            let directionX = forceDirectionX * force * 15;
            let directionY = forceDirectionY * force * 15;
            
            p.x -= directionX;
            p.y -= directionY;
          } else {
            // Return to base
            p.x += (p.baseX - p.x) * p.ease;
            p.y += (p.baseY - p.y) * p.ease;
          }
        } else {
          // Floating particles
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          
          // Mouse interaction for floating particles
          if (mouse.x != null && mouse.y != null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
              const forceDirectionX = dx / distance;
              const forceDirectionY = dy / distance;
              const force = (mouse.radius - distance) / mouse.radius;
              const directionX = forceDirectionX * force * 5;
              const directionY = forceDirectionY * force * 5;
              
              p.x -= directionX;
              p.y -= directionY;
              
              // Draw line to mouse
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(250, 204, 21, ${force * 0.3})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby floating particles
        if (!p.isLogo) {
           for (let j = index + 1; j < particles.length; j++) {
             const p2 = particles[j];
             if (!p2.isLogo) {
                 const dx = p.x - p2.x;
                 const dy = p.y - p2.y;
                 const dist = Math.sqrt(dx * dx + dy * dy);

                 if (dist < 120) {
                   ctx.beginPath();
                   ctx.moveTo(p.x, p.y);
                   ctx.lineTo(p2.x, p2.y);
                   ctx.strokeStyle = `rgba(255, 255, 255, ${(120 - dist) / 1000})`; 
                   ctx.lineWidth = 1;
                   ctx.stroke();
                 }
             }
           }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
}
