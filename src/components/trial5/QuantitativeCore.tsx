import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const QuantitativeCore: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeMetric, setActiveMetric] = useState<number>(0);

  const metrics = [
    { label: 'EIGENVALUE λ₁', value: '0.9842', sub: 'Principal Variance' },
    { label: 'VOLATILITY σ', value: '1.24%', sub: '30D Moving Window' },
    { label: 'VECTOR EMBEDDING', value: '512-D', sub: 'Cosine Metric: 0.97' },
    { label: 'QUERY LATENCY', value: '11.8ms', sub: 'MongoDB Atlas Ping' },
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Core 3D Geometry: Futuristic Wireframe Icosahedron & Inner Data Kernel
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer crystalline wireframe
    const outerGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00d9c0,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Inner glowing geometric kernel
    const innerGeo = new THREE.OctahedronGeometry(0.85, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x4facfe,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Orbiting data vertices
    const particleCount = 140;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.9 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.035,
      transparent: true,
      opacity: 0.8,
    });
    const particleCloud = new THREE.Points(particlesGeo, particlesMat);
    coreGroup.add(particleCloud);

    // Orbiting equatorial ring
    const ringGeo = new THREE.RingGeometry(1.9, 1.92, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00d9c0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);

    // 3. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - width / 2;
      const y = event.clientY - rect.top - height / 2;
      mouseX = x * 0.003;
      mouseY = y * 0.003;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 4. Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped rotation towards cursor
      targetRotationY += (mouseX - targetRotationY) * 0.05;
      targetRotationX += (mouseY - targetRotationX) * 0.05;

      coreGroup.rotation.y = elapsedTime * 0.35 + targetRotationY;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2 + targetRotationX;

      // Pulse inner kernel
      const scale = 1 + Math.sin(elapsedTime * 2.2) * 0.06;
      innerMesh.scale.set(scale, scale, scale);
      innerMesh.rotation.y -= 0.01;
      innerMesh.rotation.z += 0.008;

      ringMesh.rotation.z = elapsedTime * 0.15;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerGeo.dispose();
      innerGeo.dispose();
      particlesGeo.dispose();
      ringGeo.dispose();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center group">
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] cursor-grab active:cursor-grabbing transition-transform duration-500 group-hover:scale-105"
      />

      {/* Floating Interactive Metric Badge */}
      <div className="absolute -bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-[340px]">
        <div className="rounded-xl border border-white/[0.08] bg-[#0c0e12]/80 backdrop-blur-md p-3 shadow-2xl transition-all duration-300 hover:border-[#00D9C0]/40">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#00D9C0] mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9C0] animate-pulse" />
              QUANTITATIVE CORE ACTIVE
            </span>
            <span className="text-white/40">3D TENSOR</span>
          </div>

          <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-white/[0.06]">
            <div>
              <p className="text-xs text-white/50 font-mono">{metrics[activeMetric].label}</p>
              <p className="text-lg font-bold text-white tracking-tight font-mono">
                {metrics[activeMetric].value}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/40">{metrics[activeMetric].sub}</p>
              <button
                onClick={() => setActiveMetric((prev) => (prev + 1) % metrics.length)}
                className="mt-1 text-[10px] font-mono text-[#00D9C0] hover:text-white transition-colors underline underline-offset-2 cursor-pointer"
              >
                Next Vector ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
