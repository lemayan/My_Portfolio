import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useMediaQuery } from "react-responsive";

const ParallaxBackground = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const { scrollYProgress } = useScroll();
  
  // Reduce parallax intensity and increase damping on mobile for smoother performance
  const x = useSpring(scrollYProgress, { damping: isMobile ? 100 : 50, stiffness: isMobile ? 100 : 200 });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", isMobile ? "20%" : "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", isMobile ? "0%" : "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", isMobile ? "10%" : "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <section className="absolute inset-0 bg-black/60">
      <div className="relative h-screen overflow-y-hidden" style={{ willChange: 'transform' }}>
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            transform: "translateZ(0)",
          }}
        />
        {/* Mountain Layer 3 */}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y,
            transform: "translateZ(0)",
          }}
        />
        {/* Planets */}
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: planetsX,
            transform: "translateZ(0)",
          }}
        />
        {/* Mountain Layer 2 */}
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain2Y,
            transform: "translateZ(0)",
          }}
        />
        {/* Mountaine Layer 1 */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain1Y,
            transform: "translateZ(0)",
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;