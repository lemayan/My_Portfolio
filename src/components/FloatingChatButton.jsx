import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AIChatbot from './AIChatbot';

const FloatingChatButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [wanderPhase, setWanderPhase] = useState('idle'); // idle | wandering | resting
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timerRef = useRef(null);
  const wanderTimerRef = useRef(null);

  // Predefined positions relative to rest spot (not random chaos)
  const wanderSpots = [
    { x: -60, y: -100 },
    { x: -150, y: -50 },
    { x: -80, y: -200 },
    { x: -200, y: -120 },
    { x: -30, y: -300 },
    { x: -250, y: -80 },
    { x: 0, y: 0 }, // back home
  ];

  const startWandering = () => {
    if (showChat) return;
    setWanderPhase('wandering');
    
    let spotIndex = 0;
    
    const moveNext = () => {
      if (spotIndex >= wanderSpots.length) {
        // Done wandering, go home
        setPosition({ x: 0, y: 0 });
        setWanderPhase('resting');
        // Schedule next wander cycle
        timerRef.current = setTimeout(() => {
          if (!showChat) startWandering();
        }, 15000);
        return;
      }
      
      setPosition(wanderSpots[spotIndex]);
      spotIndex++;
      wanderTimerRef.current = setTimeout(moveNext, 2000);
    };
    
    moveNext();
  };

  // Start idle timer
  useEffect(() => {
    if (!showChat) {
      timerRef.current = setTimeout(startWandering, 6000);
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (wanderTimerRef.current) clearTimeout(wanderTimerRef.current);
    };
  }, [showChat]);

  const handleClick = () => {
    // Stop all wandering
    if (timerRef.current) clearTimeout(timerRef.current);
    if (wanderTimerRef.current) clearTimeout(wanderTimerRef.current);
    setPosition({ x: 0, y: 0 });
    setWanderPhase('idle');
    setShowChat(true);
  };

  const handleClose = () => {
    setShowChat(false);
    // Restart idle timer after closing
    timerRef.current = setTimeout(startWandering, 10000);
  };

  const handleHoverStart = () => {
    setIsHovered(true);
    // Pause wandering on hover - snap to current spot
    if (wanderTimerRef.current) clearTimeout(wanderTimerRef.current);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    // If was wandering, continue
    if (wanderPhase === 'wandering') {
      setPosition({ x: 0, y: 0 });
      setWanderPhase('resting');
      timerRef.current = setTimeout(startWandering, 12000);
    }
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className="fixed bottom-24 right-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-fuchsia-600 shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center overflow-hidden border-4 border-white/20 cursor-pointer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1.2 : 1, 
          opacity: 1,
          x: position.x,
          y: position.y,
          rotate: wanderPhase === 'wandering' && !isHovered ? [0, -5, 5, 0] : 0,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ 
          type: 'spring', 
          stiffness: 150, 
          damping: 15,
          opacity: { delay: 0.5 },
          rotate: { duration: 0.5, repeat: Infinity }
        }}
      >
        {/* Maasai Man Image */}
        <img 
          src="/assets/maasai-avatar.jpg" 
          alt="Chat with Dennis" 
          className="w-full h-full object-cover pointer-events-none"
        />
        
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-purple-500/30 pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center pointer-events-none">
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* Tooltip - shows when wandering or hovered */}
        <AnimatePresence>
          {(wanderPhase === 'wandering' || isHovered) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none"
            >
              {isHovered ? "Click me! 👋" : "Chat with me! 💬"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && <AIChatbot onClose={handleClose} />}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatButton;
