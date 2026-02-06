import {myProjects} from "../constants";
import {motion} from "motion/react"
import { useState } from "react";

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  return (
    <section className="relative c-space section-spacing py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px]"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[120px]"
            animate={{
              x: [0, -80, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-[110px]"
            animate={{
              x: [0, 60, 0],
              y: [0, -70, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">My Work</h2>
          </motion.div>
        </div>
        
        {/* Simple Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto relative z-10">
          {myProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Content */}
              <div className="flex items-start gap-8 mb-6 min-h-[160px]">
                {/* Number */}
                <motion.div 
                  className="text-7xl md:text-8xl font-bold bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent flex-shrink-0 leading-none"
                  animate={{
                    textShadow: hoveredIndex === index 
                      ? ['0 0 20px rgba(168, 85, 247, 0.4)', '0 0 40px rgba(168, 85, 247, 0.6)', '0 0 20px rgba(168, 85, 247, 0.4)']
                      : '0 0 0px rgba(168, 85, 247, 0)',
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    filter: hoveredIndex === index ? 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.5))' : 'none',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-base text-white/50 mb-4 uppercase tracking-wider text-xs font-semibold">
                    {project.tags[0]?.name || 'Full Stack'}
                  </p>
                  
                  <div>
                    <p className="text-sm font-semibold text-white/70 mb-2">Tools and features</p>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {project.tags.slice(0, 6).map(tag => tag.name).join(' • ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Image */}
              <motion.a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden rounded-2xl border border-white/10 bg-black/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-video relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-white font-semibold flex items-center gap-2">
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Blue glowing border on hover */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      boxShadow: '0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.3)',
                      border: '2px solid rgba(59, 130, 246, 0.8)',
                    }}
                  />
                )}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* See More */}
        <motion.div
          className="mt-16 text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a 
            href="https://github.com/lemayan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <span className="text-lg font-semibold">Want to see more?</span>
            <span className="text-sm">Explore all of my projects and creations</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
    </section>
  );
}

export default Projects