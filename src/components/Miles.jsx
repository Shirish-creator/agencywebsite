/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 miles.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { NodeToyMaterial } from '@nodetoy/react-nodetoy';
import {data as milesShaderData} from "./milesShaderData"

export function Miles(props) {
  const { nodes, materials } = useGLTF('/cartoonlog.glb')
  return (
    <group {...props} dispose={null} position={[12,-7.2,5]} rotation={[0,.4,0]} scale={3} >
      <primitive object={nodes.GLTF_created_0_rootJoint} />
      <skinnedMesh geometry={nodes.Object_8.geometry} material={materials['HEAD.001']} skeleton={nodes.Object_8.skeleton} />
      <mesh castShadow geometry={nodes.Object_0.geometry} material={materials.HEAD} />
     
      {/* <mesh castShadow geometry={nodes.Object_0.geometry} material={materials.HEAD}/> */}
      <mesh geometry={nodes.Object_0_1.geometry} material={materials.outline} >
        <meshBasicMaterial color={0x000000}/>
      </mesh>
      <mesh geometry={nodes.Object_0_1.geometry} material={materials.outline} >
      <NodeToyMaterial  data={milesShaderData} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/cartoonlog.glb')
