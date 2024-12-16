import { motion } from "framer-motion"; // Import framer-motion
import Head from "next/head";
import Link from "next/link";

export default function Projectone({ projectTrigger, setProjectTrigger }) {
  return (
    <>
      <Head>
        <title>Project One</title>
      </Head>

      {/* Animated Section */}
      <motion.div
        className="w-full absolute h-screen bg-red-500" // Style for the section
        style={{ zIndex: 5,pointerEvents:'all' }}
        initial={{ y: '-100%' }} // Initially placed above the viewport (off-screen)
        animate={{ y: projectTrigger ? 0 : '-100%' }} // Slide into the viewport when `projectTrigger` is true
        transition={{
          type: 'spring',
          stiffness: 100, // Adjust stiffness for smoother transition
          damping: 25,    // Add damping for smoother stop
          ease: "easeOut", // Make the transition smoother at the end
          duration: 1, // Duration for the slide-in and slide-out transition
          delay: projectTrigger ? 0 : 0.2, // Add a delay when closing (for smoother exit)
        }} // Smooth slide-in effect with ease-out
      >
        <p className="text-white">Hello</p>
        <section className="w-100 h-fit flex relative px-44">
          <div className="text-white flex flex-row gap-8" style={{ pointerEvents: 'all' }}>
            <p className="text-white">Company Logo</p>
            <Link href={'/'}>Back</Link>
            <button onClick={() => setProjectTrigger((prev) => !prev)}>Close back</button>
          </div>
        </section>

        {/* Scrollable Content */}
        <div className="w-full h-full  ">
          <div >
            How are you?
          </div>
        </div>
      </motion.div>
    </>
  );
}
