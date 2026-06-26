import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { Earth } from "./Earth";
import { Markers } from "./Markers";
import { Routes } from "./Routes";
import { Satellites } from "./Satellites";
import { Nebula } from "./Nebula";

function SpinningEarth({ radius, sunDirection }: { radius: number; sunDirection: THREE.Vector3 }) {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame(({ clock }, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.03;
      const t = clock.elapsedTime;
      groupRef.current.position.y = Math.sin(t * 0.45) * 0.012;
      groupRef.current.position.x = Math.cos(t * 0.3) * 0.008;
    }
  });
  return (
    <group ref={groupRef}>
      <Earth radius={radius} sunDirection={sunDirection} />
      <Routes radius={radius} />
      <Markers radius={radius} />
    </group>
  );
}

function Sun({ sunRef }: { sunRef: React.MutableRefObject<THREE.Vector3> }) {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.04;
    sunRef.current.set(Math.cos(t) * 5, Math.sin(t * 0.3) * 1.5, Math.sin(t) * 5);
    if (lightRef.current) lightRef.current.position.copy(sunRef.current);
  });
  return (
    <>
      <directionalLight ref={lightRef} intensity={1.4} color="#fff5e6" />
      <ambientLight intensity={0.04} color="#1a2a4a" />
      <hemisphereLight args={["#3a5fa8", "#0a0a18", 0.15]} />
    </>
  );
}

export default function GlobeScene() {
  const sunRef = useRef(new THREE.Vector3(5, 1, 3));
  const radius = 1;

  const dpr = useMemo<[number, number]>(() => [1, 1.8], []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0.4, 3.2], fov: 38, near: 0.1, far: 200 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
        powerPreference: "high-performance",
      }}
      style={{ background: "radial-gradient(ellipse at center, #050813 0%, #000005 70%)" }}
    >
      <Suspense fallback={null}>
        <Sun sunRef={sunRef} />
        <Nebula />
        <Stars radius={60} depth={40} count={9000} factor={3.2} saturation={0.2} fade speed={0.4} />
        <Stars radius={30} depth={20} count={3000} factor={1.8} saturation={0} fade speed={0.2} />
        <SpinningEarth radius={radius} sunDirection={sunRef.current} />
        <Satellites count={120} radius={radius} />
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.5}
          zoomSpeed={0.6}
          minDistance={1.6}
          maxDistance={6}
          autoRotate
          autoRotateSpeed={0.25}
        />
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={1.2} luminanceThreshold={0.25} luminanceSmoothing={0.3} radius={0.85} />
          <Vignette eskil={false} offset={0.15} darkness={0.85} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
