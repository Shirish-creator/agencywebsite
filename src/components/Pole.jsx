import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import GSAP from 'gsap';
import { TextureLoader } from "three"
import { useLoader } from "@react-three/fiber"

export function Pole(props) {
  const { nodes } = useGLTF('/pole.glb');
  const meshRef = useRef();
  const materialRef = useRef(); // Ref for material

  // Create a custom emissive material
  const emissiveMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff, // Base color of the material
    emissive: 0x6bd2ff, // Teal emissive color
    emissiveIntensity: 2, // Default emissive intensity
    roughness: 2, // Slight roughness for realistic reflections
    metalness: 1, // Make the material slightly metallic
  });

  // Attach the material to the mesh
  useFrame(() => {
    if (materialRef.current) {
      meshRef.current.material = materialRef.current;
    }
  });

  // Handle hover events
  const handlePointerOver = () => {
    if (meshRef.current) {
      GSAP.to(meshRef.current.material, {
        emissiveIntensity: 3.5, // Increase intensity on hover
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  };

  const handlePointerOut = () => {
    if (meshRef.current) {
      GSAP.to(meshRef.current.material, {
        emissiveIntensity: 3, // Reset intensity when hover ends
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };



  return (
    <group {...props} dispose={null}>
    
   
      <mesh
        ref={meshRef}
        geometry={nodes.Pole.geometry}
        material={emissiveMaterial} // Apply the emissive material
        scale={[0.2, 3.2, 2.5]}
        position={[0, -3.9,5]}
        rotation={[0, -Math.PI / 2, 0]}
        castShadow
        receiveShadow
        // onPointerOver={handlePointerOver} // Trigger hover effect
        // onPointerOut={handlePointerOut} // Reset on hover end
      />
    </group>
  );
}

useGLTF.preload('/pole.glb');
