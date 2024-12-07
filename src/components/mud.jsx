import { useLoader } from "@react-three/fiber"
import { TextureLoader,RepeatWrapping } from "three"
import { MeshReflectorMaterial } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function Mud() {
  // Load the normal map
  const normalMap = useLoader(TextureLoader, "/waternormals.jpg") // Replace with the path to your normal map texture
  const bumpMap = useLoader(TextureLoader, "/waterbump.jpg") // Replace with the path to your normal map texture
 // Set wrapping mode and repeat for the normal map
 // Set wrapping mode and repeat for the normal map
 normalMap.wrapS = normalMap.wrapT = RepeatWrapping
 normalMap.repeat.set(3, 3) // Adjust repeat for scaling effect

 const timeRef = useRef(0)

 // Animate the normal map offset in a wavy pattern
 useFrame((state, delta) => {
   if (normalMap) {
     timeRef.current += delta
     const waveSpeed = 0.1 // Adjust wave speed
     const waveScale = 0.08 // Adjust wave intensity
    //  normalMap.offset.x = Math.sin(timeRef.current * waveSpeed) * waveScale*1.01

    //  normalMap.offset.z = Math.sin(timeRef.current * waveSpeed) * waveScale
    normalMap.offset.y += waveSpeed * delta; // Continuously move the texture upward

    // Keep the offset value within a reasonable range to prevent floating point precision issues
    if (normalMap.offset.y > 1) {
      normalMap.offset.y -= 1; // Reset to maintain seamless looping
    }
   }
 
 })



 // Ref for accessing the material
 // Animate the displacement map offset to create waves
 


  return (
    <>
      <mesh position={[2, -7, 32]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 50]} />
        <MeshReflectorMaterial
          metalness={1}
          blur={[0, 200]} // Blur ground reflections (width, height), 0 skips blur
          depthToBlurRatioBias={2.25} // Bias factor for depth-to-blur calculation
          mixStrength={100} // Strength of the reflections
          mixContrast={0.8} // Contrast of the reflections
          roughness={0.14}
          resolution={500}
          mirror={4}
          mixBlur={-0.6} // How much blur mixes with surface roughness
          reflectorOffset={0} // Offset for the virtual camera
          normalMap={normalMap} // Apply the normal map
          reflectivity={1}
          displacementMap={bumpMap} // Use displacement map
          displacementScale={0} // Intensity of the displacement
          
        />
      </mesh>
    </>
  )
}
