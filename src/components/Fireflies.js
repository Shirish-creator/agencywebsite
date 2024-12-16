import React, { useMemo, useRef } from "react";
import { Points, PointMaterial } from "@react-three/drei";

export default function Fireflies({
  count = 10000, // Number of fireflies
  range = 10,    // Spread of fireflies in x and y
  zRange = 20,   // Z-axis spread
  size = 50      // Size of fireflies
}) {
  const pointsRef = useRef();

  // Generate fixed positions for fireflies
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3); // x, y, z for each firefly
    let index = 0;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * range * 2; // Spread fireflies in x
      const y = (Math.random() - 0.5) * range * 2; // Spread fireflies in y
      const z = (Math.random() - 0.5) * zRange * 2; // Spread fireflies in z (closer)

      pos[index] = x;     // X position
      pos[index + 1] = y; // Y position
      pos[index + 2] = z; // Z position
      index += 3;
    }
    return pos;
  }, [count, range, zRange]);

  return (
    <Points ref={pointsRef}>
      {/* Set the positions */}
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3} // Each position has 3 components (x, y, z)
        />
      </bufferGeometry>
      {/* Material with glowing effect */}
      <PointMaterial
        color="#ffffff" // White glowing fireflies
        transparent
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={1}
      />
    </Points>
  );
}
