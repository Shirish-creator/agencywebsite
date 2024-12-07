import { Canvas } from "react-three-fiber";
import React, { Suspense, useEffect, useState, useRef } from "react";
import Scene from "./Scene";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import GSAP from "gsap";

const Threed = () => {
  const [isMobile, setIsMobile] = useState(false);
  const cameraref = useRef();
  const mesh = useRef();

  const mouse = useRef({ x: 0, y: 0 });

  // Detect window resize to toggle isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track mouse movement (only on desktop)
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

  // Animate camera tilt based on mouse position (only on desktop)
  useEffect(() => {
    const updateTilt = () => {
      if (!isMobile && mesh.current) {
        const { x, y } = mouse.current;

        const tiltY = x * 0.085;
        const tiltZ = x * 0.05;

        // Animate camera rotation with GSAP
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

  return (
    <div
      style={{
        height: "100vh",
        position: "static",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Canvas
        gl={{
          antialias: true,
        }}
        shadows
        camera={{
          fov: 80,
          near: 0.5,
          far: 1000,
          position: [0, 1, 22],
        }}
      >
        {/* <OrbitControls/> */}
        <PerspectiveCamera
          ref={cameraref}
          makeDefault
          position={isMobile ? [0.5, -3.8, 58] : [0, -1, 48]}
        />
        <color args={["#020608"]} attach="background" />
        <Suspense fallback={null}>
          <group>
            <Scene ref={mesh} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Threed;
