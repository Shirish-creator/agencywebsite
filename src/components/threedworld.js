"use client";

import { Canvas } from "react-three-fiber";
import React, { Suspense, useEffect, useState, useRef } from "react";
import SceneCamera from "./Scenecamera";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import GSAP from "gsap";
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import { BlendFunction, KernelSize, Resolution } from 'postprocessing';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import Mud from './mud';
import { Smoke } from './smoke';
import { Pole } from './Pole';
import { TextureLoader } from 'three';
import wavyBumpMap from '../../public/waterbump.jpg';
import Sceneiphone from "./Sceneiphone";

const Threed = () => {
  
  const [isMobile, setIsMobile] = useState(false);
  const [transition, setTransition] = useState(0); // Transition state
  const cameraref = useRef();
  const mesh = useRef();
  const bumpTexture = new TextureLoader().load(wavyBumpMap);

  const smokeData = [
    { position: [0, 0, 3], texture: '/cloudperlinblue2.png' },
    { position: [6, 1, 0], texture: '/cloudperlinblue10.png' },
    { position: [-10, 0, 0], texture: '/cloudperlinblue10.png' },
    { position: [-6, 0, 2], texture: '/cloudperlinblue1.png' },
    { position: [2, 2, 3], texture: '/cloudperlinblue1.png' },
    { position: [0, 5, 8], texture: '/cloudperlinblue3.png' },
    { position: [0, 10, 8], texture: '/cloudperlinblue3.png' },
  ];

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const handleMouseMove = (event) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        mouse.current = { x, y };
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isMobile]);

  useEffect(() => {
    const updateTilt = () => {
      if (!isMobile && mesh.current) {
        const { x, y } = mouse.current;
        const tiltY = x * 0.085;
        const tiltZ = x * 0.05;

        GSAP.to(mesh.current.rotation, {
          y: tiltY,
          z: tiltZ,
          duration: 0.15,
          ease: "power1.in",
        });
      }

      requestAnimationFrame(updateTilt);
    };

    updateTilt();
  }, [isMobile]);

  // Handle transition with a simple fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTransition((prev) => (prev === 0 ? 1 : 0)); // Toggle transition
    }, 5000); // Change scene every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%", overflow: "hidden", position: "static" }}>
      <Canvas
        gl={{ antialias: true }}
        shadows
        camera={{ fov: 80, near: 0.5, far: 1000, position: [0, 1, 22] }}
      >
        <PerspectiveCamera ref={cameraref} makeDefault position={isMobile ? [0.5, -3.8, 58] : [0, -1, 48]} />
        <color args={["#020608"]} attach="background" />
        <Suspense fallback={null}>
          <EffectComposer multisampling={0}>
            <Fluid
              fluidColor='#306F87'
              backgroundColor='#000000'
              distortion={0.1}
              blend={0.008}
              intensity={2}
              curl={0.14}
              swirl={0}
              radius={0.1}
              force={3}
            />
            <Bloom
              blendFunction={BlendFunction.ALPHA}
              intensity={3}
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              mipmapBlur={true}
              resolutionX={Resolution.AUTO_SIZE}
              resolutionY={Resolution.AUTO_SIZE}
            />
            <Noise blendFunction={BlendFunction.MULTIPLY} />
          </EffectComposer>

          <group>
            <directionalLight
              color="#1A3744"
              position={[0, 8, -10]}
              intensity={5}
            />
            <Pole />
            <group>
              {smokeData.map((data, index) => (
                <group key={index} position={data.position}>
                  <Smoke texture={data.texture} />
                </group>
              ))}
            </group>
            <Mud />
            {/* Transition Effect */}
            <group style={{ opacity: transition }}>
              {/* <SceneCamera ref={mesh} /> */}
              <Sceneiphone />
              
            </group>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Threed;
