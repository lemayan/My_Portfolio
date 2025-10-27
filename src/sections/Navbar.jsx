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
    <li className='nav-li'>
      <a 
        href="/assets/Dennis_Lemayan_CV.pdf" 
        download="Dennis_Lemayan_Leleina_CV.pdf"
        className='px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 flex items-center gap-2'
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download CV
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
          <a 
            onClick={() => navigate('/')}
            className="cursor-pointer">
            <img 
              src="/assets/logos/morancoder.png" 
              alt="Lemayan Leleina Logo" 
              className="h-12 w-auto hover:scale-105 transition-transform" 
              style={{ mixBlendMode: 'screen' }}
            />
          </a>

          <button onClick={() => setIsOpen(!isOpen)} className='flex cursor-pointer text-neutral-500 sm:hidden focus-outline-none'>
            <img src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"} className='w-6 h-6' alt="menu" />
          </button>
          <nav className='hidden sm:flex'>
            <Navigation />
          </nav>
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