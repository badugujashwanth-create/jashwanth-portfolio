"use client";

import { Line, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { Color, MathUtils } from "three";

import { particleCountFor, type RenderQuality } from "@/lib/capability";

interface SceneProps {
  quality: Exclude<RenderQuality, "static">;
  paused: boolean;
}

const signatures = ["rules", "neural", "streams", "trajectory", "pulse", "migration"];

function Network({ quality, paused }: SceneProps) {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const pointer = useThree((state) => state.pointer);
  const invalidate = useThree((state) => state.invalidate);
  const count = particleCountFor(quality);

  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const band = index % signatures.length;
        const angle = (index / count) * Math.PI * 2 * 3.2;
        const radius = 1.15 + band * 0.22 + Math.sin(index * 1.7) * 0.12;
        return [
          Math.cos(angle) * radius,
          Math.sin(index * 0.63) * 1.45,
          Math.sin(angle) * radius - band * 0.13
        ] as [number, number, number];
      }),
    [count]
  );

  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden) invalidate();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [invalidate]);

  useFrame((state, delta) => {
    if (!group.current || !core.current || paused || document.hidden) return;
    group.current.rotation.y += delta * 0.045;
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, pointer.y * 0.09, 0.035);
    group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, pointer.x * -0.06, 0.035);
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.04;
    core.current.scale.setScalar(pulse);
  });

  const colors = ["#7c5cff", "#00c2a8", "#ff6b6b", "#f6c945", "#ff4d8d", "#4e7cff"];
  const lineNodes = nodes.filter((_, index) => index % Math.max(3, Math.floor(count / 18)) === 0);

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.72, quality === "high" ? 2 : 1]} />
        <meshPhysicalMaterial
          color="#0e1730"
          emissive="#39247e"
          emissiveIntensity={0.5}
          roughness={0.18}
          metalness={0.22}
          transmission={0.2}
          transparent
          opacity={0.92}
        />
      </mesh>
      {nodes.map((position, index) => (
        <mesh key={`${position.join("-")}-${index}`} position={position}>
          <sphereGeometry args={[index % 7 === 0 ? 0.055 : 0.026, 8, 8]} />
          <meshBasicMaterial color={new Color(colors[index % colors.length])} toneMapped={false} />
        </mesh>
      ))}
      {lineNodes.map((position, index) => (
        <Line
          key={`line-${index}`}
          points={[[0, 0, 0], position]}
          color={colors[index % colors.length]}
          transparent
          opacity={0.35}
          lineWidth={quality === "high" ? 1 : 0.6}
        />
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.65, 0.012, 8, quality === "high" ? 160 : 80]} />
        <meshBasicMaterial color="#8aa4d6" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

export default function SystemsScene({ quality, paused }: SceneProps) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={quality === "high" ? [1, 1.6] : [1, 1.25]}
      frameloop={paused ? "demand" : "always"}
      gl={{ antialias: quality !== "low", alpha: true, powerPreference: "high-performance" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 6.8]} fov={42} />
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 2, 4]} color="#7c5cff" intensity={18} distance={10} />
      <pointLight position={[-3, -2, 3]} color="#00c2a8" intensity={12} distance={9} />
      <Network quality={quality} paused={paused} />
    </Canvas>
  );
}
