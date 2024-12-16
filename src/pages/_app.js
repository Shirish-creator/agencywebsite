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

  const triggerProject = () => {
    setProjectTrigger((prev) => !prev);
  };
  return (
    <>
      {/* Persistent 3D Background */}
        <Threed />
      

      {/* Page Analytics */}
      <Analytics />

      {/* Page Content */}

      <div style={{pointerEvents:'none',fontFamily:"Clash Grotesk"}} className="fixed top-0 left-0  w-full">
      <section className="text-white absolute h-full  w-full " style={{zIndex:1,width:'100%'}}> 
        <div className=" mx-auto my-60" style={{width:'930px'}}> 
          <div className="max-w-lg">
          <p className=" text-lg" style={{color:'#1276aa'}}>Client:  <span className="font-semibold">StudioGusto</span></p>

            <h1 className=" mt-4 text-6xl text-red-400">Boom&Bloom</h1>
            <p className="mt-2 text-md " style={{color:'#1276aa'}}>Role: UX/ UI/ Development/ 3D Design</p>
            <p className="mt-5 text-xl font-medium text-blue-900" style={{color:'#1276aa',maxWidth:'90%'}}>In an era of digital evolution, Boom & Bloom merges as a catalyst for innovation, a haven for boundles creativity.</p>
              <button onClick={triggerProject} style={{pointerEvents:'all',boxShadow:'0 0 40px 5px rgba(228,103,103,.6)'}} className="px-6 py-3 mt-8 bg-red-400 text-lg">View Project</button>
  
     </div>
        </div>
      </section>

    <Component {...pageProps}  projectTrigger={projectTrigger}
          setProjectTrigger={setProjectTrigger} />
  
</div>      
    </>
  );
}
