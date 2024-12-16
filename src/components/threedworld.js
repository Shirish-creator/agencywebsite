"use client";

import { Canvas } from "react-three-fiber";
import React, { Suspense, useEffect, useState, useRef } from "react";
import SceneCamera from "./Scenecamera";
import { PerspectiveCamera, OrbitControls,useTexture,Sparkles  } from "@react-three/drei";
import GSAP from "gsap";
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction, KernelSize, Resolution } from 'postprocessing';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import { Perf } from 'r3f-perf';
import WaterSurfaceSimple from './WaterSurface/WaterSurfaceSimple';
import WaterSurfaceComplex from './WaterSurface/WaterSurfaceComplex';
import { useControls, folder } from 'leva';
import FluidFX from './WaterSurface/InteractiveFX/FluidFX';
import RippleFX from './WaterSurface/InteractiveFX/RippleFX';

import Mud from './mud';
import { Smoke } from './smoke';
import { Pole } from './Pole';
import { TextureLoader } from 'three';
import wavyBumpMap from '../../public/waterbump.jpg';
import Sceneiphone from "./Sceneiphone";
import { useRouter } from "next/router";  // Use useRouter hook from next/router
import TWEEN from '@tweenjs/tween.js';



const NewScene = () => {
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [textureOpacity, setTextureOpacity] = useState(1); // State to control texture opacity
  const transitionTexture = useTexture('./perlintransition.png');
  const transitionRef = useRef(null);

  // Leva Control for Transition Progress
  // const { transition } = useControls({
  //   transition: { value: 0, min: 0, max: 1, step: 0.01 },
  // });

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
    setTransitionProgress(0);
  }, [0]);

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
      {/* <Sceneiphone /> */}
         <SceneCamera /> 
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
const niceref=useRef()

   // Update mouse position on movement
   useEffect(() => {
    if (!isMobile) {
      const handleMouseMove = (event) => {
        // Normalize mouse position to [-1, 1]
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.current = { x }; // Update the current mouse position
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isMobile]);

  // Animate the camera rotation based on mouse movement
  useEffect(() => {
    const animateCamera = () => {
      if (niceref.current) {
        const targetYRotation = mouse.current.x * 0.05; // Adjust rotation sensitivity
        GSAP.to(niceref.current.rotation, {
          y: targetYRotation*2, // Rotate around the Y-axis
          z: targetYRotation, // Rotate around the Y-axis

          duration: 4, // Smooth animation duration
          ease: "power3.out", // Easing effect
        });
      }

      requestAnimationFrame(animateCamera);
    };

    animateCamera();
  }, []);
  const smokeData = [
  
    { position: [0, 0, 5], texture: '/cloudperlinblue1.png' },
    { position: [0, -7, 4], texture: '/cloudperlinblue3.png' },


  ];

  const mouse = useRef({ x: 0, y: 0 });


  const FX_RENDER = (
		<>
				{/* <RippleFX
					alpha={0.8}
					// fadeout_speed={0}
					// frequency={20}
					// rotation={2}
					scale={0.1}
          
				/> */}
		

				{/* <FluidFX
					densityDissipation={controls.densityDissipation}
					velocityDissipation={controls.velocityDissipation}
					velocityAcceleration={controls.velocityAcceleration}
					pressureDissipation={controls.pressureDissipation}
					splatRadius={controls.splatRadius}
					curlStrength={controls.curlStrength}
					pressureIterations={controls.pressureIterations}
				/> */}
		</>
	);


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
              {/* <Perf position={'top-left'} /> */}
        
        <PerspectiveCamera ref={cameraref} makeDefault position={isMobile ? [0.5, -4, 60] : [0, -1, 50]} />
        <color args={["#030608"]} attach="background" />
        <fog args={["rgba(2, 6, 8, 1)", 30, 10]} attach="fog" />
      {/* <OrbitControls/> */}  
      
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
        <Sparkles
      count={20}
      size={7}
      scale={[40,16,4]}
      position-y={10}
      position-z={20}
      position-x={-20}

      color={'rgb(15, 89, 126)'}
      speed={1}
    />
   
    <Sparkles
      count={4}
      size={2}
      scale={[40,16,4]}
      // position-y={15}
      position-z={20}
      position-x={-30}
      color={'rgb(15, 89, 126)'}
      speed={1}
    />
    <Sparkles
      count={5}
      size={5}
      scale={[10,16,4]}
      position-y={-2}
      position-z={25}
      position-x={10}
      color={'rgb(15, 89, 126)'}
      speed={0.9}
    />
      </group>
          <group ref={niceref}>
          <WaterSurfaceComplex
					dimensions={400}
					position={[0,-7.5,0]}
					width={200}
					length={200}
					fxDistortionFactor={100}
					fxDisplayColorAlpha={0.67}
					flowSpeed={0.0}
					flowDirection={[0.9,1.5]}
					reflectivity={0.2}
					scale={10.0}>
					{FX_RENDER}
				</WaterSurfaceComplex>
            <directionalLight
              color="#1A3744"
              position={[0, 5, -5]}
              intensity={50}
            />
             <directionalLight
              color="#1A3744"
              position={[0, 0, -20]}
              intensity={20}
            />
            <ambientLight
              color="#1A3744"
              position={[0, -5, 5]}
              intensity={ 2}
            />
          
            {/* Black Standard Mesh Box */}
        
            <Pole />
            <mesh position={[0, -5, 2.5]} castShadow receiveShadow>
          <boxGeometry args={[300, 500, 5]} /> {/* Box dimensions: width, height, depth */}
          <meshStandardMaterial color={"#000a0a"} /> {/* Black color */}
        </mesh>
            <NewScene/>

            <group >
              {smokeData.map((data, index) => (
                <group key={index} position={data.position}>
                  <Smoke texture={data.texture} />
                </group>
                
              ))}
            </group>
            {/* <Mud /> */}
           
              <group>
   
    </group>
        
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Threed;
