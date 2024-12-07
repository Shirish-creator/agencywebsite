import React, { useRef, useState, forwardRef } from 'react';

import { Camera } from './Camera';


  const SceneCamera = (props) => {
    const sunRef = useRef();
    const [sunReady, setSunReady] = useState(false); // Track when sunRef is ready
  
   
    
    return (
      <>
      
        {/* <OrbitControls/> */}

       
        

        <group  position={[0, 0, 0]}>
        

          <Camera/>
    <group>
  
        

        
    
    
          </group>
    </group>
      </>
    );
  }
  export default SceneCamera;
