import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar({ handleClickNav, nav }) {
  const variants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        type: "tween", // Use a linear tween for smooth expansion
        duration: 0.5, // Adjust the duration as needed
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        type: "tween", // Use a linear tween for smooth collapse
        duration: 0.5, // Adjust the duration as needed
      },
    },
  };

  return (
    <>
      <div className={`md:hidden flex justify-between mx-5 mt-2`}>
        <Link href={"/"} className="font-Adam font-extrabold text-2xl">
          Cloudisk.
        </Link>
        <div onClick={handleClickNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
      <AnimatePresence>
        {nav && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            className="md:hidden  bg-[#eff2f4] p-3 text-lg"
          >
            <div className="ml-4 space-y-3 flex flex-col">
              <Link href={"/"}>Home</Link>
              <Link href={"/pro"}>Premium</Link>
              <Link href={"/stat"}>Stat</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
