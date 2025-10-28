import HeroText from "../components/HeroText"
import ParallaxBackground from "../components/ParallaxBackground"
import { useMediaQuery } from "react-responsive"


const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center md:items-start md:justify-start min-h-screen md:min-h-screen overflow-hidden c-space pb-0 md:pb-20">
        <HeroText />
        <ParallaxBackground />
    </section>
  )
}

export default Hero