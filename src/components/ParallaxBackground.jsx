import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

const ParallaxBackground = () => {
  return (
    <section className="absolute inset-0 bg-black/60">
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Sky - Fast loading gradient */}
        <div
          className="absolute inset-0 w-full h-screen -z-50 bg-gradient-to-b from-gray-900 via-blue-900 to-black"
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;