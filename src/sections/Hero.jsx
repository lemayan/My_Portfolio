import { OrbitControls } from "@react-three/drei"
import HeroText from "../components/HeroText"
import ParallaxBackground from "../components/ParallaxBackground"
import { SpaceMan } from "../components/Spaceman"
import { Canvas, useFrame } from "@react-three/fiber"
import { useMediaQuery } from "react-responsive"
import { easing } from "maath"
import { Float } from "@react-three/drei"
import { Suspense } from "react"
import Loader from "../components/Loader"


const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space">
        <HeroText />
        <ParallaxBackground />
        <figure className="absolute inset-0" style={{ width: "100vw", height: "100vh" }}>
          <Canvas camera={{ position: [0, 1, 3] }}>
            <Suspense fallback={<Loader />}>
              <Float>
                <SpaceMan
                  scale={isMobile && 0.23}
                  position={isMobile && [0, -1.5, 0]}
                />
              </Float>
            </Suspense>
            <Rig />
            {!isMobile && (
              <OrbitControls 
                enableZoom={false}
                enableDamping={true}
                dampingFactor={0.1}
                rotateSpeed={0.5}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
              />
            )}
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} intensity={1} />
            <directionalLight position={[-2, -5, -2]} intensity={1} />

          </Canvas>
        </figure>
    </section>
  )
}

function Rig() {
  return useFrame((state, delta) => {
    // Increase damping and decrease movement sensitivity for smoother camera motion
    easing.damp3(
      state.camera.position, 
      [state.mouse.x / 15, 1 + state.mouse.y / 15, 3], 
      0.2, // Lower value means smoother, more stable movement
      delta
    );
    // Look at the center to keep focus on the model
    state.camera.lookAt(0, 0, 0);
  });
}
export default Hero