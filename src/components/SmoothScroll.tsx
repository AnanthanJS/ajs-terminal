'use client';

import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  // We only want smooth scroll on non-touch devices
  const [isTouch, setIsTouch] = useState(true);
  
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
      setWindowHeight(window.innerHeight);
    };
    
    // ResizeObserver for dynamic content changes
    const observer = new ResizeObserver(() => {
      handleResize();
    });
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    handleResize();
    
    return () => observer.disconnect();
  }, [children, isTouch]);

  const { scrollY } = useScroll();
  
  // Custom cubic bezier easing via physics
  const smoothY = useSpring(scrollY, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
    restDelta: 0.001
  });

  const y = useTransform(smoothY, (value) => -value);

  // If touch device or prefers reduced motion, fallback to normal scrolling
  if (isTouch) {
    return <>{children}</>;
  }

  return (
    <>
      <div style={{ height: contentHeight }} />
      <motion.div
        ref={contentRef}
        style={{
          y,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          willChange: 'transform',
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  );
}
