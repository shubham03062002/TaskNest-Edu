"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AuthModal from "./components/AuthModal";
import { useState } from "react";


export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  return (
<main className="relative z-0 min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 to-blue-100 text-gray-800">
<header className="text-center py-6 text-4xl font-bold tracking-widest">
        🎓 TaskNest Edu
      </header>

      <section className="flex-1 flex flex-col md:flex-row items-center justify-between px-8 md:px-20">
        {/* Left Side Image */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/child.jpg" // 👉 Put a cute SVG image in /public
            alt="Mascot"
            width={800}
            height={800}
            
          />
        </motion.div>

        {/* Right Side Text */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left space-y-6 ml-[30]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
                    onClick={() => setOpenModal(true)}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Welcome to Your Learning Adventure!
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
          Here, every challenge becomes a quest, every lesson sparks curiosity, and every student shines bright. With guided learning, joyful discovery, and creative tasks, education feels like an adventure. 📚✨ Together, let’s build habits, confidence, and brilliance — one fun mission at a time. Welcome to learning, reimagined! 🌈🚀
          </p>
        </motion.div>
      </section>

      {/* Get Started Button */}
      
        
      <div className="self-end p-6">
        <button
          onClick={() => setOpenModal(true)}
          className="px-6 py-3 rounded-2xl bg-pink-500 text-white text-lg hover:bg-pink-600 transition duration-300"
        >
          🚀 Get Started
        </button>
      </div>

      <AuthModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </main>
  );
}
