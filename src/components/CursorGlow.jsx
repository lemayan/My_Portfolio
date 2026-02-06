import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 rounded-full"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        width: '20px',
        height: '20px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(236, 72, 153, 0.6) 50%, transparent 100%)',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(236, 72, 153, 0.4)',
      }}
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default CursorGlow;
