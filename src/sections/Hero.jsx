import HeroText from "../components/HeroText"
import MarqueeTicker from "../components/MarqueeTicker"
import { useMediaQuery } from "react-responsive"


const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const marqueeItems = ["FULL-STACK DEVELOPER", "WEB DEVELOPER", "PROBLEM SOLVER", "CREATIVE CODER"];
  
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-grid">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 top-10 left-10"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
          }}
        />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-15 bottom-20 right-10"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 c-space">
        <HeroText />
      </div>

      {/* Marquee ticker at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5">
        <MarqueeTicker items={marqueeItems} />
      </div>
    </section>
  )
}

export default Hero