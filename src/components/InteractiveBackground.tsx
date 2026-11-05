import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export type BackgroundMode = 'cyber-grid' | 'aurora-nebula' | 'warp-field' | 'hex-matrix';

interface InteractiveBackgroundProps {
  currentMode?: BackgroundMode;
  onModeChange?: (mode: BackgroundMode) => void;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  currentMode = 'cyber-grid',
}) => {
  const activeMode = currentMode;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  // ==========================================
  // MODE 1: Three.js 3D Cyber Horizon Wave Grid
  // ==========================================
  useEffect(() => {
    if (activeMode !== 'cyber-grid') return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.04);

    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4, 14);
    camera.rotation.x = -0.25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Plane Terrain Geometry
    const width = 80;
    const height = 70;
    const segmentsW = 80;
    const segmentsH = 70;
    const geometry = new THREE.PlaneGeometry(width, height, segmentsW, segmentsH);
    geometry.rotateX(-Math.PI / 2);

    const pos = geometry.attributes.position;
    const count = pos.count;
    const originalY = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      originalY[i] = pos.getY(i);
    }

    // High-contrast neon wireframe
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(theme.accent),
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });

    const terrain = new THREE.Mesh(geometry, material);
    terrain.position.y = -1.5;
    scene.add(terrain);

    // Floating Starlight Particles above grid
    const starCount = 450;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 70;
      starPositions[i + 1] = Math.random() * 18 - 2;
      starPositions[i + 2] = (Math.random() - 0.5) * 60;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(theme.accentLight),
      size: 0.1,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime() * 0.9;

      // Camera responds to mouse
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.04;
      camera.position.y += (4 + mouseY * 1.2 - camera.position.y) * 0.04;
      camera.lookAt(0, -0.2, 0);

      // Undulating Wave Equations
      for (let i = 0; i < count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const wave1 = Math.sin(x * 0.25 + time * 1.8) * Math.cos(z * 0.2 + time);
        const wave2 = Math.sin((x + z) * 0.18 + time * 1.4) * 0.8;
        pos.setY(i, originalY[i] + (wave1 + wave2) * 1.2);
      }
      pos.needsUpdate = true;

      stars.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, [activeMode, theme]);

  // ==========================================
  // MODES 2, 3, 4: High-Performance 2D Canvas
  // ==========================================
  useEffect(() => {
    if (activeMode === 'cyber-grid') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    let mx = width / 2;
    let my = height / 2;
    const handleMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener('mousemove', handleMove);

    // Setup for Mode: Warp Field
    const warpCount = 380;
    const warpStars: Array<{ x: number; y: number; z: number; size: number }> = [];
    for (let i = 0; i < warpCount; i++) {
      warpStars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        size: Math.random() * 2 + 1,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // ----------------------------------------
      // MODE 2: Aurora Nebula (Vibrant & Luminous)
      // ----------------------------------------
      if (activeMode === 'aurora-nebula') {
        // Deep cosmic gradients
        const cx1 = width * 0.35 + Math.sin(time * 0.8) * (width * 0.2);
        const cy1 = height * 0.35 + Math.cos(time) * (height * 0.2);
        const grad1 = ctx.createRadialGradient(cx1, cy1, 20, cx1, cy1, width * 0.65);
        grad1.addColorStop(0, `rgba(${theme.accentRgb}, 0.55)`);
        grad1.addColorStop(0.4, `rgba(${theme.accentRgb}, 0.22)`);
        grad1.addColorStop(1, 'transparent');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        const cx2 = width * 0.7 + Math.cos(time * 0.7) * (width * 0.2);
        const cy2 = height * 0.6 + Math.sin(time * 0.9) * (height * 0.2);
        const grad2 = ctx.createRadialGradient(cx2, cy2, 20, cx2, cy2, width * 0.65);
        grad2.addColorStop(0, 'rgba(168, 85, 247, 0.48)');
        grad2.addColorStop(0.5, 'rgba(99, 102, 241, 0.18)');
        grad2.addColorStop(1, 'transparent');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);

        // Fluid flowing sine aurora ribbons
        for (let r = 0; r < 5; r++) {
          ctx.beginPath();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = `rgba(${theme.accentRgb}, ${0.3 + r * 0.08})`;
          for (let x = 0; x < width; x += 12) {
            const y =
              height * (0.25 + r * 0.14) +
              Math.sin(x * 0.003 + time * 1.8 + r) * 90 +
              Math.cos(x * 0.006 - time * 1.2) * 50;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      // ----------------------------------------
      // MODE 3: Warp Field (Hyperspace with Gravity Streaks)
      // ----------------------------------------
      else if (activeMode === 'warp-field') {
        const halfW = width / 2;
        const halfH = height / 2;
        const speed = 4.5;

        for (let i = 0; i < warpStars.length; i++) {
          const s = warpStars[i];
          const prevZ = s.z;
          s.z -= speed;

          if (s.z <= 0) {
            s.z = width;
            s.x = (Math.random() - 0.5) * width * 2;
            s.y = (Math.random() - 0.5) * height * 2;
          }

          const k = 320 / s.z;
          const prevK = 320 / prevZ;

          const px = s.x * k + halfW + (mx - halfW) * 0.12;
          const py = s.y * k + halfH + (my - halfH) * 0.12;

          const oldPx = s.x * prevK + halfW + (mx - halfW) * 0.12;
          const oldPy = s.y * prevK + halfH + (my - halfH) * 0.12;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            const alpha = Math.min(1, Math.max(0.15, (1 - s.z / width) * 1.4));

            // Draw Warp Trail Streak
            ctx.beginPath();
            ctx.moveTo(oldPx, oldPy);
            ctx.lineTo(px, py);
            ctx.strokeStyle = `rgba(${theme.accentRgb}, ${alpha})`;
            ctx.lineWidth = s.size;
            ctx.stroke();

            // Head Star Point
            ctx.beginPath();
            ctx.arc(px, py, s.size * 0.8, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          }
        }
      }

      // ----------------------------------------
      // MODE 4: Hex Matrix Lattice (Interactive Proximity Grid)
      // ----------------------------------------
      else if (activeMode === 'hex-matrix') {
        const hexRadius = 40;
        const hexHeight = hexRadius * Math.sqrt(3);
        const hexWidth = hexRadius * 2;
        const side = (3 / 2) * hexRadius;

        for (let x = 0; x < width + hexWidth; x += side) {
          for (let y = 0; y < height + hexHeight; y += hexHeight) {
            const row = Math.floor(x / side);
            const cy = row % 2 === 0 ? y : y + hexHeight / 2;

            const dist = Math.hypot(x - mx, cy - my);
            const glow = Math.max(0, 1 - dist / 280);

            if (glow > 0.05) {
              ctx.strokeStyle = `rgba(${theme.accentRgb}, ${0.12 + glow * 0.75})`;
              ctx.lineWidth = 1.2 + glow * 1.5;
            } else {
              ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.12)`;
              ctx.lineWidth = 0.8;
            }

            ctx.beginPath();
            for (let a = 0; a < 6; a++) {
              const angle = (a * Math.PI) / 3;
              const hx = x + hexRadius * 0.72 * Math.cos(angle);
              const hy = cy + hexRadius * 0.72 * Math.sin(angle);
              if (a === 0) ctx.moveTo(hx, hy);
              else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.stroke();

            // Active node center dots on hover
            if (glow > 0.3) {
              ctx.beginPath();
              ctx.arc(x, cy, 2.5 * glow, 0, Math.PI * 2);
              ctx.fillStyle = '#ffffff';
              ctx.fill();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMove);
    };
  }, [activeMode, theme]);

  return (
    <>
      {/* 3D WebGL Canvas for Cyber Grid Mode */}
      {activeMode === 'cyber-grid' && (
        <div
          ref={containerRef}
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        />
      )}

      {/* 2D Canvas for Shader / Warp / Hex Modes */}
      {activeMode !== 'cyber-grid' && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        />
      )}
    </>
  );
};
