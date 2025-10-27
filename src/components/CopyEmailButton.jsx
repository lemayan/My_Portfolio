import { useState, useEffect } from "react";
import {AnimatePresence, motion} from "motion/react";


const CopyEmailButton = () => {
    const [copied, setCopied] = useState(false);
    const [glowing, setGlowing] = useState(false);
    const email = "lemayanleleina@gmail.com";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            setGlowing(true);
            setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
            setTimeout(() => setGlowing(false), 3000); // Reset glow effect after 3 seconds
        }).catch(err => {
            console.error('Failed to copy email: ', err);
        });
    }

  return (
  <motion.button 
    onClick={copyToClipboard}
    whileHover={{y: -5}}
    whileTap={{y: 1.05}}
    className={`relative px-4 py-2 text-sm text-center rounded-full font-extralight 
      bg-primary w-[14rem] cursor-pointer overflow-hidden transition-all duration-300
      ${glowing ? 'glow-effect shadow-lg' : ''}`}
    style={{
      boxShadow: glowing ? '0 0 10px #57db96, 0 0 20px #33c2cc, 0 0 30px #7a57db' : 'none',
    }}
  >
    {/* Glow effect overlay */}
    {glowing && (
      <motion.div 
        className="absolute inset-0 rounded-full opacity-30"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.2, 0.4, 0.2], 
          background: ['#57db96', '#33c2cc', '#7a57db', '#33c2cc', '#57db96'] 
        }}
        transition={{ 
          duration: 2,
          repeat: 1,
          repeatType: "reverse"
        }}
      />
    )}
    
    <AnimatePresence mode="wait">
      {copied ? (
        <motion.div 
          className="flex items-center justify-center gap-2 whitespace-nowrap"
          key="copied"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <img src="assets/copy-done.svg" className="w-5" alt="Copy Icon" />
          <span>Email copied!</span>
        </motion.div>
      ) : (
        <motion.div 
          className="flex items-center justify-center gap-2"
          key="copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <img src="assets/copy.svg" className="w-5" alt="Copy Icon" />
          Copy Email Address
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);
};

export default CopyEmailButton;