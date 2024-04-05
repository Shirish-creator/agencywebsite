/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 ../../public/iphone.glb 
*/

import React, { useRef,useState } from 'react'
import { useGLTF,Html } from '@react-three/drei'
import { useThree } from 'react-three-fiber';
import gsap from "gsap";

export function Iphone(props) {
  const { nodes, materials } = useGLTF('/iphone.glb')

  const [zoomactive, setZoomActive] = useState(false);
  const { camera } = useThree();

    const [isVisible, setIsVisible] = useState(true);


    const [position, setPosition] = useState([5.5, -7.2, 5]);
    const [rotation, setRotation] = useState([0, 1.5, 0]); // Initial rotation

    const handleButtonClick = () => {
      // Toggle the zoomactive state
      setZoomActive(!zoomactive);
      const targetPosition = { x: zoomactive ?0:1, y:zoomactive ?1:-5, z: zoomactive ? 20 : 12 };
      const targetZoom=zoomactive ? 110 : 100;

      // Tween the camera position
      gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1, // Duration of the animation in seconds
        ease: "power2.out" // Easing function
      });
  
      // Define the target camera position based on the zoomactive state
      const targetFOV = zoomactive ? 2 : 1;

  
      
       gsap.to(camera, {
        fov: targetZoom,
      duration: 1, // Duration of the animation in seconds
      ease: "power2.out" // Easing function
    });
    console.log(camera.fov)

    };
  return (
    <group {...props} dispose={null}>
      <perspectiveCamera ></perspectiveCamera>
      <group position={[9, -7.1, 6]} rotation={[0, Math.PI / 1.0015, 0]} >
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.2}>
          <mesh castShadow receiveShadow  geometry={nodes.ttmRoLdJipiIOmf.geometry} material={materials.hUlRcbieVuIiOXG} />
          <mesh castShadow receiveShadow geometry={nodes.AdjkxvMXIDEHBMM.geometry} material={materials.eShKpuMNVJTRrgg} />
          <mesh castShadow receiveShadow geometry={nodes.AwsQCWysocWlYzN.geometry} material={materials.xNrofRCqOXXHVZt} />
          <mesh castShadow receiveShadow geometry={nodes.drpRvcOgsocXGbn.geometry} material={materials.PpwUTnTFZJXxCoE} />
          <mesh castShadow receiveShadow geometry={nodes.FFAjDZTPwYrUKAV.geometry} material={materials.xNrofRCqOXXHVZt} />
          <mesh castShadow receiveShadow geometry={nodes.KXVnYLSfTdVnSOf.geometry} material={materials.jlzuBkUzuJqgiAK} />
          <mesh castShadow receiveShadow geometry={nodes.nnqwwoLVdMJlHIF.geometry} material={materials.fkUApOHLQsMUdfd} />
          <mesh castShadow receiveShadow geometry={nodes.SRYqzKwamLGuEGm.geometry} material={materials.EszxgwYUTxbhBrC} />
          <mesh castShadow receiveShadow geometry={nodes.wJqHahKxdxecSAC.geometry} material={materials.EuTsEfyoAnyJIih} />
          <mesh castShadow receiveShadow geometry={nodes.xtMgDHhPqFLAHyB.geometry} material={materials.hUlRcbieVuIiOXG} />
          <mesh castShadow receiveShadow geometry={nodes.yxqQUnbopbiRvZr.geometry} material={materials.yQQySPTfbEJufve} />
          <mesh castShadow receiveShadow geometry={nodes.IkoiNqATMVoZFKD.geometry} material={materials.hiVunnLeAHkwGEo} />
          <mesh castShadow receiveShadow geometry={nodes.npMJxzurVJQlumk.geometry} material={materials.JJvGZqtXqnnFakR} />
          <mesh castShadow receiveShadow geometry={nodes.rqgRAGHOwnuBypi.geometry} material={materials.HGhEhpqSBZRnjHC} />
          <mesh castShadow receiveShadow geometry={nodes.eWbcqPskBBXuZDe.geometry} material={materials.fkUApOHLQsMUdfd} />
          <mesh castShadow receiveShadow geometry={nodes.FjtgRCsnzEoHpCy.geometry} material={materials.xNrofRCqOXXHVZt} />
          <mesh castShadow receiveShadow geometry={nodes.gJeeYWdxrKsnsVD.geometry} material={materials.xNrofRCqOXXHVZt} />
          <mesh castShadow receiveShadow geometry={nodes.gTmqYtKthFeRVJL.geometry} material={materials.xNrofRCqOXXHVZt} />
          <mesh castShadow receiveShadow geometry={nodes.hGKQDeRmDnGNdjb.geometry} material={materials.eShKpuMNVJTRrgg} />
          <mesh castShadow receiveShadow geometry={nodes.KOgQmlOdVEyKocf.geometry} material={materials.jlzuBkUzuJqgiAK} />
          <mesh castShadow receiveShadow geometry={nodes.lfXEACUihtLFGfq.geometry} material={materials.hUlRcbieVuIiOXG} />
          <mesh castShadow receiveShadow geometry={nodes.obVkazjvaXyXFtA.geometry} material={materials.EuTsEfyoAnyJIih} />
          <mesh castShadow receiveShadow geometry={nodes.ooeiSEXgcJckXsp.geometry} material={materials.yQQySPTfbEJufve} />
          <mesh castShadow receiveShadow geometry={nodes.oOTDgAlTGbFYzBo.geometry} material={materials.PpwUTnTFZJXxCoE} />
          <mesh castShadow receiveShadow geometry={nodes.PRPzbUhYhabBDYt.geometry} material={materials.jlzuBkUzuJqgiAK} />
          <mesh castShadow receiveShadow geometry={nodes.XRoKUoMkItkzNYL.geometry} material={materials.jlzuBkUzuJqgiAK} />
          <mesh castShadow receiveShadow geometry={nodes.zFlMfSCaOdRDBFx.geometry} material={materials.EszxgwYUTxbhBrC} />
          <mesh castShadow receiveShadow geometry={nodes.fdZyCEcqJDKBWVW.geometry} material={materials.hUlRcbieVuIiOXG} />
          <mesh castShadow receiveShadow geometry={nodes.pXBNoLiaMwsDHRF.geometry} material={materials.yiDkEwDSyEhavuP} />
          <mesh castShadow receiveShadow geometry={nodes.SCoTCDlNLPQMMyt.geometry} material={materials.yiDkEwDSyEhavuP} />
          <mesh castShadow receiveShadow geometry={nodes.bpqFtgUKAOOPYpk.geometry} material={materials.yQQySPTfbEJufve} />
          <mesh castShadow receiveShadow geometry={nodes.bxjlJpbNESedyat.geometry} material={materials.xNrofRCqOXXHVZt} />
          <mesh castShadow receiveShadow geometry={nodes.CdalkzDVnwgdEhS.geometry} material={materials.jlzuBkUzuJqgiAK} />
          <mesh castShadow receiveShadow geometry={nodes.dxVZiHfQBLkPYHO.geometry} material={materials.hUlRcbieVuIiOXG} />
          <mesh castShadow receiveShadow geometry={nodes.ehFpgEdYijLjwka.geometry} material={materials.xNrofRCqOXXHVZt} />
          <mesh castShadow receiveShadow geometry={nodes.guvLdFXlBjMoNra.geometry} material={materials.fkUApOHLQsMUdfd} />
          <mesh castShadow receiveShadow geometry={nodes.IXWuqsIeTqBFLIy.geometry} material={materials.EuTsEfyoAnyJIih} />
          <mesh castShadow receiveShadow geometry={nodes.NtjcIgolNGgYlCg.geometry} material={materials.PpwUTnTFZJXxCoE} />
          <mesh castShadow receiveShadow geometry={nodes.qlwPlhojsxIgqwa.geometry} material={materials.EszxgwYUTxbhBrC} />
          <mesh castShadow receiveShadow geometry={nodes.zOPceDOPdLNSscX.geometry} material={materials.eShKpuMNVJTRrgg} />
          <mesh castShadow receiveShadow geometry={nodes.IykfmVvLplTsTEW.geometry} material={materials.dwrMminMXjXXeek} />
          <mesh castShadow receiveShadow geometry={nodes.TakBsdEjEytCAMK.geometry} material={materials.ZQfGMLaFcpPaLMU} />
          <mesh castShadow receiveShadow geometry={nodes.cibcwsZWGgGfpme.geometry} material={materials.ZQfGMLaFcpPaLMU} />
          <mesh castShadow receiveShadow geometry={nodes.DCLCbjzqejuvsqH.geometry} material={materials.vhaEJjZoqGtyLdo} />
          <mesh castShadow receiveShadow geometry={nodes.dkQXkqysxzfHFiP.geometry} material={materials.hUlRcbieVuIiOXG} />
          <mesh castShadow receiveShadow geometry={nodes.FscwyiLIVNWUuKe.geometry} material={materials.fkUApOHLQsMUdfd} />
          <mesh castShadow receiveShadow geometry={nodes.WJwwVjsahIXbJpU.geometry} material={materials.yhcAXNGcJWCqtIS} />
          <mesh castShadow receiveShadow geometry={nodes.wLfSXtbwRlBrwof.geometry} material={materials.oZRkkORNzkufnGD} />
          <mesh castShadow receiveShadow geometry={nodes.YfrJNXgMvGOAfzz.geometry} material={materials.bCgzXjHOanGdTFV} />
          <mesh castShadow receiveShadow geometry={nodes.buRWvyqhBBgcJFo.geometry} material={materials.eHgELfGhsUorIYR} />
          <mesh castShadow receiveShadow geometry={nodes.DjsDkGiopeiEJZK.geometry} material={materials.iCxrnlRvbVOguYp} />
          <mesh castShadow receiveShadow geometry={nodes.KVYuugCtKRpLNRG_0.geometry} material={materials.mvjnAONQuIshyfX} />
          <mesh castShadow receiveShadow geometry={nodes.MrMmlCAsAxJpYqQ_0.geometry} material={materials.dxCVrUCvYhjVxqy} />
          <mesh castShadow receiveShadow geometry={nodes.wqbHSzWaUxBCwxY_0.geometry} material={materials.MHFGNLrDQbTNima} />
          <mesh castShadow receiveShadow geometry={nodes.zraMDXCGczVnffU.geometry} material={materials.hUlRcbieVuIiOXG} />
          <mesh castShadow receiveShadow geometry={nodes.CfghdUoyzvwzIum.geometry} material={materials.jpGaQNgTtEGkTfo} />
          <mesh castShadow receiveShadow geometry={nodes.MHfUXxLdYldKhVJ_0.geometry} material={materials.dxCVrUCvYhjVxqy} />
          <mesh castShadow receiveShadow geometry={nodes.pvdHknDTGDzVpwc.geometry} material={materials.xdyiJLYTYRfJffH} />
          <mesh castShadow receiveShadow geometry={nodes.TxLQyfBdakwBPHu_0.geometry} material={materials.eShKpuMNVJTRrgg} />
          <mesh castShadow receiveShadow geometry={nodes.TvgBVmqNmSrFVfW.geometry} material={materials.pIhYLPqiSQOZTjn} />
          <mesh castShadow receiveShadow geometry={nodes.evAxFwhaQUwXuua.geometry} material={materials.KSIxMqttXxxmOYl} />
          <mesh castShadow receiveShadow geometry={nodes.fjHkOQLEMoyeYKr.geometry} material={materials.AhrzSsKcKjghXhP} />
          <mesh castShadow receiveShadow geometry={nodes.MGPAkjCLsByKXcN.geometry} material={materials.kUhjpatHUvkBwfM} />
          <mesh castShadow receiveShadow geometry={nodes.QvGDcbDApaGssma.geometry} material={materials.kUhjpatHUvkBwfM} />
          <mesh castShadow receiveShadow geometry={nodes.RvfXLdAOBoQdZkP.geometry} material={materials.hUlRcbieVuIiOXG} />
          <mesh castShadow receiveShadow geometry={nodes.USxQiqZgxHbRvqB.geometry} material={materials.mcPrzcBUcdqUybC} />
          <mesh castShadow receiveShadow geometry={nodes.vFwJFNASGvEHWhs.geometry} material={materials.RJoymvEsaIItifI} />
          <mesh castShadow receiveShadow geometry={nodes.VTXyqxbrBeQSTEt.geometry} material={materials.eHgELfGhsUorIYR} />
          <mesh castShadow receiveShadow geometry={nodes.cnreaSmJRdAuFia.geometry} material={materials.eShKpuMNVJTRrgg} />
          <mesh castShadow receiveShadow geometry={nodes.DOjZomXdJsbbvcr.geometry} material={materials.eShKpuMNVJTRrgg} />
          <mesh castShadow receiveShadow geometry={nodes.eYSJBzbqIfsHPsw.geometry} material={materials.hUlRcbieVuIiOXG} />
          <mesh castShadow receiveShadow geometry={nodes.GuYJryuYunhpphO.geometry} material={materials.eShKpuMNVJTRrgg} />

          <mesh castShadow receiveShadow geometry={nodes.KbMHiTYyrBmkZwz.geometry} material={materials.dxCVrUCvYhjVxqy} />
          <mesh castShadow receiveShadow geometry={nodes.sVqcZvpZKhwSmoN.geometry} material={materials.dxCVrUCvYhjVxqy} />
          <mesh castShadow receiveShadow geometry={nodes.xJhdvBbfHMKCBPl.geometry} material={materials.dxCVrUCvYhjVxqy} />
          <mesh castShadow receiveShadow geometry={nodes.HKHhmqmAZAOaaKY.geometry} material={materials.dxCVrUCvYhjVxqy} />
          <mesh castShadow receiveShadow geometry={nodes.IZQgEjTfhbNtjHR.geometry} material={materials.eShKpuMNVJTRrgg} />
          <mesh castShadow receiveShadow geometry={nodes.DjdhycfQYjKMDyn.geometry} material={materials.ujsvqBWRMnqdwPx} />
          <mesh castShadow receiveShadow geometry={nodes.usFLmqcyrnltBUr.geometry} material={materials.sxNzrmuTqVeaXdg} />
          <mesh castShadow receiveShadow geometry={nodes.IZbjANwSMLfgcvD.geometry} material={materials.hUlRcbieVuIiOXG} />
          
          <mesh castShadow receiveShadow geometry={nodes.SysBlPspVQNIcce.geometry} material={materials.ujsvqBWRMnqdwPx} />
          <mesh castShadow receiveShadow geometry={nodes.vELORlCJixqPHsZ.geometry} material={materials.zFdeDaGNRwzccye} />
          
          <mesh castShadow receiveShadow geometry={nodes.xXDHkMplTIDAXLN.geometry} material={materials.pIJKfZsazmcpEiU} />
          <mesh  castShadow receiveShadow geometry={nodes.AQkWXGdRSkSZMav.geometry} material={materials.ujsvqBWRMnqdwPx} >
            <Html
            occlude
            transform
            scale={3}

            // rotation={[10,0,10]}
            position={[0,9,-2]}>
            <button className='iconButton' style={{ color: "white" }} onClick={handleButtonClick}>{zoomactive?
          <svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
strokeWidth="1.5"
stroke="currentColor"
className="w-6 h-6"
>
<path
  strokeLinecap="round"
  strokeLinejoin="round"
  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
/>
</svg>
:<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
strokeWidth="1.5"
stroke="currentColor"
className="w-6 h-6"
>
<path
  strokeLinecap="round"
  strokeLinejoin="round"
  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
/>
</svg>
}        


          </button>
            </Html>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.aGrbyjnzqoVJenz.geometry} material={materials.xNrofRCqOXXHVZt} />
          
          <mesh castShadow receiveShadow geometry={nodes.EbQGKrWAqhBHiMv.geometry} material={materials.TBLSREBUyLMVtJa} />
          <mesh castShadow receiveShadow geometry={nodes.EddVrWkqZTlvmci.geometry} material={materials.xNrofRCqOXXHVZt} />
          <mesh castShadow receiveShadow geometry={nodes.IMPDFDiRXhPIUMV.geometry} material={materials.hUlRcbieVuIiOXG} />
          <mesh castShadow receiveShadow geometry={nodes.KSWlaxBcnPDpFCs.geometry} material={materials.yQQySPTfbEJufve} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/iphone.glb')