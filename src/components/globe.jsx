"use client"

import { useEffect, useRef } from "react"
import createGlobe from "cobe"
import { useMotionValue, useSpring } from "motion/react"

import { twMerge } from "tailwind-merge"

const MOVEMENT_DAMPING = 1400

// Detect if device is mobile
const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 640
}

const GLOBE_CONFIG  = {
width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.1, 0.1, 0.1],
  markerColor: [1, 1, 1],
  glowColor: [0.8, 0.8, 1],
  markers: [
    // Kenya - Primary focus
    { location: [-1.2921, 36.8219], size: 0.15 },  // Nairobi (capital)
    { location: [-4.0435, 39.6682], size: 0.1 },   // Mombasa
    { location: [-0.0917, 34.7680], size: 0.08 },  // Kisumu
    { location: [0.5143, 35.2698], size: 0.07 },   // Eldoret
    
    // Other East African cities
    { location: [-6.7924, 39.2083], size: 0.09 },  // Dar es Salaam, Tanzania
    { location: [-1.9536, 30.0606], size: 0.08 },  // Kigali, Rwanda
    { location: [0.3476, 32.5825], size: 0.08 },   // Kampala, Uganda
    { location: [9.0320, 38.7469], size: 0.09 },   // Addis Ababa, Ethiopia
    
    // Other major African cities
    { location: [30.0444, 31.2357], size: 0.08 },  // Cairo, Egypt
    { location: [-26.2041, 28.0473], size: 0.08 }, // Johannesburg, South Africa
    { location: [6.5244, 3.3792], size: 0.08 },    // Lagos, Nigeria
    { location: [33.5731, -7.5898], size: 0.07 },  // Casablanca, Morocco
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    // Optimize config for mobile
    const mobile = isMobile()
    const optimizedConfig = mobile ? {
      ...config,
      devicePixelRatio: 1.5, // Lower pixel ratio for better performance
      mapSamples: 12000, // Reduce detail for better performance
    } : config

    const globe = createGlobe(canvasRef.current, {
      ...optimizedConfig,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005
        state.phi = phi + rs.get()
        state.width = width * 2
        state.height = width * 2
      },
    })

    setTimeout(() => (canvasRef.current.style.opacity = "1"), 0)
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={twMerge(
          "size-full sm:size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
