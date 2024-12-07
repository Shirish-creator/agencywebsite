import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'


export function Camera(props) {
  const { nodes } = useGLTF('/models/camera.glb')
  const cameraGroupRef = useRef();

  // Set up a basic color for the MeshBasicMaterial
  const basicMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,     // Black color
    metalness: 0.5,      // Control metalness (0 = non-metal, 1 = fully metallic)
    roughness: 0.3    // Control roughness (0 = smooth, 1 = rough)
  });

  useEffect(() => {
    // GSAP animation to move the camera up and down
    gsap.to(cameraGroupRef.current.position, {
      y: -2,               // Move up by 2 units
      duration: 2,        // Duration of the upward movement
      yoyo: true,         // Make it go back to the original position
      repeat: -1,         // Infinite loop
      ease: 'power1.inOut' // Smooth easing for the animation
    });
  }, []);
  return (
    <group {...props} dispose={null}>
      <group ref={cameraGroupRef} rotation={[-Math.PI / 2, 0, 0.06]} position={[0, -2.5, 20]} scale={1.2}>
        <group rotation={[Math.PI / 3, -1.2, -0.8]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_1.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_2.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_3.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_4.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_5.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_6.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_7.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_8.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_9.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_10.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_11.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_12.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_13.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_14.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_15.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_16.geometry} material={basicMaterial} />
          <mesh geometry={nodes.defaultMaterial_17.geometry} material={basicMaterial} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/camera.glb')
