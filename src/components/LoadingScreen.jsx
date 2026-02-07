import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [stage, setStage] = useState('bouncing'); // 'bouncing', 'connecting', 'complete'

  useEffect(() => {
    // Stage 1: Bouncing (2 seconds)
    const bounceTimer = setTimeout(() => {
      setStage('connecting');
    }, 2000);

    // Stage 2: Connecting (1 second)
    const connectTimer = setTimeout(() => {
      setStage('complete');
    }, 3000);

    // Stage 3: Exit (0.8 seconds)
    const exitTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3800);

    return () => {
      clearTimeout(bounceTimer);
      clearTimeout(connectTimer);
      clearTimeout(exitTimer);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'complete' ? 0 : 1 }}
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

      {/* Three Bouncing Dots Container */}
      <div className="flex items-end justify-center gap-4 relative h-24">
        {/* Dot 1 - Purple */}
        <motion.div
          className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg"
          animate={
            stage === 'bouncing'
              ? {
                  y: [0, -50, 0],
                  scale: [1, 1.15, 1],
                }
              : stage === 'connecting'
              ? {
                  x: 0,
                  y: 0,
                  scale: 1,
                }
              : {
                  scale: 0,
                  opacity: 0,
                }
          }
          transition={
            stage === 'bouncing'
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0,
                }
              : {
                  duration: 0.4,
                  ease: "easeOut",
                }
          }
          style={{
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
          }}
        />

        {/* Dot 2 - Pink */}
        <motion.div
          className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg"
          animate={
            stage === 'bouncing'
              ? {
                  y: [0, -50, 0],
                  scale: [1, 1.15, 1],
                }
              : stage === 'connecting'
              ? {
                  x: 0,
                  y: 0,
                  scale: 1,
                }
              : {
                  scale: 0,
                  opacity: 0,
                }
          }
          transition={
            stage === 'bouncing'
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.2,
                }
              : {
                  duration: 0.4,
                  ease: "easeOut",
                }
          }
          style={{
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)',
          }}
        />

        {/* Dot 3 - Blue */}
        <motion.div
          className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg"
          animate={
            stage === 'bouncing'
              ? {
                  y: [0, -50, 0],
                  scale: [1, 1.15, 1],
                }
              : stage === 'connecting'
              ? {
                  x: 0,
                  y: 0,
                  scale: 1,
                }
              : {
                  scale: 0,
                  opacity: 0,
                }
          }
          transition={
            stage === 'bouncing'
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.4,
                }
              : {
                  duration: 0.4,
                  ease: "easeOut",
                }
          }
          style={{
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
          }}
        />

        {/* Connection Line */}
        {stage === 'connecting' && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)',
            }}
          />
        )}
      </div>

      {/* Welcome Text */}
      {stage === 'connecting' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Welcome
          </h2>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
