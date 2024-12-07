import "@/styles/globals.css";
import "@/styles/style.scss"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script";
import Threed from "@/components/threedworld";


export default function App({ Component, pageProps }) {
  return (
  <>
   <Analytics/>
   <Threed  />

<div style={{pointerEvents:'none'}} className="fixed w-full top-0 left-0 ">
    <Component {...pageProps} />
  
</div>  </>
 )
  
}
