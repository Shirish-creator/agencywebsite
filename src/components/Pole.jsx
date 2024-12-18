import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import GSAP from 'gsap';

export function Pole({ buttonTrigger, ...props }) {
  const { nodes } = useGLTF('/pole.glb');
  const meshRef = useRef();
  const materialRef = useRef(); // Ref for material

  // Store the current intensity based on buttonTrigger
  const targetIntensity = buttonTrigger ? 4 : 2;

  // Animate Bloom on state change using GSAP for smooth transitions
  useFrame(() => {
    if (materialRef.current) {
      meshRef.current.material = materialRef.current;
    }
  }, [buttonTrigger]);

  // Smoothly transition emissiveIntensity based on buttonTrigger
  useEffect(() => {
    if (meshRef.current) {
      GSAP.to(meshRef.current.material, {
        emissiveIntensity: targetIntensity, // Transition intensity
        duration: 1.5, // Duration of the transition
        ease: 'power2.out', // Ease type for smooth transition
      });
    }
  }, [buttonTrigger, targetIntensity]); // Trigger this effect when buttonTrigger changes

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={nodes.Pole.geometry}
        material={meshRef.current?.material || new THREE.MeshStandardMaterial({
          color: 0xffffff, // Base color of the material
          emissive: 0x6bd2ff, // Teal emissive color
          emissiveIntensity: 2, // Default emissive intensity (normal)
          roughness: 2, // Slight roughness for realistic reflections
          metalness: 1, // Make the material slightly metallic
        })}
        scale={[0.2, 3.2, 2.5]}
        position={[0, -3.9, 5]}
        rotation={[0, -Math.PI / 2, 0]}
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload('/pole.glb');
