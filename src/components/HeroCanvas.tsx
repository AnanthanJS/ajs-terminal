'use client';

import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only run on devices that prefer motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Mouse tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Particles (Holographic Code Symbols)
    const symbols = ['</>', '{}', '[]', '()', '=>', '::', '...', '&&', '||'];
    const particles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 8,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
      isAccent: Math.random() > 0.8
    }));

    // Cursor trail
    const trails: {x: number, y: number, life: number}[] = [];

    // Grid properties
    let time = 0;

    const render = () => {
      // Smooth mouse follow for perspective shifting
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // --- Draw 3D Grid ---
      ctx.save();
      // Center perspective based on mouse (tilt effect)
      const tiltX = (mouseX - width / 2) * 0.03;
      const tiltY = (mouseY - height / 2) * 0.03;
      
      ctx.translate(width / 2 + tiltX, height / 2 + tiltY);
      
      const gridSpacing = 60;
      const fov = 350;
      const planeY = 150; // The "floor" level relative to center
      
      ctx.lineWidth = 1;

      // Draw Vertical Lines
      for (let x = -1500; x <= 1500; x += gridSpacing) {
        ctx.beginPath();
        for (let z = 10; z < 1000; z += 50) {
          const projectedX = (x * fov) / z;
          const projectedY = (planeY * fov) / z;
          if (z === 10) ctx.moveTo(projectedX, projectedY);
          else ctx.lineTo(projectedX, projectedY);
        }
        // Pulse base color opacity
        const baseOpacity = 0.1 + Math.sin(time * 0.03 + (x*0.01)) * 0.05;
        ctx.strokeStyle = `rgba(191, 95, 255, ${baseOpacity})`;
        ctx.stroke();
      }

      // Draw Horizontal Lines (Moving forward effect)
      const zOffset = (time * 1.5) % gridSpacing;
      for (let z = 10 + zOffset; z < 1000; z += gridSpacing) {
        ctx.beginPath();
        const projectedY = (planeY * fov) / z;
        const projectedStartX = (-1500 * fov) / z;
        const projectedEndX = (1500 * fov) / z;
        
        // Fade out lines in the distance
        const depthOpacity = Math.max(0, 0.25 - (z / 1000));
        ctx.strokeStyle = `rgba(191, 95, 255, ${depthOpacity})`;
        ctx.moveTo(projectedStartX, projectedY);
        ctx.lineTo(projectedEndX, projectedY);
        ctx.stroke();
      }
      ctx.restore();

      // --- Draw Holographic Particles ---
      ctx.font = '12px "Courier New", monospace';
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Subtle Mouse attraction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.x += dx * 0.0005;
          p.y += dy * 0.0005;
        }

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw symbol
        const color = p.isAccent 
          ? `rgba(0, 229, 255, ${p.opacity})` // Cyan
          : `rgba(191, 95, 255, ${p.opacity})`; // Purple

        ctx.fillStyle = color;
        ctx.fillText(p.symbol, p.x, p.y);
      });

      // --- Cursor Trail ---
      // Add new trail particle every few frames if mouse moved
      if (Math.random() > 0.5) {
        trails.push({ x: targetMouseX + (Math.random()-0.5)*10, y: targetMouseY + (Math.random()-0.5)*10, life: 1 });
      }

      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.life -= 0.03;
        if (t.life <= 0) {
          trails.splice(i, 1);
          continue;
        }
        
        const isCyan = i % 2 === 0;
        ctx.fillStyle = isCyan ? `rgba(0, 229, 255, ${t.life * 0.6})` : `rgba(191, 95, 255, ${t.life * 0.6})`;
        ctx.fillRect(t.x, t.y, 2, 2);
      }

      time++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1] opacity-70"
      aria-hidden="true"
    />
  );
}
