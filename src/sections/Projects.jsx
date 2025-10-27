import {myProjects} from "../constants";
import Project from "../components/Project";
import {motion, useMotionValue, useSpring} from "motion/react"
import { useState } from "react";

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 10 });
  const springY = useSpring(y, { stiffness: 50, damping: 10 });
  const handleMouseMove = (event) => {
    x.set(event.clientX + 20);
    y.set(event.clientY - 20);
  };
  const [preview , setPreview] = useState(null);
  return (
    <section onMouseMove={handleMouseMove} className="relative c-space section-spacing">
        <h2 className="text-heading">My Projects</h2>
        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full"/>
        {myProjects.map((project) => (
            <Project key={project.id} {...project} setPreview={setPreview} />
        ))}
      {preview && (  <motion.img  className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
        style={{ x: springX, y: springY }}
        src ={preview} 
        />)}

    </section>
  );
}

export default Projects