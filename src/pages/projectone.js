import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState,useRef,useEffect } from "react";
import { useFrame } from "react-three-fiber";

import Script from "next/script";
import Hotjar from '@hotjar/browser';
import Stats from "stats.js";
import { Effect } from "@/components/fluidsimulation";
import Link from "next/link";


export default function Projectone() {


 
 

  return (
    <>
    <Head>
    <title>Project One</title>
    </Head>
    
  
    <section className="w-full h-screen flex text-white  relative px-44" >
   
    <div className="flex flex-col" style={{pointerEvents:'all'}}>
      <p className="text-white">Project One</p>
      <Link href={'/'} className="mt-2"> Back</Link>
    </div>

    </section>
    

    
    
    </>
  );
}
