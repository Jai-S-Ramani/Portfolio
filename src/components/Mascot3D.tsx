import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Hand, Smile, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

type MascotMood = 'friendly' | 'analytical' | 'hyper';

export const Mascot3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const [mood, setMood] = useState<MascotMood>('friendly');
  const [isWaving, setIsWaving] = useState(false);
  const [mascotStatus, setMascotStatus] = useState('SYSTEM ONLINE // AERO-AI');

  const emissiveMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const lightsRef = useRef<THREE.PointLight[]>([]);
  const triggerWaveRef = useRef<() => void>(() => {});
  const triggerSpinRef = useRef<() => void>(() => {});
  const setMoodRef = useRef<(m: MascotMood) => void>(() => {});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 5.0);

    // 2. High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-3, 1, 2);
    scene.add(fillLight);

    const themeLight = new THREE.PointLight(new THREE.Color(theme.accent), 4.2, 25);
    themeLight.position.set(0, 0.5, 2.2);
    scene.add(themeLight);

    const underglowLight = new THREE.PointLight(new THREE.Color(theme.accentLight), 3.0, 15);
    underglowLight.position.set(0, -1.8, 1);
    scene.add(underglowLight);

    lightsRef.current = [themeLight, underglowLight];

    // 4. Materials
    const whiteShellMat = new THREE.MeshStandardMaterial({
      color: 0xf0f4f8,
      metalness: 0.15,
      roughness: 0.22,
    });

    const darkArmorMat = new THREE.MeshStandardMaterial({
      color: 0x070c10,
      metalness: 0.85,
      roughness: 0.15,
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x030608,
      metalness: 0.95,
      roughness: 0.05,
    });

    const glowColor = new THREE.Color(theme.accent);
    const glowMat = new THREE.MeshStandardMaterial({
      color: glowColor,
      emissive: glowColor,
      emissiveIntensity: 2.8,
      roughness: 0.1,
    });

    const glowLightMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(theme.accentLight),
      emissive: new THREE.Color(theme.accentLight),
      emissiveIntensity: 2.2,
      roughness: 0.1,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x7a828e,
      metalness: 0.92,
      roughness: 0.18,
    });

    emissiveMaterialsRef.current = [glowMat, glowLightMat];

    // 5. Build Mascot Hierarchy
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const floatGroup = new THREE.Group();
    rootGroup.add(floatGroup);

    // ---- A. HEAD & VISOR GROUP ----
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.45, 0);
    floatGroup.add(headGroup);

    // Helmet Outer Shell
    const helmetGeom = new THREE.SphereGeometry(0.82, 36, 36);
    const helmet = new THREE.Mesh(helmetGeom, whiteShellMat);
    helmet.scale.set(1.05, 1.0, 1.02);
    headGroup.add(helmet);

    // Helmet collar
    const collarGeom = new THREE.TorusGeometry(0.62, 0.06, 16, 36);
    const collar = new THREE.Mesh(collarGeom, darkArmorMat);
    collar.position.set(0, -0.62, 0);
    collar.rotation.x = Math.PI / 2;
    headGroup.add(collar);

    // Back Coverplate
    const backCoverGeom = new THREE.SphereGeometry(0.83, 36, 36, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55);
    const backCover = new THREE.Mesh(backCoverGeom, darkArmorMat);
    backCover.scale.set(1.06, 1.01, 1.03);
    headGroup.add(backCover);

    // Visor Curved Face Shield (Front +Z facing)
    const visorGeom = new THREE.SphereGeometry(0.80, 36, 36, -Math.PI * 0.42, Math.PI * 0.84, Math.PI * 0.22, Math.PI * 0.52);
    const visor = new THREE.Mesh(visorGeom, visorMat);
    visor.position.set(0, 0.02, 0.06);
    headGroup.add(visor);

    // Digital Eyes Group
    const eyesGroup = new THREE.Group();
    headGroup.add(eyesGroup);

    // Left Eye Capsule
    const eyeGeom = new THREE.CapsuleGeometry(0.085, 0.14, 16, 24);
    const leftEye = new THREE.Mesh(eyeGeom, glowMat);
    leftEye.position.set(-0.25, 0.08, 0.78);
    leftEye.rotation.y = -0.22;
    eyesGroup.add(leftEye);

    // Right Eye Capsule
    const rightEye = new THREE.Mesh(eyeGeom, glowMat);
    rightEye.position.set(0.25, 0.08, 0.78);
    rightEye.rotation.y = 0.22;
    eyesGroup.add(rightEye);

    // Cute Cheeks Blushing Nodes
    const cheekGeom = new THREE.CapsuleGeometry(0.035, 0.08, 12, 16);
    const leftCheek = new THREE.Mesh(cheekGeom, glowLightMat);
    leftCheek.position.set(-0.38, -0.12, 0.70);
    leftCheek.rotation.z = Math.PI / 2;
    leftCheek.rotation.y = -0.35;
    eyesGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeom, glowLightMat);
    rightCheek.position.set(0.38, -0.12, 0.70);
    rightCheek.rotation.z = Math.PI / 2;
    rightCheek.rotation.y = 0.35;
    eyesGroup.add(rightCheek);

    // Analytical Mode HUD Line
    const hudBarGeom = new THREE.BoxGeometry(0.65, 0.025, 0.03);
    const hudBar = new THREE.Mesh(hudBarGeom, glowLightMat);
    hudBar.position.set(0, -0.20, 0.78);
    hudBar.visible = false;
    eyesGroup.add(hudBar);

    // Side Headphones (Left & Right Ears)
    const earGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.16, 32);
    const earRingGeom = new THREE.TorusGeometry(0.21, 0.03, 16, 32);

    const leftEar = new THREE.Mesh(earGeom, darkArmorMat);
    leftEar.position.set(-0.88, 0.04, 0);
    leftEar.rotation.z = Math.PI / 2;
    headGroup.add(leftEar);

    const leftEarRing = new THREE.Mesh(earRingGeom, glowMat);
    leftEarRing.position.set(-0.97, 0.04, 0);
    leftEarRing.rotation.y = Math.PI / 2;
    headGroup.add(leftEarRing);

    const rightEar = new THREE.Mesh(earGeom, darkArmorMat);
    rightEar.position.set(0.88, 0.04, 0);
    rightEar.rotation.z = Math.PI / 2;
    headGroup.add(rightEar);

    const rightEarRing = new THREE.Mesh(earRingGeom, glowMat);
    rightEarRing.position.set(0.97, 0.04, 0);
    rightEarRing.rotation.y = Math.PI / 2;
    headGroup.add(rightEarRing);

    // Top Antenna
    const antennaStemGeom = new THREE.CylinderGeometry(0.02, 0.03, 0.34, 16);
    const antennaStem = new THREE.Mesh(antennaStemGeom, chromeMat);
    antennaStem.position.set(0, 0.98, -0.04);
    headGroup.add(antennaStem);

    const antennaTipGeom = new THREE.SphereGeometry(0.08, 24, 24);
    const antennaTip = new THREE.Mesh(antennaTipGeom, glowLightMat);
    antennaTip.position.set(0, 1.16, -0.04);
    headGroup.add(antennaTip);

    // ---- B. BODY / TORSO GROUP ----
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(0, -0.62, 0);
    floatGroup.add(bodyGroup);

    const torsoGeom = new THREE.SphereGeometry(0.64, 36, 36);
    const torso = new THREE.Mesh(torsoGeom, whiteShellMat);
    torso.scale.set(0.95, 1.14, 0.9);
    bodyGroup.add(torso);

    const torsoArmorGeom = new THREE.CylinderGeometry(0.54, 0.44, 0.72, 32, 1, true);
    const torsoArmor = new THREE.Mesh(torsoArmorGeom, darkArmorMat);
    torsoArmor.position.set(0, -0.04, 0);
    bodyGroup.add(torsoArmor);

    // Chest Arc Reactor Core
    const coreRingGeom = new THREE.TorusGeometry(0.18, 0.035, 16, 32);
    const coreRing = new THREE.Mesh(coreRingGeom, chromeMat);
    coreRing.position.set(0, 0.14, 0.55);
    bodyGroup.add(coreRing);

    const coreCrystalGeom = new THREE.SphereGeometry(0.11, 24, 24);
    const coreCrystal = new THREE.Mesh(coreCrystalGeom, glowMat);
    coreCrystal.position.set(0, 0.14, 0.54);
    bodyGroup.add(coreCrystal);

    // Propulsion Nozzle
    const thrusterGeom = new THREE.CylinderGeometry(0.24, 0.14, 0.28, 24);
    const thruster = new THREE.Mesh(thrusterGeom, darkArmorMat);
    thruster.position.set(0, -0.66, 0);
    bodyGroup.add(thruster);

    const plasmaGeom = new THREE.TorusGeometry(0.18, 0.04, 16, 32);
    const plasma = new THREE.Mesh(plasmaGeom, glowMat);
    plasma.position.set(0, -0.80, 0);
    plasma.rotation.x = Math.PI / 2;
    bodyGroup.add(plasma);

    // ---- C. FLOATING HANDS ----
    const handGeom = new THREE.SphereGeometry(0.18, 24, 24);

    const leftHandGroup = new THREE.Group();
    leftHandGroup.position.set(-0.95, -0.40, 0.2);
    floatGroup.add(leftHandGroup);

    const leftHand = new THREE.Mesh(handGeom, whiteShellMat);
    leftHand.scale.set(0.85, 1.1, 0.9);
    leftHandGroup.add(leftHand);

    const leftHandCuff = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.025, 16, 24), glowMat);
    leftHandCuff.rotation.x = Math.PI / 2;
    leftHandGroup.add(leftHandCuff);

    const rightHandGroup = new THREE.Group();
    rightHandGroup.position.set(0.95, -0.40, 0.2);
    floatGroup.add(rightHandGroup);

    const rightHand = new THREE.Mesh(handGeom, whiteShellMat);
    rightHand.scale.set(0.85, 1.1, 0.9);
    rightHandGroup.add(rightHand);

    const rightHandCuff = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.025, 16, 24), glowMat);
    rightHandCuff.rotation.x = Math.PI / 2;
    rightHandGroup.add(rightHandCuff);

    // ---- D. ORBITAL HOLO-RING ----
    const orbitRingGeom = new THREE.TorusGeometry(1.48, 0.015, 16, 64);
    const orbitRing = new THREE.Mesh(orbitRingGeom, glowLightMat);
    orbitRing.rotation.x = Math.PI * 0.35;
    orbitRing.rotation.y = Math.PI * 0.15;
    floatGroup.add(orbitRing);

    const satelliteGeom = new THREE.OctahedronGeometry(0.08, 0);
    const satellite = new THREE.Mesh(satelliteGeom, glowMat);
    orbitRing.add(satellite);

    // Ambient floating sparks
    const particleCount = 40;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 4.2;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.0;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(theme.accent),
      size: 0.045,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // ---- 6. ANIMATION & INTERACTION STATE ----
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    let isSpinning = false;
    let spinTimer = 0;
    const SPIN_DURATION = 0.95;

    let isWavingActive = false;
    let waveStartTime = 0;

    let blinkProgress = 0;
    let nextBlinkTime = 2.5;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = THREE.MathUtils.clamp(nx, -1, 1);
      targetMouseY = THREE.MathUtils.clamp(ny, -1, 1);
    };

    const onMouseEnter = () => {
      setMascotStatus('TARGET ACQUIRED // TRACKING CURSOR');
    };

    const onMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
      setMascotStatus('IDLE TELEMETRY // AERO-AI READY');
    };

    const triggerSpin = () => {
      if (isSpinning) return;
      isSpinning = true;
      spinTimer = 0;
      triggerWave();
    };

    const triggerWave = () => {
      isWavingActive = true;
      setIsWaving(true);
      waveStartTime = performance.now();
      setMascotStatus('HELLO WORLD // GREETING ACTIVATED');

      try {
        const rect = container.getBoundingClientRect();
        confetti({
          particleCount: 30,
          spread: 60,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
          colors: [theme.accent, theme.accentLight, '#ffffff'],
          disableForReducedMotion: true,
        });
      } catch {
        // safe
      }

      setTimeout(() => {
        isWavingActive = false;
        setIsWaving(false);
        setMascotStatus('SYSTEM ONLINE // AERO-AI');
      }, 2400);
    };

    triggerWaveRef.current = triggerWave;
    triggerSpinRef.current = triggerSpin;

    setMoodRef.current = (newMood: MascotMood) => {
      if (newMood === 'analytical') {
        hudBar.visible = true;
        leftCheek.visible = false;
        rightCheek.visible = false;
        leftEye.scale.set(0.9, 0.4, 1);
        rightEye.scale.set(0.9, 0.4, 1);
      } else if (newMood === 'hyper') {
        hudBar.visible = false;
        leftCheek.visible = true;
        rightCheek.visible = true;
        leftEye.scale.set(1.2, 1.2, 1);
        rightEye.scale.set(1.2, 1.2, 1);
      } else {
        hudBar.visible = false;
        leftCheek.visible = true;
        rightCheek.visible = true;
        leftEye.scale.set(1, 1, 1);
        rightEye.scale.set(1, 1, 1);
      }
    };

    const onPointerDown = () => {
      triggerSpin();
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('pointerdown', onPointerDown);

    const onResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // 7. ANIMATION TICK LOOP
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.075;
      mouseY += (targetMouseY - mouseY) * 0.075;

      floatGroup.position.y = Math.sin(elapsed * 2.2) * 0.12;
      floatGroup.rotation.z = Math.sin(elapsed * 1.5) * 0.035;
      floatGroup.rotation.x = Math.sin(elapsed * 1.8) * 0.025;

      headGroup.rotation.y = mouseX * 0.45;
      headGroup.rotation.x = -mouseY * 0.30;
      headGroup.position.x = mouseX * 0.06;

      eyesGroup.position.x = mouseX * 0.04;
      eyesGroup.position.y = mouseY * 0.03;

      bodyGroup.rotation.y = mouseX * 0.18;
      bodyGroup.rotation.x = -mouseY * 0.10;

      leftHandGroup.position.y = -0.40 + Math.sin(elapsed * 2.5 + 1) * 0.07;
      leftHandGroup.rotation.z = Math.sin(elapsed * 1.8) * 0.08;

      if (isWavingActive) {
        const waveTime = (performance.now() - waveStartTime) * 0.001;
        rightHandGroup.position.set(0.92, 0.45 + Math.sin(waveTime * 3) * 0.05, 0.4);
        rightHandGroup.rotation.z = -0.35 + Math.sin(waveTime * 14) * 0.45;
        rightHandGroup.rotation.x = 0.2;
      } else {
        rightHandGroup.position.y = -0.40 + Math.sin(elapsed * 2.5) * 0.07;
        rightHandGroup.position.x = 0.95;
        rightHandGroup.position.z = 0.2;
        rightHandGroup.rotation.z = -Math.sin(elapsed * 1.8) * 0.08;
        rightHandGroup.rotation.x = 0;
      }

      if (elapsed > nextBlinkTime) {
        blinkProgress += 0.28;
        const scaleY = Math.max(0.08, 1 - Math.sin(blinkProgress * Math.PI));
        leftEye.scale.y = scaleY;
        rightEye.scale.y = scaleY;

        if (blinkProgress >= 1) {
          blinkProgress = 0;
          leftEye.scale.y = 1;
          rightEye.scale.y = 1;
          nextBlinkTime = elapsed + 3 + Math.random() * 3.5;
        }
      }

      const corePulse = 2.0 + Math.sin(elapsed * 4.5) * 0.8;
      coreCrystal.scale.setScalar(1 + Math.sin(elapsed * 4.5) * 0.06);
      glowMat.emissiveIntensity = corePulse;

      orbitRing.rotation.z = elapsed * 0.55;
      satellite.position.x = Math.cos(elapsed * 2.2) * 1.48;
      satellite.position.y = Math.sin(elapsed * 2.2) * 1.48;
      satellite.rotation.x = elapsed * 3;
      satellite.rotation.y = elapsed * 3;

      if (isSpinning) {
        spinTimer += delta;
        const progress = Math.min(spinTimer / SPIN_DURATION, 1);
        const ease =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        rootGroup.rotation.y = ease * Math.PI * 2;

        if (progress >= 1) {
          isSpinning = false;
          spinTimer = 0;
          rootGroup.rotation.y = 0;
        }
      } else {
        rootGroup.rotation.y += (0 - rootGroup.rotation.y) * 0.08;
      }

      const posAttr = particleGeom.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let py = posAttr.getY(i) + 0.006;
        if (py > 2.2) py = -2.2;
        posAttr.setY(i, py);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', onResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      helmetGeom.dispose();
      collarGeom.dispose();
      backCoverGeom.dispose();
      visorGeom.dispose();
      eyeGeom.dispose();
      cheekGeom.dispose();
      hudBarGeom.dispose();
      earGeom.dispose();
      earRingGeom.dispose();
      antennaStemGeom.dispose();
      antennaTipGeom.dispose();
      torsoGeom.dispose();
      torsoArmorGeom.dispose();
      coreRingGeom.dispose();
      coreCrystalGeom.dispose();
      thrusterGeom.dispose();
      plasmaGeom.dispose();
      handGeom.dispose();
      orbitRingGeom.dispose();
      satelliteGeom.dispose();
      particleGeom.dispose();

      whiteShellMat.dispose();
      darkArmorMat.dispose();
      visorMat.dispose();
      glowMat.dispose();
      glowLightMat.dispose();
      chromeMat.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [theme.accent, theme.accentLight]);

  useEffect(() => {
    if (emissiveMaterialsRef.current[0]) {
      emissiveMaterialsRef.current[0].color.set(theme.accent);
      emissiveMaterialsRef.current[0].emissive.set(theme.accent);
    }
    if (emissiveMaterialsRef.current[1]) {
      emissiveMaterialsRef.current[1].color.set(theme.accentLight);
      emissiveMaterialsRef.current[1].emissive.set(theme.accentLight);
    }
    if (lightsRef.current[0]) {
      lightsRef.current[0].color.set(theme.accent);
    }
    if (lightsRef.current[1]) {
      lightsRef.current[1].color.set(theme.accentLight);
    }
  }, [theme]);

  return (
    <div className="relative w-full h-[380px] sm:h-[430px] lg:h-[460px] flex flex-col items-center justify-center select-none group">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        title="Click to interact with Aero, your AI Companion!"
      />

      {/* Floating Telemetry Status */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-[#030B0D]/85 border border-white/10 backdrop-blur-md shadow-lg">
        <span
          className="w-1.5 h-1.5 rounded-full animate-ping"
          style={{ backgroundColor: theme.accent }}
        />
        <span className="font-mono text-[10px] tracking-wider text-[#E8F1F2]/80">
          {mascotStatus}
        </span>
      </div>

      {/* Action Controls */}
      <div className="absolute bottom-2 flex items-center gap-2 p-1.5 rounded-2xl bg-[#030B0D]/85 border border-white/10 backdrop-blur-md shadow-xl transition-all duration-200">
        <button
          onClick={() => triggerWaveRef.current()}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
            isWaving
              ? 'text-[#030B0D] shadow-md font-semibold'
              : 'text-[#E8F1F2]/80 hover:text-white hover:bg-white/10'
          }`}
          style={isWaving ? { backgroundColor: theme.accent } : {}}
          title="Make Aero wave"
        >
          <Hand className="w-3.5 h-3.5" />
          <span>Wave</span>
        </button>

        <button
          onClick={() => triggerSpinRef.current()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-[#E8F1F2]/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Make Aero 360 spin"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Spin</span>
        </button>

        <button
          onClick={() => {
            const nextMood: MascotMood =
              mood === 'friendly' ? 'analytical' : mood === 'analytical' ? 'hyper' : 'friendly';
            setMood(nextMood);
            setMoodRef.current(nextMood);
            triggerSpinRef.current();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono text-[#E8F1F2]/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Toggle companion mood"
        >
          {mood === 'friendly' ? (
            <Smile className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
          )}
          <span className="capitalize">{mood}</span>
        </button>
      </div>
    </div>
  );
};

