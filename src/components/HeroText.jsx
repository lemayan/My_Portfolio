import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const words = ["innovative", "responsive", "user-friendly"];

const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
};

const HeroText = () => {
    return (
        <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl md:ml-20 lg:ml-32">
            {/* Desktop View */}
            <div className="flex-col hidden md:flex c-space">
                <motion.h1
                    className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1 }}
                >
                    Hi I'm nomadxcoder
                </motion.h1>
                <div className="flex flex-col items-start mt-4">
                    <motion.p
                        className="text-5xl font-bold text-white drop-shadow-lg"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.2 }}
                    >
                        A Developer<br /> 
                        <span className="text-neutral-300">Dedicated to Crafting</span>
                    </motion.p>
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.5 }}
                        className="my-2"
                    >
                        <FlipWords
                            words={["Innovative", "Responsive", "User-Friendly"]}
                            className="font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-7xl"
                        />
                    </motion.div>
                    <motion.p
                        className="text-4xl font-bold text-white drop-shadow-lg"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.8 }}
                    >
                        Web Solutions
                    </motion.p>
                    
                    {/* Download CV Button */}
                    <motion.a
                        href="/assets/resume.pdf"
                        download
                        className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 group"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 2.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download CV
                    </motion.a>
                </div>
            </div>
            {/* Mobile View */}
            <div className="flex flex-col space-y-6 md:hidden">
                <motion.p
                    className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1 }}
                >
                    Hi I'm nomadxcoder
                </motion.p>
                <div>
                    <motion.p
                        className="text-5xl font-black text-white drop-shadow-lg"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.2 }}
                    >
                        Building
                    </motion.p>
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.5 }}
                        className="my-2"
                    >
                        <FlipWords
                            words={["Innovative", "Responsive", "User-Friendly"]}
                            className="font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-6xl"
                        />
                    </motion.div>
                    <motion.p
                        className="text-4xl font-black text-white drop-shadow-lg"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.8 }}
                    >
                        Web Applications
                    </motion.p>
                </div>
                
                {/* Download CV Button - Mobile */}
                <motion.a
                    href="/assets/resume.pdf"
                    download
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 mx-auto group"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 2.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CV
                </motion.a>
            </div>
        </div>
    );
};

export default HeroText;