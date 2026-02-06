import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ChessGame from './ChessGame';
import AIChatbot from './AIChatbot';

const FloatingActions = () => {
  const [showChess, setShowChess] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      label: 'AI Chat',
      onClick: () => setShowChat(true),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 22H5c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2zM5 4v16h14V4H5zm2 2h10v10H7V6z" />
        </svg>
      ),
      label: 'Play Chess',
      onClick: () => setShowChess(true),
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col-reverse items-end gap-3">
        {/* Action Buttons */}
        <AnimatePresence>
          {isExpanded && actions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={action.onClick}
              className={`
                group flex items-center gap-3 px-4 py-3 rounded-full
                bg-gradient-to-r ${action.gradient}
                text-white font-semibold shadow-lg
                hover:shadow-xl hover:scale-105 transition-all
              `}
            >
              <span className="text-sm">{action.label}</span>
              {action.icon}
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isExpanded ? 45 : 0 }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </motion.button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showChess && <ChessGame onClose={() => setShowChess(false)} />}
        {showChat && <AIChatbot onClose={() => setShowChat(false)} />}
      </AnimatePresence>
    </>
  );
};

export default FloatingActions;
