import React, { useState } from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import Navbar from "./sections/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Projects from "./sections/Projects"
import Experiences from "./sections/Experiences"
import Testimonial from "./sections/Testimonial"
import Blog from "./sections/Blog"
import Contact from "./sections/Contact"
import Footer from "./sections/Footer"
import Terms from "./sections/Terms"
import Privacy from "./sections/Privacy"
import ScrollToTop from "./components/ScrollToTop"
import LoadingScreen from "./components/LoadingScreen"
import SectionReveal from "./components/SectionReveal"
import CursorGlow from "./components/CursorGlow"

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const HomePage = () => (
  <>
    <div id="home"><Hero /></div>
    <SectionReveal><div id="about"><About /></div></SectionReveal>
    <SectionReveal><div id="work"><Projects /></div></SectionReveal>
    <SectionReveal><div id="experience"><Experiences /></div></SectionReveal>
    <SectionReveal><Testimonial /></SectionReveal>
    <SectionReveal><div id="blog"><Blog /></div></SectionReveal>
    <SectionReveal><div id="contact"><Contact /></div></SectionReveal>
  </>
)

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoadingComplete = () => {
    setIsLoading(false);
    navigate('/');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      
      <div className='app-shell' style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        <CursorGlow />
        <div className='container mx-auto max-w-7xl'>
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
            </Routes>
          </AnimatePresence>
          <Footer />
          <ScrollToTop />
        </div>
      </div>
    </>
  )
}

export default App