import React from 'react';
import ProjectDetails from './ProjectDetails';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, useMotionValue } from 'motion/react';

const Project = ({title , description , subDescription, href , image , tags , setPreview, index}) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [isHidden , setIsHidden] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (event) => {
        if (!isMobile) {
            const rect = event.currentTarget.getBoundingClientRect();
            x.set(event.clientX + 20);
            y.set(event.clientY - 20);
        }
    };

    return (
        <>
        <motion.div 
            className='project-row px-6 py-6 md:px-8 md:py-8 cursor-pointer'
            onMouseMove={handleMouseMove}
            onMouseEnter={() => !isMobile && setPreview({ image, x, y })}
            onMouseLeave={() => !isMobile && setPreview(null)}
            onClick={() => setIsHidden(true)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <div className='flex flex-col md:flex-row items-start md:items-center gap-6 w-full'>
                {/* Project Number */}
                <div className="flex-shrink-0">
                    <div className="text-5xl md:text-6xl font-bold text-white/10">
                        {String(index).padStart(2, '0')}
                    </div>
                </div>

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                    <h3 className='text-2xl md:text-3xl font-bold text-white mb-2'>{title}</h3>
                    <p className="text-sm text-white/50 mb-3">Tools and features</p>
                    <div className='flex flex-wrap gap-2'>
                        {tags.slice(0, 6).map((tag) => (
                            <span key={tag.id} className="text-xs text-white/60">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Thumbnail - Desktop only */}
                {!isMobile && (
                    <div className="hidden md:block flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden border border-white/10 bg-black/30">
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
            
            {/* View Details Button - Mobile */}
            <button 
                onClick={() => setIsHidden(true)} 
                className='mt-4 md:hidden btn-ghost w-full justify-center'
            >
                <span>View Details</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </motion.div>
        
       {isHidden && <ProjectDetails title={title} description={description} subDescription={subDescription} href={href} image={image} tags={tags} CloseModel={() => setIsHidden(false)} />}
        </>
    );
};

export default Project;
