"use client";;
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({
  data
}) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="c-space"
      ref={containerRef}>
      <h2 className="text-heading">
        My Work Experience
        </h2>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div
              className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div
                className="h-10 absolute -left-[15px] w-10 rounded-full  bg-midnight flex items-center justify-center">
                <div
                  className="h-4 w-4 rounded-full  bg-neutral-800 border  border-neutral-700 p-2" />
              </div>
             <div className="flex-col  hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300 ">
                <h3>
                    {item.date}
                </h3>
                <h3 className="text-3xl text-neutral-400">
                    {item.title}
                </h3>
                <h3 className="text-3xl text-neutral-500">
                    {item.job}
                </h3>

             </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden ">
                    <h3>
                        {item.date}
                    </h3>
                    <h3>
                        {item.job}
                    </h3>
                </div>
                {item.contents.map((content, cIndex) => (
                    <div key={cIndex} className="flex items-start gap-3 mb-3">
                        <span className="text-purple-500 text-lg font-bold mt-0.5 flex-shrink-0" 
                              style={{textShadow: '0 0 10px rgba(168, 85, 247, 0.8), 0 0 20px rgba(168, 85, 247, 0.4)'}}>
                            —
                        </span>
                        <p className="font-normal text-neutral-400 flex-1">
                            {content}
                        </p>
                    </div>
                ))}
  
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-[4px] md:left-[4px] top-0 overflow-hidden w-[2px] z-10
          bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] 
          from-transparent from-[0%] 
           via-neutral-700 to-transparent to-[99%] 
            [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
            >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
             className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full "/>
        </div>
      </div>
    </div>
  );
};
