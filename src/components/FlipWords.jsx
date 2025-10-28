import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FlipWords = ({ words, duration = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[currentIndex]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="inline-block text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
      >
        {words[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );
};

export default FlipWords;