import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import CursorRevealImage from "./CursorRevealImage";
import FloatingParticles from "./FloatingParticles";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#0B0F19] text-white overflow-hidden flex items-center px-6 md:px-16">

      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full"></div>

      <FloatingParticles />

      <div className="grid md:grid-cols-2 gap-16 items-center w-full z-10">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >

          <p className="text-purple-400 mb-4 text-lg">
            FULL STACK DEVELOPER
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Building <span className="text-purple-500">Modern</span><br />
            Digital Experiences
          </h1>

          <p className="text-gray-400 mt-6 text-lg leading-relaxed max-w-xl">
            Python Full Stack Developer specializing in
            Django, React, APIs, automation systems,
            and premium frontend experiences.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">

            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-all duration-300 font-medium">
              View Projects
            </button>

            <button className="px-6 py-3 border border-gray-700 hover:border-purple-500 rounded-xl transition-all duration-300 font-medium">
              Download Resume
            </button>

          </div>

          {/* Social Icons */}
          <div className="flex gap-5 mt-8 text-2xl">

            <a href="#">
              <FaGithub className="hover:text-purple-500 transition-all duration-300" />
            </a>

            <a href="#">
              <FaLinkedin className="hover:text-purple-500 transition-all duration-300" />
            </a>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <CursorRevealImage />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;