import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isVisible && type === 'success') {
      // Generate confetti particles
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * -100 - 50,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        color: ['#a855f7', '#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6'][
          Math.floor(Math.random() * 6)
        ],
        delay: Math.random() * 0.3,
      }));
      setConfetti(particles);

      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, type, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Confetti Burst */}
          {type === 'success' && confetti.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                opacity: 1,
                x: '50%',
                y: '50%',
                scale: 0,
                rotate: 0,
              }}
              animate={{
                opacity: 0,
                x: `calc(50% + ${particle.x}vw)`,
                y: `calc(50% + ${particle.y}vh)`,
                scale: particle.scale,
                rotate: particle.rotation,
              }}
              transition={{
                duration: 1.5,
                delay: particle.delay,
                ease: 'easeOut',
              }}
              className="fixed top-1/2 left-1/2 z-50 pointer-events-none"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: particle.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
            />
          ))}

          {/* Success Message with Pop Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: [0.3, 1.1, 1],
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
              duration: 0.5,
              scale: {
                times: [0, 0.6, 1],
                duration: 0.5,
              }
            }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div
              className={`flex items-center gap-4 px-8 py-6 rounded-2xl shadow-2xl backdrop-blur-md border-2 ${
                type === 'success'
                  ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-purple-400/50'
                  : type === 'error'
                  ? 'bg-red-500/30 border-red-400/50'
                  : 'bg-blue-500/30 border-blue-400/50'
              }`}
            >
              {/* Animated Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex-shrink-0"
              >
                {type === 'success' ? (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      repeatDelay: 1
                    }}
                  >
                    <svg
                      className="w-10 h-10 text-green-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </motion.div>
                ) : type === 'error' ? (
                  <svg
                    className="w-10 h-10 text-red-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                ) : null}
              </motion.div>

              {/* Message */}
              <p className="text-xl font-bold text-white">{message}</p>

              {/* Close button */}
              <button
                onClick={onClose}
                className="flex-shrink-0 ml-2 text-white/60 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Toast;
