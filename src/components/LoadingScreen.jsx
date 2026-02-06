import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate progress from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#06060c] via-[#0f0820] to-[#06060c] overflow-hidden"
    >
      {/* Animated background orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Logo */}
      <motion.div
        className="mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img
          src="/assets/logos/morancoder.png"
          alt="Logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain"
        />
      </motion.div>

      {/* Progress bar and percentage */}
      <motion.div
        className="w-64 md:w-80"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Percentage */}
        <div className="mb-4 text-center">
          <motion.span
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            key={progress}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.floor(progress)}%
          </motion.span>
        </div>

        {/* Progress bar background */}
        <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-xl">
          {/* Animated gradient bar */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, #6366f1, #ec4899, #22d3ee)",
              backgroundSize: "200% 100%",
            }}
            initial={{ width: "0%" }}
            animate={{
              width: `${progress}%`,
              backgroundPosition: ["0% 0%", "100% 0%"],
            }}
            transition={{
              width: { duration: 0.1, ease: "linear" },
              backgroundPosition: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />

          {/* Glow effect */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full blur-sm"
            style={{
              background: "linear-gradient(90deg, #6366f1, #ec4899)",
              width: `${progress}%`,
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className="mt-4 text-center text-sm text-white/60 tracking-widest uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading Experience...
        </motion.p>
      </motion.div>

      {/* Decorative dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
