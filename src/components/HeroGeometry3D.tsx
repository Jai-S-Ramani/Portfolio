import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { Box } from 'lucide-react';

type GeometryType = 'torusKnot' | 'icosahedron' | 'octahedron';

export const HeroGeometry3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [geomType, setGeomType] = useState<GeometryType>('torusKnot');
  const [wireframeOnly, setWireframeOnly] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const wireMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const lightsRef = useRef<THREE.PointLight[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(new THREE.Color(theme.accent), 4.5, 50);
    pointLight1.position.set(4, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(new THREE.Color(theme.accentLight), 3, 50);
    pointLight2.position.set(-4, -3, -2);
    scene.add(pointLight2);

    lightsRef.current = [pointLight1, pointLight2];

    const meshGroup = new THREE.Group();
    meshGroupRef.current = meshGroup;
    scene.add(meshGroup);

    const createGeom = (type: GeometryType): THREE.BufferGeometry => {
      switch (type) {
        case 'torusKnot':
          return new THREE.TorusKnotGeometry(1.05, 0.32, 120, 24, 2, 3);
        case 'icosahedron':
          return new THREE.IcosahedronGeometry(1.4, 1);
        case 'octahedron':
          return new THREE.OctahedronGeometry(1.5, 0);
      }
    };

    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x070c10,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: false,
      transparent: true,
      opacity: wireframeOnly ? 0 : 0.88,
    });
    materialRef.current = solidMat;

    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(theme.accent),
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    wireMaterialRef.current = wireMat;

    const baseGeom = createGeom(geomType);
    const solidMesh = new THREE.Mesh(baseGeom, solidMat);
    const wireMesh = new THREE.Mesh(baseGeom, wireMat);
    meshGroup.add(solidMesh);
    meshGroup.add(wireMesh);

    // Orbital particles
    const particleCount = 70;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + Math.random() * 0.8;
      particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = r * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(theme.accentLight),
      size: 0.04,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.4;
      mouseY = y * 0.4;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        targetRotationY += 0.006;
        targetRotationX = Math.sin(elapsed * 0.5) * 0.15;
      }

      meshGroup.rotation.y += (targetRotationY + mouseX - meshGroup.rotation.y) * 0.05;
      meshGroup.rotation.x += (targetRotationX - mouseY - meshGroup.rotation.x) * 0.05;

      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = Math.sin(elapsed * 0.03) * 0.2;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      baseGeom.dispose();
      solidMat.dispose();
      wireMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [geomType, wireframeOnly, theme.accent, theme.accentLight]);

  useEffect(() => {
    if (wireMaterialRef.current) {
      wireMaterialRef.current.color.set(theme.accent);
    }
    if (particlesRef.current) {
      (particlesRef.current.material as THREE.PointsMaterial).color.set(theme.accentLight);
    }
    if (lightsRef.current[0]) {
      lightsRef.current[0].color.set(theme.accent);
    }
    if (lightsRef.current[1]) {
      lightsRef.current[1].color.set(theme.accentLight);
    }
  }, [theme]);

  return (
    <div className="relative w-full h-[380px] sm:h-[430px] lg:h-[460px] flex items-center justify-center select-none">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Geometry Controls */}
      <div className="absolute bottom-2 flex items-center gap-1.5 p-1 rounded-xl bg-[#030B0D]/80 border border-white/10 backdrop-blur-md">
        {(['torusKnot', 'icosahedron', 'octahedron'] as GeometryType[]).map((type) => (
          <button
            key={type}
            onClick={() => setGeomType(type)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
              geomType === type
                ? 'bg-white/20 text-white font-medium shadow-sm'
                : 'text-[#557477] hover:text-white'
            }`}
          >
            {type === 'torusKnot' ? 'Knot' : type === 'icosahedron' ? 'Crystal' : 'Prism'}
          </button>
        ))}

        <div className="w-[1px] h-3.5 bg-white/15 mx-0.5" />

        <button
          onClick={() => setWireframeOnly(!wireframeOnly)}
          className={`px-2 py-1 rounded-lg text-xs font-mono transition-colors flex items-center gap-1 ${
            wireframeOnly ? 'text-white bg-white/20' : 'text-[#557477] hover:text-white'
          }`}
          title="Toggle wireframe mode"
        >
          <Box className="w-3 h-3" />
          <span>Wire</span>
        </button>
      </div>
    </div>
  );
};

