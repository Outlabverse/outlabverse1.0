import React, { useEffect, useRef } from 'react';

const BackgroundElements: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Stars settings
    const stars: {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      hue: number;
    }[] = [];
    
    const starCount = 120;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        hue: Math.random() * 60 - 30 // color variation
      });
    }
    
    // Animation variables
    let time = 0;
    
    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;
      
      // Draw stars
      stars.forEach(star => {
        // Pulsating effect
        const pulse = Math.sin(time * 2 + star.x * 0.01) * 0.2 + 0.8;
        const size = star.size * pulse;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        
        // Dynamic color based on position and time
        const hue = (star.hue + time * 15) % 360;
        const colorStart = `hsla(${330 + hue}, 100%, 65%, ${star.opacity})`;
        const colorEnd = `hsla(${270 + hue}, 100%, 65%, 0)`;
        
        // Create a radial gradient
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, size * 2
        );
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Move stars upward
        star.y -= star.speed;
        
        // Reset position when out of screen
        if (star.y < -star.size * 2) {
          star.y = canvas.height + star.size * 2;
          star.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {/* Stars canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: -5 }}
      />
      
      {/* Noise texture overlay */}
      <div className="noise" style={{ zIndex: -2 }}></div>
      
      {/* Gradient orbs/blobs - lower z-index */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full opacity-20 bg-gradient-to-r from-[#ff2d55] to-[#5e17eb] blur-[80px] animate-[pulse_10s_ease-in-out_infinite]" style={{ zIndex: -10 }}></div>
      <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full opacity-15 bg-gradient-to-r from-[#5e17eb] to-[#ff2d55] blur-[100px] animate-[pulse_15s_ease-in-out_2s_infinite]" style={{ zIndex: -10 }}></div>
      
      {/* Grid overlay - lower z-index */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          zIndex: -3
        }}>
      </div>
      
      {/* 3D floating elements - lower z-index */}
      <div className="absolute top-[25%] left-[15%] w-24 h-24 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm transform rotate-12 animate-[float_15s_ease-in-out_infinite] shadow-xl" style={{ zIndex: -4 }}></div>
      <div className="absolute bottom-[30%] left-[20%] w-16 h-16 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm transform -rotate-12 animate-[float_20s_ease-in-out_2s_infinite] shadow-xl" style={{ zIndex: -4 }}></div>
      <div className="absolute top-[40%] right-[15%] w-20 h-20 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm transform rotate-45 animate-[float_18s_ease-in-out_1s_infinite] shadow-xl" style={{ zIndex: -4 }}></div>
      
      {/* Decorative lines - lower z-index */}
      <div className="absolute top-[30%] left-[30%] w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-[30deg]" style={{ zIndex: -4 }}></div>
      <div className="absolute bottom-[40%] right-[30%] w-[300px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform -rotate-[20deg]" style={{ zIndex: -4 }}></div>
      
      {/* Border gradient decorative elements - lower z-index */}
      <div className="absolute top-[20%] right-[20%] border-gradient w-16 h-16 rounded-full overflow-hidden animate-spin-slow" style={{ zIndex: -4 }}>
        <div className="border-gradient-content"></div>
      </div>
      <div className="absolute bottom-[20%] left-[35%] border-gradient w-10 h-20 rounded-lg overflow-hidden animate-bounce-slow" style={{ zIndex: -4 }}>
        <div className="border-gradient-content"></div>
      </div>
      
      {/* Style definitions for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
          50% { transform: translateY(-20px) rotate(var(--rotation, 0deg)); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundElements; 