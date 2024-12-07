import React, { useRef, useState, useEffect,forwardRef } from 'react';

import { useFrame,useThree } from '@react-three/fiber';
import { EffectComposer, GodRays,Bloom,Noise,DepthOfField,Pixelation,Scanline,Vignette  } from '@react-three/postprocessing';
import { BlendFunction, Resizer, KernelSize,Resolution  } from 'postprocessing';
import { Pole } from './Pole';
import wavyBumpMap from '../../public/waterbump.jpg'; // Add the path to your bump map texture
import { TextureLoader } from 'three'; // Import TextureLoader
import Water from './Water';
import { MeshReflectorMaterial } from '@react-three/drei';
import Mud from './mud';
import { Smoke } from './smoke';
import { Camera } from './Camera';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import { useConfig } from '@whatisjery/react-fluid-distortion';

const Scene = forwardRef((props, ref) => {
  const sunRef = useRef();
  const [sunReady, setSunReady] = useState(false); // Track when sunRef is ready
  const bumpTexture = new TextureLoader().load(wavyBumpMap);
  // const config = useConfig();


  // Ensure sunRef is initialized
  useEffect(() => {
    if (sunRef.current) {
      setSunReady(true);
    }
  }, [sunRef.current]);
  
  return (
    <>
     
      {/* <OrbitControls/> */}

      {sunReady && (
        <EffectComposer multisampling={0}>
          <Noise premultiply  blendFunction={BlendFunction.ALPHA}/>
          <Fluid 
          // {...config} 
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

{/* <Vignette
offset={0.6} // vignette offset
darkness={0.9} // vignette darkness
eskil={false} // Eskil's vignette technique
blendFunction={BlendFunction.ALPHA} // blend mode
/> */}
          <Bloom
          blendFunction={BlendFunction.ALPHA}
            intensity={3} // The bloom intensity.
            kernelSize={KernelSize.VERY_LARGE} // blur kernel size
            luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0} // smoothness of the luminance threshold. Range is [0, 1]
            mipmapBlur={true} // Enables or disables mipmap blur.
            resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
            resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
          />
        </EffectComposer>
      )}

      <group ref={ref} position={[0, 0, 0]}>
      
        <group ref={sunRef}><Pole /></group>
        
        

       
        <directionalLight
  color="#1A3744"
  position={[0,8, -10]}  // Directional light needs a position for its origin
  intensity={10}             // Adjust intensity for the brightness
  // castShadow               // Optional: Enables shadow casting
 
/>

<ambientLight intensity={1000} color={0xffffff} />  {/* Soft white light */}


  
    <Mud/>

        <Camera/>
  <group>
 
         <group position={[0,0,3]}> <Smoke texture={'/cloudperlinblue2.png'}/></group>
         <group position={[6,1,0]}> <Smoke texture={'/cloudperlinblue10.png'}/></group>
         <group position={[-10,0,0]}> <Smoke texture={'/cloudperlinblue10.png'}/></group>

   <group position={[-6,0,2]}> <Smoke texture={'/cloudperlinblue1.png'}/></group> 
     <group position={[2,2,3]}> <Smoke texture={'/cloudperlinblue1.png'}/></group>
     <group position={[0,5,8]}> <Smoke texture={'/cloudperlinblue3.png'}/></group>
     <group position={[0,10,8]}> <Smoke texture={'/cloudperlinblue3.png'}/></group>
  
  
        </group>
  </group>
    </>
  );
});

export default Scene;
