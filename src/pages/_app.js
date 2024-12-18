import "@/styles/globals.css";
import "@/styles/style.scss";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

// Dynamically import the Threed component to ensure it renders only on the client side
const Threed = dynamic(() => import("@/components/threedworld"), { ssr: false });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [projectTrigger,setProjectTrigger]=useState(false)
  const [buttonTrigger,setButtonTrigger]=useState(false)

  const triggerProject = () => {
    setProjectTrigger((prev) => !prev);
  };

  const buttonTriggerFunction = () => {
    setButtonTrigger(true); // Set to true immediately
    setTimeout(() => {
      setButtonTrigger(false); // After 1 second, set to false
    }, 500); // 1000ms = 1 second
  };

  return (
    <>
      {/* Persistent 3D Background */}
        <Threed buttonTrigger={buttonTrigger} />
      

      {/* Page Analytics */}
      <Analytics />

      {/* Page Content */}

      <div style={{pointerEvents:'none',fontFamily:"Clash Grotesk"}} className="fixed top-0 left-0  w-full">
      <section className="text-white absolute h-full  w-full " style={{zIndex:1,width:'100%'}}> 
        <div className=" mx-auto  flex flex-col justify-end h-screen  max-w-5xl" > 
          <div className="max-w-lg mx-6 mb-32 xl:mb-44">
          <p className="text:md xl:text-lg" style={{color:'#1276aa'}}>Client:  <span className="font-semibold">StudioGusto</span></p>

            <h1 className=" mt-4 text-4xl lg:text-6xl text-red-400">Boom&Bloom</h1>
            <p className="mt-2 text-md " style={{color:'#1276aa'}}>Role: UX/ UI/ Development/ 3D Design</p>
            <p className="mt-5 text-lg lg:text-xl font-medium text-blue-900" style={{color:'#1276aa'}}>In an era of digital evolution, Boom & Bloom merges as a catalyst for innovation, a haven for boundles creativity.</p>
              <button onPointerDown={buttonTriggerFunction} onMouseEnter={buttonTriggerFunction} onClick={triggerProject} style={{pointerEvents:'all',boxShadow:'0 0 40px 5px rgba(228,103,103,.6)'}} className="px-6 py-3 mt-8 bg-red-400 text-lg">View Project</button>
  
     </div>
        </div>
      </section>

    <Component {...pageProps}  projectTrigger={projectTrigger}
          setProjectTrigger={setProjectTrigger} />
  
</div>      
    </>
  );
}
