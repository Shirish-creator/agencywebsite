"use client";

import { Canvas } from "react-three-fiber";
import React, { Suspense, useEffect, useState, useRef } from "react";
import SceneCamera from "./Scenecamera";
import { PerspectiveCamera, OrbitControls,useTexture  } from "@react-three/drei";
import GSAP from "gsap";
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction, KernelSize, Resolution } from 'postprocessing';
import { Fluid } from '@whatisjery/react-fluid-distortion';

import Mud from './mud';
import { Smoke } from './smoke';
import { Pole } from './Pole';
import { TextureLoader } from 'three';
import wavyBumpMap from '../../public/waterbump.jpg';
import Sceneiphone from "./Sceneiphone";
import { useRouter } from "next/router";  // Use useRouter hook from next/router
import TWEEN from '@tweenjs/tween.js';
import { useControls } from 'leva';


const NewScene = () => {
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [textureOpacity, setTextureOpacity] = useState(1); // State to control texture opacity
  const transitionTexture = useTexture('./perlintransition.png');
  const transitionRef = useRef(null);

  // Leva Control for Transition Progress
  const { transition } = useControls({
    transition: { value: 0, min: 0, max: 1, step: 0.01 },
  });

  useEffect(() => {
    // Create a tween to animate the transition progress
    const tween = new TWEEN.Tween({ progress: 0 })
      .to({ progress: 1 }, 2000)  // 2 seconds transition
      .onUpdate((obj) => setTransitionProgress(obj.progress))
      .yoyo(true)
      .repeat(Infinity)
      .start();

    return () => tween.stop(); // Cleanup the tween on component unmount
  }, []);

  useEffect(() => {
    // Update Leva's control state when transition progresses
    setTransitionProgress(transition);
  }, [transition]);

  useEffect(() => {
    // When transition is complete, start fading out the texture opacity
    if (transitionProgress === 1) {
      const fadeOutTween = new TWEEN.Tween({ opacity: 1 })
        .to({ opacity: 0 }, 1000) // Fade out in 1 second
        .onUpdate((obj) => setTextureOpacity(obj.opacity))
        .start();
    }
  }, [transitionProgress]);

  return (
    <>
      {/* Transition effect */}
      <mesh position={[0, 0, 35]} scale={20}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial 
          map={transitionTexture} 
          transparent={true} 
          opacity={textureOpacity * transitionProgress}  // Gradually decrease opacity after transition completes
        />
      </mesh>

      {/* Render Scene A or B based on the transition */}
      <group style={{ opacity: transitionProgress }}>
        {transitionProgress < 0.5 ? <SceneCamera /> : <Sceneiphone />}
      </group>
    </>
  );
};




const Threed = () => {
  
  const [isMobile, setIsMobile] = useState(false);
  const cameraref = useRef();
  const mesh = useRef();
  const bumpTexture = new TextureLoader().load(wavyBumpMap);
  const router = useRouter();  // Initialize the router hook

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

//  // Listen for route change events
//  useEffect(() => {
//   const handleRouteChange = (url) => {
//     if (url === "/projectone" && cameraref.current) {
//       GSAP.to(cameraref.current.position, {
//         z: 38, // Rotate z-axis to 12
//         duration: 1.5,
//         ease: "power2.inOut",
//       },
    
//     );
//     }
//     if (url === "/" && cameraref.current) {
//       GSAP.to(cameraref.current.position, {
//         z: 48, // Rotate z-axis to 12
//         duration: 1.5,
//         ease: "power2.inOut",
//       });
//     }
//   };

//   // Subscribe to route change event
//   router.events.on("routeChangeComplete", handleRouteChange);

//   // Clean up the event listener on component unmount
//   return () => {
//     router.events.off("routeChangeComplete", handleRouteChange);
//   };
// }, [router.events]);  // Make sure to include router.events in the dependency array

  return (
    <div style={{ height: "100vh", width: "100%", overflow: "hidden", position: "static" }}>
      <Canvas
        gl={{ antialias: true }}
        shadows
        camera={{ fov: 80, near: 0.5, far: 1000, position: [0, 1, 22] }}
      >
        
        <PerspectiveCamera ref={cameraref} makeDefault position={isMobile ? [0.5, -3.8, 58] : [0, -1, 48]} />
        <color args={["#020608"]} attach="background" />
        {/* <fog args={["rgba(2, 6, 8, 1)", 30, 40]} attach="fog" /> */}

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
            <Vignette
            offset={0.6} // vignette offset
            darkness={.9} // vignette darkness
            eskil={false} // Eskil's vignette technique
            blendFunction={BlendFunction.ALPHA} // blend mode
            />
            <Bloom
              blendFunction={BlendFunction.ALPHA}
              intensity={5}
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              mipmapBlur={true}
              resolutionX={Resolution.AUTO_SIZE}
              resolutionY={Resolution.AUTO_SIZE}
            />
            <Noise 
            premultiply
             blendFunction={BlendFunction.ADD} 
             />
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
            {/* <Sceneiphone /> */}
              {/* <SceneCamera ref={mesh} /> */}
              <group>
   
    </group>
        
          </group>
          <NewScene/>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Threed;
