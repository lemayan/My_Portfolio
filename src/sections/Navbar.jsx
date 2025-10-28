import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {motion} from "motion/react";

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
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary">
      <div className='mx-auto c-space max-w-7xl'>
        <div className='flex items-center justify-between py-2 sm:py-0'>
          {/* Logo and Name on the left */}
          <div className="flex items-center gap-3">
            <a 
              onClick={() => navigate('/')}
              className="cursor-pointer">
              <img 
                src="/assets/logos/morancoder.png" 
                alt="Logo" 
                className="h-12 w-auto hover:scale-105 transition-transform" 
                style={{ mixBlendMode: 'screen' }}
              />
            </a>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Lemayan Leleina
            </h1>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className='flex cursor-pointer text-neutral-500 sm:hidden focus-outline-none'>
            <img src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"} className='w-6 h-6' alt="menu" />
          </button>
          
          {/* Desktop nav on the right */}
          <div className="hidden sm:flex items-center">
            <nav className='flex'>
              <Navigation />
            </nav>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div 
          className='block overflow-hidden sm:hidden text-center' 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }} 
          style={{ maxHeight: "100vh" }}
        >
          <nav className='pb-s'>
            <Navigation onClick={() => setIsOpen(false)} />
          </nav>
        </motion.div>
      )}  
    </div>
  )
}

export default Navbar