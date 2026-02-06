import {motion} from "motion/react"

const ProjectDetails = ({ title, description, subDescription, href, image, tags, CloseModel }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-auto backdrop-blur-xl bg-black/60 p-4'>
    <motion.div className='relative max-w-3xl w-full glass-card overflow-hidden'
     initial={{ scale: 0.8, opacity: 0, y: 50 }}
     animate={{ scale: 1, opacity: 1, y: 0 }}
     exit={{ scale: 0.8, opacity: 0, y: 50 }}
     transition={{ duration: 0.4, ease: "easeOut" }}>
        <button 
            onClick={CloseModel} 
            className='absolute p-2.5 rounded-full top-5 right-5 bg-black/50 hover:bg-black/70 border border-white/10 transition-all z-10 group'
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        
        <div className='relative h-64 md:h-80 overflow-hidden bg-black/30'>
            <img src={image} alt={title} className='w-full h-full object-contain' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
        </div>
        
        <div className='p-6 md:p-8'>
            <h3 className='mb-4 text-3xl md:text-4xl font-bold text-white'>
                {title}
            </h3>
            <p className='mb-4 text-base text-white/70 leading-relaxed'>
                {description}
            </p>
            {subDescription.map((subDesc, index) => (
                <p className='mb-3 text-sm text-white/60 leading-relaxed' key={index}>
                    {subDesc}
                </p>
            ))}
            
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-8 pt-6 border-t border-white/10'>
                <div className='flex flex-wrap gap-3'>
                    {tags.map((tag) => (
                        <div key={tag.id} className="group relative">
                            <img 
                                src={tag.path} 
                                alt={tag.name} 
                                className='rounded-xl size-12 hover:scale-110 transition-transform duration-300 border border-white/10' 
                            />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {tag.name}
                            </span>
                        </div>
                    ))}
                </div>
                <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className='btn-primary flex-shrink-0 group'
                >
                    <span>View Project</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </div>
    </motion.div>
</div>

  )
}

export default ProjectDetails