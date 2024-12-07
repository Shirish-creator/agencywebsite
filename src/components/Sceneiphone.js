import React, { useRef, useState, forwardRef } from 'react';

import { Iphone } from './Iphone';

  const Sceneiphone = (props) => {
   
  
   
    
    return (
      <>
      
        {/* <OrbitControls/> */}

       
        

        <group  position={[0, 0, 0]}>
        

          <Iphone/>
    <group>
  
        

        
    
    
          </group>
    </group>
      </>
    );
  }
  export default Sceneiphone;
