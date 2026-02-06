import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {motion, AnimatePresence} from "motion/react";

function Navigation({ onClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 150; // Offset for navbar

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navbarHeight = 80; // Adjust this value based on your navbar height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80; // Adjust this value based on your navbar height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    if (onClick) onClick();
  };

  return <ul className='nav-ul'>
    <li className='nav-li'>
      <a 
        className={`nav-link cursor-pointer ${activeSection === 'home' ? 'bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold' : ''}`}
        onClick={() => handleNavClick('home')}
      >
        Home
      </a>
    </li>
    <li className='nav-li'>
      <a 
        className={`nav-link cursor-pointer ${activeSection === 'about' ? 'bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold' : ''}`}
        onClick={() => handleNavClick('about')}
      >
        About
      </a>
    </li>
    <li className='nav-li'>
      <a 
        className={`nav-link cursor-pointer ${activeSection === 'work' ? 'bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold' : ''}`}
        onClick={() => handleNavClick('work')}
      >
        Projects
      </a>
    </li>
    <li className='nav-li'>
      <a 
        className={`nav-link cursor-pointer ${activeSection === 'experience' ? 'bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold' : ''}`}
        onClick={() => handleNavClick('experience')}
      >
        Experience
      </a>
    </li>
    <li className='nav-li'>
      <a 
        className={`nav-link cursor-pointer ${activeSection === 'contact' ? 'bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold' : ''}`}
        onClick={() => handleNavClick('contact')}
      >
        Contact
      </a>
    </li>
  </ul>
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="fixed inset-x-0 z-50 w-full nav-surface">
      <div className='mx-auto c-space max-w-7xl'>
        <div className='flex items-center justify-between py-4'>
          {/* Logo and Name on the left */}
          <div className="flex items-center gap-3">
            <a 
              onClick={() => navigate('/')}
              className="cursor-pointer group">
              <img 
                src="/assets/logos/morancoder.png" 
                alt="Logo" 
                className="h-12 w-auto transition-transform group-hover:scale-105" 
                style={{ mixBlendMode: 'screen' }}
              />
            </a>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Lemayan Leleina
            </h1>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className='flex cursor-pointer text-neutral-400 hover:text-white sm:hidden focus-outline-none transition-colors'>
            <img src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"} className='w-6 h-6' alt="menu" />
          </button>
          
          {/* Desktop nav on the right */}
          <div className="hidden sm:flex items-center gap-6">
            <nav className='flex'>
              <Navigation />
            </nav>
            
            {/* Let's Play Button */}
            <motion.button
              onClick={() => navigate('/games')}
              className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
                Let's Play
              </span>
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.4)',
                    '0 0 40px rgba(236, 72, 153, 0.6)',
                    '0 0 20px rgba(168, 85, 247, 0.4)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div 
          className='block overflow-hidden sm:hidden backdrop-blur-xl bg-black/50 border-t border-white/10' 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: "auto" }} 
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className='pb-4'>
            <Navigation onClick={() => setIsOpen(false)} />
          </nav>
          
          {/* Mobile Let's Play Button */}
          <div className="px-4 pb-4">
            <button
              onClick={() => {
                navigate('/games');
                setIsOpen(false);
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-full font-semibold flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
              Let's Play
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Navbar