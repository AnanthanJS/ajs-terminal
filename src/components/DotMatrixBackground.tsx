'use client';

import { useEffect, useRef } from 'react';

export default function DotMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Mouse interaction state
    let mouseX = -100;
    let mouseY = -100;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Grid configuration
    const spacing = 20;
    const dotRadius = 1.5;
    
    // Pixel Sprites configuration
    interface Sprite {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
    }
    const sprites: Sprite[] = [];
    
    // Particle click burst
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;
    }
    const particles: Particle[] = [];

    // Floating Code Symbols
    interface CodeSymbol {
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;
    }
    const codeSymbols: CodeSymbol[] = [];
    const SYMBOLS = ['</>', '{}', '[]', '()', '=>', '||', '&&', ';;', '=='];

    // Initialize some symbols
    for (let i = 0; i < 15; i++) {
      codeSymbols.push({
        x: Math.random() * width,
        y: Math.random() * height,
        text: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.1 + 0.05
      });
    }

    const handleClick = (e: MouseEvent) => {
      const colors = ['#bf5fff', '#00d4ff', '#00ff88', '#e8e8e8'];
      // Explosion physics with drag
      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2; // High initial speed
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() > 0.8 ? 6 : 3,
        });
      }
    };
    window.addEventListener('click', handleClick);

    // Randomly spawn sprites
    const spawnSprite = () => {
      if (sprites.length < 8 && Math.random() > 0.96) {
        sprites.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.floor(Math.random() * 3) * 4 + 4, // 4px, 8px, or 12px
          life: 0,
          maxLife: Math.random() * 200 + 100
        });
      }
    };

    const drawGrid = () => {
      // Fetch dynamic CSS variables for theme-aware colors
      const computedStyle = getComputedStyle(document.documentElement);
      const rawAccent = computedStyle.getPropertyValue('--accent-glow').trim();
      const dotColor = rawAccent || 'rgba(191, 95, 255, 0.35)';

      ctx.clearRect(0, 0, width, height);
      
      // 1. Draw static grid with mouse repulsion
      ctx.fillStyle = dotColor;
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let offsetX = 0;
          let offsetY = 0;
          let sizeMultiplier = 1;
          let opacity = 0.15; // base faint dots
          
          // Mouse interaction (repel and glow)
          if (dist < 150) {
            const force = (150 - dist) / 150;
            // Spring-like repulsion curve
            const easeForce = Math.pow(force, 1.5);
            offsetX = (dx / dist) * easeForce * 15;
            offsetY = (dy / dist) * easeForce * 15;
            sizeMultiplier = 1 + force * 2;
            opacity = 0.15 + force * 0.5;
          }
          
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, dotRadius * sizeMultiplier, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // 2. Draw floating code symbols
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      for (const sym of codeSymbols) {
        sym.y -= sym.speed;
        if (sym.y < -20) {
          sym.y = height + 20;
          sym.x = Math.random() * width;
        }
        ctx.globalAlpha = sym.opacity;
        ctx.fillStyle = dotColor;
        ctx.fillText(sym.text, sym.x, sym.y);
      }

      ctx.globalAlpha = 1;
      
      // 3. Update and draw wandering sprites
      spawnSprite();
      for (let i = sprites.length - 1; i >= 0; i--) {
        const s = sprites[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        
        // Wrap around
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;
        
        // Fade in/out
        const fade = s.life < 20 ? s.life / 20 : (s.maxLife - s.life < 20 ? (s.maxLife - s.life) / 20 : 1);
        ctx.fillStyle = `rgba(191, 95, 255, ${fade * 0.6})`;
        ctx.fillRect(s.x, s.y, s.size, s.size);
        
        if (s.life >= s.maxLife) sprites.splice(i, 1);
      }
      
      // 4. Update and draw burst particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        // Apply friction/drag
        p.vx *= 0.92;
        p.vy *= 0.92;
        
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(p.x, p.y, p.size, p.size);
        
        if (p.life <= 0) particles.splice(i, 1);
      }
      ctx.globalAlpha = 1;
    };

    let animationFrameId: number;
    const render = () => {
      drawGrid();
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
