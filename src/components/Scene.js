import React, { useRef, useState, forwardRef } from 'react';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import { BlendFunction, KernelSize, Resolution } from 'postprocessing';
import { Pole } from './Pole';
import wavyBumpMap from '../../public/waterbump.jpg';
import { TextureLoader } from 'three';
import Mud from './mud';
import { Smoke } from './smoke';
import { Camera } from './Camera';
import { Fluid } from '@whatisjery/react-fluid-distortion';


  const Scene = (props) => {
    const sunRef = useRef();
    const [sunReady, setSunReady] = useState(false); // Track when sunRef is ready
    const bumpTexture = new TextureLoader().load(wavyBumpMap);
    // const config = useConfig();


   
    
    return (
      <>
      
        {/* <OrbitControls/> */}

        
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
        

        <group  position={[0, 0, 0]}>
        
          <group ><Pole /></group>
          
          

        
          <directionalLight
    color="#1A3744"
    position={[0,8, -10]}  // Directional light needs a position for its origin
    intensity={10}             // Adjust intensity for the brightness
    // castShadow               // Optional: Enables shadow casting
  
  />

  <ambientLight intensity={100} color={0xffffff} />  {/* Soft white light */}


    
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
  }
  export default Scene;
