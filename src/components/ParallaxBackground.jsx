import { motion } from "motion/react";

const ParallaxBackground = () => {
  return (
    <section className="absolute inset-0 bg-black/60">
      <div className="relative h-screen overflow-hidden">
        {/* Animated gradient background with multiple layers */}
        <div className="absolute inset-0 w-full h-screen -z-50">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950 to-black" />
          
          {/* Animated glow orbs */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
              top: "10%",
              left: "10%",
            }}
            animate={{
              y: [0, 50, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
              top: "60%",
              right: "10%",
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full blur-3xl opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
              bottom: "20%",
              left: "50%",
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, -40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Subtle stars/dots */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          {/* Grid overlay for depth */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ParallaxBackground;