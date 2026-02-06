import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const words = ["Innovative", "Responsive", "User-Friendly"];

const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const HeroText = () => {
    return (
        <div className="text-center max-w-5xl mx-auto px-4">
            {/* Greeting */}
            <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-4"
            >
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white/70 border border-white/10 bg-white/5 backdrop-blur-xl">
                    Hello! I'm
                </span>
            </motion.div>

            {/* Name */}
            <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7, duration: 0.6 }}
            >
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    NOMADXCODER
                </span>
            </motion.h1>

            {/* Subtitle with flip words */}
            <motion.div
                className="flex flex-col items-center gap-4 mb-8"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.9, duration: 0.6 }}
            >
                <p className="text-xl md:text-2xl text-white/60">
                    A Developer Dedicated to Crafting
                </p>
                <div className="min-h-[60px] md:min-h-[80px] flex items-center">
                    <FlipWords
                        words={words}
                        duration={4000}
                        className="font-black text-5xl md:text-6xl lg:text-7xl text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text"
                    />
                </div>
                <p className="text-xl md:text-2xl text-white/60">
                    Web Solutions
                </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.1, duration: 0.6 }}
            >
                <a 
                    href="/assets/LELEINA DENNIS LEMAYAN_CV.pdf" 
                    download="LELEINA DENNIS LEMAYAN_CV.pdf"
                    className="btn-primary inline-flex items-center gap-3 group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CV
                </a>
            </motion.div>
        </div>
    );
};

export default HeroText;