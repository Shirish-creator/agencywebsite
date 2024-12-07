import "@/styles/globals.css";
import "@/styles/style.scss";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Dynamically import the Threed component to ensure it renders only on the client side
const Threed = dynamic(() => import("@/components/threedworld"), { ssr: false });

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {/* Persistent 3D Background */}
        <Threed />
      

      {/* Page Analytics */}
      <Analytics />

      {/* Page Content */}
     
      <div style={{pointerEvents:'none'}} className="fixed w-full top-0 left-0 ">
    <Component {...pageProps} />
  
</div>      
    </>
  );
}
