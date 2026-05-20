import { motion } from "framer-motion";

const particles = [...Array(15)];

const FloatingParticles = () => {
  return (
    <>
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -100, 100],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </>
  );
};

export default FloatingParticles;