import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const AIChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Lemayan's AI assistant powered by Groq. Ask me anything about his skills, projects, or experience!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function generateResponse(conversationHistory) {
    try {
      // Use relative URL to avoid CORS redirect issues
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationHistory
        })
      });


   

      const data = await response.json();
      
      if (!response.ok) {
        console.error('API Error Details:', data);
        throw new Error(data.error || data.details || 'Failed to get response from AI');
      }

      return data.message;
    } catch (error) {
      console.error('AI Error Full Details:', error);
      throw error;
    }
  }

  async function handleSend() {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    const newUserMessage = { role: 'user', content: userMessage };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);
    setStreamingMessage('');

    try {
      const conversationHistory = [...messages, newUserMessage].slice(-10);
      let aiResponse = await generateResponse(conversationHistory);
      
      // Strip any markdown formatting (**, *, ##, etc.)
      aiResponse = aiResponse
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^[-•]\s+/gm, '  \u2022 ');
      
      // Add a short thinking delay so it feels natural
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setError(error.message);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '❌ Sorry, I encountered an error. Please make sure the Groq API is configured correctly.' 
      }]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="glass-card p-3 sm:p-6 max-w-2xl w-full h-[85vh] sm:h-[600px] sm:max-h-[85vh] flex flex-col relative overflow-hidden rounded-t-3xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-fuchsia-500/5 animate-pulse" />
        
        {/* Mobile drag indicator */}
        <div className="sm:hidden flex justify-center py-2 relative z-10">
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <motion.div 
              className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-fuchsia-600 flex items-center justify-center border-2 border-white/20 shadow-lg overflow-hidden"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.5)',
                  '0 0 30px rgba(168, 85, 247, 0.8)',
                  '0 0 20px rgba(168, 85, 247, 0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img 
                src="/assets/maasai-avatar.jpg" 
                alt="Dennis" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="truncate">Dennis's AI</span>
                <motion.span
                  className="w-2 h-2 flex-shrink-0 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </h2>
              <p className="text-xs text-white/60 truncate">Ask me anything! 💬</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-white/60 hover:text-white transition-all hover:rotate-90 duration-300 p-1"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-3 sm:mb-4 space-y-3 sm:space-y-4 relative z-10 custom-scrollbar px-1">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`flex gap-1.5 sm:gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Maasai avatar for AI messages */}
                {message.role === 'assistant' && (
                  <motion.div 
                    className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-fuchsia-600 flex items-center justify-center border-2 border-white/20 overflow-hidden"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <img 
                      src="/assets/maasai-avatar.jpg" 
                      alt="AI" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`
                    max-w-[85%] sm:max-w-[80%] px-3 py-2 sm:px-4 sm:py-3 rounded-2xl sm:rounded-2xl whitespace-pre-line shadow-lg text-sm sm:text-base
                    ${message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-md'
                      : 'bg-gradient-to-r from-white/10 to-white/5 text-white backdrop-blur-sm border border-white/10 rounded-tl-md'
                    }
                  `}
                  style={message.role === 'assistant' ? { fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.01em' } : {}}
                >
                  {message.content}
                </motion.div>
              </motion.div>
            ))}
            
            {/* Streaming message */}
            {streamingMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-1.5 sm:gap-2 justify-start"
              >
                <motion.div 
                  className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 flex items-center justify-center border-2 border-white/20 overflow-hidden"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <img 
                    src="/assets/maasai-avatar.jpg" 
                    alt="AI" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="max-w-[85%] sm:max-w-[80%] px-3 py-2 sm:px-4 sm:py-3 rounded-2xl rounded-tl-md whitespace-pre-line bg-gradient-to-r from-white/10 to-white/5 text-white backdrop-blur-sm border border-white/10 shadow-lg text-sm sm:text-base">
                  {streamingMessage}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1 h-4 ml-1 bg-orange-500"
                  />
                </div>
              </motion.div>
            )}
          
            {/* Typing indicator */}
            {isTyping && !streamingMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-1.5 sm:gap-2 justify-start"
              >
                <motion.div 
                  className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 flex items-center justify-center border-2 border-white/20 overflow-hidden"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <img 
                    src="/assets/maasai-avatar.jpg" 
                    alt="AI" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="bg-gradient-to-r from-white/10 to-white/5 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-2xl rounded-tl-md backdrop-blur-sm border border-white/10 shadow-lg">
                  <div className="flex gap-1.5">
                    <motion.span
                      className="w-2 h-2 bg-purple-500 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="w-2 h-2 bg-orange-500 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span
                      className="w-2 h-2 bg-purple-500 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2 relative z-10 safe-bottom">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={isTyping}
            className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <motion.button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white text-sm sm:text-base font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              {isTyping ? (
                <motion.svg 
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </motion.svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
              <span className="hidden sm:inline">Send</span>
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIChatbot;
