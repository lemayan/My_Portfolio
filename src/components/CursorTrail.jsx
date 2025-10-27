import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)',
        }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />

      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 border-2 border-purple-400/30"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.8
        }}
      />

      {/* Trail particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-40"
          style={{
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(59, 130, 246, 0.4)'
            } 0%, transparent 100%)`,
          }}
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: [1, 0],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.05,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;
