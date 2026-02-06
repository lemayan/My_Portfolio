import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const AIChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Dennis's AI assistant. Ask me anything about his skills, projects, or experience!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const knowledgeBase = {
    skills: {
      keywords: ['skill', 'skills', 'technology', 'technologies', 'stack', 'know', 'language', 'framework'],
      response: "Dennis is proficient in Python, JavaScript, TypeScript, C++, Solidity, React, Django, Node.js, and more. He's experienced with full-stack development, blockchain technology, and building scalable web applications."
    },
    projects: {
      keywords: ['project', 'projects', 'built', 'made', 'created', 'work', 'portfolio'],
      response: "Dennis has built several impressive projects including:\n• Duma Drones - A drone delivery platform\n• Assessly - An exam and testing application\n• Hospital Management System - Digital healthcare solution\n• Genesis - A blockchain crowdfunding platform\n• Banking Application - Secure banking system"
    },
    experience: {
      keywords: ['experience', 'background', 'work', 'job', 'career'],
      response: "Dennis is a full-stack developer with expertise in building modern web applications. He has experience with blockchain technology, healthcare systems, fintech applications, and drone delivery platforms."
    },
    contact: {
      keywords: ['contact', 'reach', 'email', 'phone', 'hire', 'available'],
      response: "You can reach Dennis via:\n• WhatsApp: +254715197671\n• LinkedIn: linkedin.com/in/dennis-leleina-500a01201\n• Instagram: @__lemayan__\nFeel free to reach out for collaboration opportunities!"
    },
    education: {
      keywords: ['education', 'study', 'learn', 'school', 'university', 'degree'],
      response: "Dennis is a passionate self-learner and software engineer focused on building innovative solutions. He continuously expands his knowledge in web development, blockchain, and emerging technologies."
    },
    blockchain: {
      keywords: ['blockchain', 'crypto', 'web3', 'smart contract', 'solidity', 'ethereum'],
      response: "Dennis has experience with blockchain development, particularly with Solidity and Web3. He built Genesis, a decentralized crowdfunding platform using smart contracts and blockchain technology for transparent fund management."
    },
    default: {
      response: "I'm here to help you learn about Dennis's skills, projects, and experience. You can ask me about his technical skills, portfolio projects, or how to get in touch with him!"
    }
  };

  function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (key !== 'default' && data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.response;
      }
    }
    
    return knowledgeBase.default.response;
  }

  function handleSend() {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card p-6 max-w-2xl w-full h-[600px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Assistant</h2>
              <p className="text-xs text-white/60">Ask me anything about Dennis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] px-4 py-2 rounded-2xl whitespace-pre-line
                  ${message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/10 text-white'
                  }
                `}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/10 text-white px-4 py-2 rounded-2xl">
                <div className="flex gap-1">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  >●</motion.span>
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  >●</motion.span>
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  >●</motion.span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIChatbot;
