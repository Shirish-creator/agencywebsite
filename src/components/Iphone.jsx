import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { MeshReflectorMaterial } from "@react-three/drei"
import { gsap } from 'gsap'

export function Iphone(props) {
  const { nodes } = useGLTF('/models/iphone.glb')
  const iphoneGroupRef = useRef();

  // Create a basic material with roughness and metallic set to 0
  const basicMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,     // Black color
    metalness: 0.5,      // Control metalness (0 = non-metal, 1 = fully metallic)
    roughness: 0.02    // Control roughness (0 = smooth, 1 = rough)
  });

  useEffect(() => {
    // GSAP animation to rotate the iphoneGroup continuously on the Y-axis
    gsap.to(iphoneGroupRef.current.rotation, {
      y: "+=6.28", // Full rotation (2π radians)
      duration: 8, // Time to complete one full rotation
      repeat: -1,   // Infinite loop
      ease: 'linear' // Smooth constant rotation
    });
  }, []);




  return (
    <group  {...props} dispose={null}>
      <group  rotation={[-1.8, 0.3, 5.2]} scale={0.7} position={[0,0,15]}>
        <group ref={iphoneGroupRef} rotation={[Math.PI / 2, 1, 0]}>
          <mesh geometry={nodes.Object_12.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_14.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_16.geometry} material={basicMaterial} />
          {/* <ambientLight 
            position={[0, 0, 10]}  // Position the light above the object (adjust Y for height)
            intensity={0.15}          // Light intensity
            color={0xFFFFFF}       // White light color
            distance={1}          // How far the light reaches
            decay={20}              // Controls how quickly the light fades over distance
          /> */}
          <mesh geometry={nodes.Object_18.geometry} >
          <MeshReflectorMaterial
          metalness={0}
          blur={[0, 20]} // Blur ground reflections (width, height), 0 skips blur
          depthToBlurRatioBias={2.25} // Bias factor for depth-to-blur calculation
          mixStrength={100} // Strength of the reflections
          mixContrast={0.8} // Contrast of the reflections
          roughness={0.14}
          resolution={500}
          mirror={1}
          mixBlur={-0.6} // How much blur mixes with surface roughness
          reflectorOffset={0} // Offset for the virtual camera
          reflectivity={1}

        />
          </mesh>
          <mesh geometry={nodes.Object_20.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_23.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_25.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_27.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_29.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_31.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_33.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_36.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_38.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_40.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_42.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_44.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_46.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_48.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_50.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_52.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_54.geometry} material={basicMaterial} >
             <MeshReflectorMaterial
          metalness={0}
          blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
          depthToBlurRatioBias={2.25} // Bias factor for depth-to-blur calculation
          mixStrength={100} // Strength of the reflections
          mixContrast={0.8} // Contrast of the reflections
          roughness={0.14}
          resolution={500}
          mirror={4}
          mixBlur={-0.6} // How much blur mixes with surface roughness
          reflectorOffset={0} // Offset for the virtual camera
          reflectivity={1}

        />
          </mesh>
          <mesh geometry={nodes.Object_57.geometry} material={basicMaterial} position={[0, 0, 0.037]} />
          <mesh geometry={nodes.Object_59.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_62.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_65.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_67.geometry} material={basicMaterial} >

          <MeshReflectorMaterial
          metalness={0}
          blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
          depthToBlurRatioBias={2.25} // Bias factor for depth-to-blur calculation
          mixStrength={100} // Strength of the reflections
          mixContrast={0.8} // Contrast of the reflections
          roughness={0.14}
          resolution={500}
          mirror={4}
          mixBlur={-0.6} // How much blur mixes with surface roughness
          reflectorOffset={0} // Offset for the virtual camera
          reflectivity={1}

        />
          </mesh>
          <mesh geometry={nodes.Object_70.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_72.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_74.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_77.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_80.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_82.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_84.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_86.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_88.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_90.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_92.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_94.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_96.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_98.geometry} material={basicMaterial} />
          <mesh geometry={nodes.Object_100.geometry} material={basicMaterial} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/iphone.glb')
