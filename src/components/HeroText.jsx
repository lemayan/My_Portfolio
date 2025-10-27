import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const words = ["innovative", "responsive", "user-friendly"];

const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
};

const HeroText = () => {
    return (
        <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text md:ml-20 lg:ml-32">
            {/* Desktop View */}
            <div className="flex-col hidden md:flex c-space">
                <motion.h1
                    className="text-3xl font-medium"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1 }}
                >
                    Hi I'm Lemayan Leleina
                </motion.h1>
                <div className="flex flex-col items-start">
                    <motion.p
                        className="text-4xl font-medium text-neutral-300 whitespace-nowrap"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.2 }}
                    >
                        A Developer<br /> Dedicated to Crafting
                    </motion.p>
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.5 }}
                    >
                        <FlipWords
                            words={["Innovative", "Responsive", "User-Friendly"]}
                            className="font-black text-white text-6xl"
                        />
                    </motion.div>
                    <motion.p
                        className="text-3xl font-medium text-neutral-300"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.8 }}
                    >
                        Web Solutions
                    </motion.p>
                </div>
            </div>
            {/* Mobile View */}
            <div className="flex flex-col space-y-6 md:hidden">
                <motion.p
                    className="text-3xl font-medium"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1 }}
                >
                    Hi I'm Lemayan Leleina
                </motion.p>
                <div>
                    <motion.p
                        className="text-5xl font-black font-neutral-300"
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
                    >
                        <FlipWords
                            words={["Innovative", "Responsive", "User-Friendly"]}
                            className="font-black text-white text-6xl"
                        />
                    </motion.div>
                    <motion.p
                        className="text-4xl font-black font-neutral-300"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.8 }}
                    >
                        Web Applications
                    </motion.p>
                </div>
            </div>
        </div>
    );
};

export default HeroText;