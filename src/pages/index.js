import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState,useRef,useEffect } from "react";
import { useFrame } from "react-three-fiber";

import Script from "next/script";
import Hotjar from '@hotjar/browser';
import Stats from "stats.js";
import Link from "next/link";


export default function Home() {


 
 

  return (
    <>
    <Head>
    <title>Agency Website</title>
    </Head>
    
  
    <section className="w-100 h-screen flex   relative px-44" >
   <div className="text-white" style={{pointerEvents:'all'}}>
     
      <p className="text-white">Hello</p>
      <Link href={'projectone'}> Project One</Link>
   </div>
    </section>
    

    
    
    </>
  );
}
