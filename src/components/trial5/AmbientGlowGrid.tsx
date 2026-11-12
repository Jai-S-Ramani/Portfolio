import React, { useEffect, useRef } from 'react';

export const AmbientGlowGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth damping
    let mouseX = width / 2;
    let mouseY = height / 3;
    let targetX = mouseX;
    let targetY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY + window.scrollY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Grid properties
    const dotSpacing = 36;
    const baseDotRadius = 1;

    // Ambient floating particles
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.6,
      alpha: Math.random() * 0.35 + 0.1,
    }));

    const render = () => {
      // Damped mouse follow
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Radial Mouse Spotlight (Cardova Soft Sage & Forest Glow)
      const relativeMouseY = mouseY - window.scrollY;
      const gradient = ctx.createRadialGradient(
        mouseX,
        relativeMouseY,
        0,
        mouseX,
        relativeMouseY,
        480
      );
      gradient.addColorStop(0, 'rgba(163, 184, 153, 0.12)');
      gradient.addColorStop(0.45, 'rgba(52, 211, 153, 0.04)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Micro-Dot Matrix (only visible near spotlight and slightly in background)
      const scrollYOffset = window.scrollY % dotSpacing;
      const startY = -scrollYOffset;

      for (let x = 0; x < width; x += dotSpacing) {
        for (let y = startY; y < height; y += dotSpacing) {
          const dx = x - mouseX;
          const dy = y - relativeMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Dot intensity scales with proximity to mouse cursor
          let alpha = 0.045; // baseline barely visible
          let radius = baseDotRadius;

          if (dist < 320) {
            const proximity = 1 - dist / 320;
            alpha += proximity * 0.28;
            radius += proximity * 0.8;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(210, 222, 200, ${alpha})`;
          ctx.fill();
        }
      }

      // 3. Ambient Floating Celestial Micro-Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 192, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ willChange: 'transform' }}
    />
  );
};

