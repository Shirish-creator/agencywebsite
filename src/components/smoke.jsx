import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

export function Smoke({ texture, alphaValue=0.05, ...props}) {

  const perlinTexture = useLoader(TextureLoader, texture); // Replace with the path to your normal map texture

  // Set the texture to repeat
  perlinTexture.wrapS = THREE.RepeatWrapping;  // Horizontal repeat
  perlinTexture.wrapT = THREE.RepeatWrapping;  // Vertical repeat

  // Optionally adjust the repeat scale
  perlinTexture.repeat.set(1,1) // Adjust this based on how many times you want the texture to repeat

  const planeGeometry = new THREE.PlaneGeometry(80, 80, 40, 40); // 50x50 subdivisions

  // Custom Vertex Shader
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;

    uniform float uTime;

    // Pseudo-random generator
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(18.9898, 78.233))) * 50000.5453123);
    }

    // Perlin-like noise
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      // Four corners of the cell
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 0.0));
      float d = random(i + vec2(1.0, 0.0));

      // Smoothstep for interpolation
      vec2 u = f * f * (3.0 - 2.0 * f);

      // Mix the results
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vUv = uv;

      // Add time-varying noise to the Z-axis
      float displacement = noise(uv * 10.0 + uTime * 2.2) * 2.5; // Scale and animate noise
      vec3 newPosition = position;
      newPosition.z += displacement; // Displace only in Z-axis

      vPosition = newPosition; // Pass updated position for fragment shader (if needed)

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  // Custom Fragment Shader with Emissive Light
  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform sampler2D uPerlinTexture;
    uniform float uAlpha;  // New uniform for falloff control

    void main() {
      vec2 center = vec2(0.5, 0.5); // Center of the containment area
      vec2 offset = vUv - center;   // Distance from the center

      // Swirling motion
      float swirl = sin(uTime * 0.1) * 0.05; // Add sinusoidal motion
      vec2 animatedUv = vUv + vec2(
        swirl * cos(offset.y * 5.14 + uTime * 0.5),
        swirl * sin(offset.x * 5.14 + uTime * 0.5)
      );

      vec4 texColor = texture2D(uPerlinTexture, animatedUv);

      // Radial falloff
      float distanceToCenter = length(offset);
      float falloff = smoothstep(0.3, 0.1, distanceToCenter); // Controls edge fade

      // Add emissive color to create a glow effect
      vec3 emissiveColor = vec3(0.0706, 0.4627, 0.6667); // Greenish emissive color

      gl_FragColor = vec4(texColor.rgb * emissiveColor, texColor.b * falloff * uAlpha); // Apply emissive glow with falloff
    }
  `;

  // Shader Smoke Material
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uPerlinTexture: new THREE.Uniform(perlinTexture),
      uTime: new THREE.Uniform(0),
      uAlpha:new THREE.Uniform(alphaValue)
    },
    side: THREE.DoubleSide, // Make sure both sides are visible
    transparent: true,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation, // Additive equation
    blendDst: THREE.OneFactor,        // Destination factor
    emissive: new THREE.Color(0xfff),
    emissiveIntensity:0.8
  });

  useFrame((state) => {
    shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime; // Update time
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={planeGeometry}
        material={shaderMaterial}
        position={[0, 0, 1]} // Position the plane below the pole
        rotation={[0, 0, 0]} // Rotate the plane to be horizontal
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload('/pole.glb');
