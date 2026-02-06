import { motion } from "motion/react";

const MarqueeTicker = ({ items = [], className = "" }) => {
  return (
    <div className={`relative overflow-hidden py-4 ${className}`}>
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#06060c] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#06060c] to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling content - duplicate for seamless loop */}
      <div className="flex">
        <motion.div
          className="flex flex-shrink-0 gap-8 pr-8"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...items, ...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-2xl md:text-3xl font-bold text-white/10 uppercase tracking-wider whitespace-nowrap"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MarqueeTicker;
