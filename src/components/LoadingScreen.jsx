import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress - 2 seconds total
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 200);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary overflow-hidden"
    >
      {/* Animated background particles - Sparkling stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            {/* Star shape */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
                fill={Math.random() > 0.5 ? '#a855f7' : '#3b82f6'}
                opacity="0.6"
              />
              {/* Sparkle effect */}
              <path
                d="M12 0L13 6L18 8L13 10L12 16L11 10L6 8L11 6L12 0Z"
                fill="white"
                opacity="0.8"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-8 z-10">
        {/* Logo with shake animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: [0.5, 1.1, 1],
            opacity: 1,
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 0.8,
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="relative z-10"
        >
          <img
            src="/assets/logos/morancoder.png"
            alt="Morancoder Logo"
            className="w-32 h-32 object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
