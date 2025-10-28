import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

const ParallaxBackground = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Preload critical images
  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = '/assets/sky.jpg';
    img2.src = '/assets/mountain-1.png';
    
    Promise.all([
      img1.decode(),
      img2.decode()
    ]).then(() => setImagesLoaded(true));
  }, []);
  
  // Reduce parallax intensity and increase damping on mobile for smoother performance
  const x = useSpring(scrollYProgress, { damping: isMobile ? 100 : 50, stiffness: isMobile ? 100 : 200 });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", isMobile ? "20%" : "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", isMobile ? "0%" : "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", isMobile ? "10%" : "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <section className="absolute inset-0 bg-black/60">
      <div className="relative h-screen overflow-y-hidden" style={{ willChange: 'transform' }}>
        {/* Background Sky - Simplified gradient instead of heavy image */}
        <div
          className="absolute inset-0 w-full h-screen -z-50 bg-gradient-to-b from-gray-900 via-blue-900 to-black"
        />
        {/* Only load other layers after critical images are ready */}
        {imagesLoaded && (
          <>
            {/* Mountain Layer 3 - Lazy loaded */}
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
            {/* Mountain Layer 2 - Lazy loaded */}
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
          </>
        )}
        {/* Mountain Layer 1 - Always show (critical) */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain1Y,
            transform: "translateZ(0)",
            opacity: imagesLoaded ? 1 : 0.5,
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;