import Card from "../components/Card";
import { useRef } from "react";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import {Frameworks} from "../components/Frameworks";

const About = () => {
    const grid2Container = useRef();
return (
    <section className="c-space section-spacing">
        <h2 className="text-heading">About Me</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
            {/* Grid 1 */}
            <div className="flex items-end grid-default-color grid-1">
                <img
                    src="assets/coding-pov.png"
                    className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
                />
                <div className="z-10">
                    <p className="headtext">Hi, I'm Dennis Lemayan Leleina</p>
                    <p className="subtext">
                        A passionate full-stack developer who transforms complex ideas into seamless digital experiences that users love.
                    </p>
                </div>
                <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 bg-gradient-to-t from-indigo" />
            </div>
            {/* Grid 2 */}
            <div className="grid-default-color grid-2">
                <div ref={grid2Container} className="relative h-full w-full">
                    <p className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white pointer-events-none z-0" style={{textShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)'}}>
                        CODE IS CRAFT
                    </p>
                    
                    {/* Text Cards - Distributed across the screen */}
                    <Card style={{rotate: "15deg", top: "8%", left: "2%"}} text="WEB MAGIC"
                        containerRef={grid2Container}
                    />
                    <Card style={{rotate: "-25deg", top: "10%", left: "78%"}} text="PIXEL PERFECT"
                        containerRef={grid2Container}
                    />
                    <Card style={{rotate: "75deg", top: "68%", left: "12%"}} text="CREATIVE SOLUTIONS"
                        containerRef={grid2Container}
                    />
                    <Card style={{rotate: "-45deg", top: "72%", left: "85%"}} text="Digital Innovation"
                        containerRef={grid2Container}
                    />
                    <Card style={{rotate: "20deg", top: "42%", left: "1%"}} text="User Experience"
                        containerRef={grid2Container}
                    />
                    
                    {/* Image Cards - Distributed across the screen */}
                    <Card style={{rotate: "30deg", top: "3%", left: "38%"}} image="assets/programming languages/python.svg"
                        containerRef={grid2Container}
                    />
                    <Card style={{rotate: "-45deg", top: "35%", left: "88%"}} image="assets/programming languages/javascript.svg"
                        containerRef={grid2Container}
                    />
                    <Card style={{rotate: "60deg", top: "78%", left: "48%"}} image="assets/frameworks/react.svg"
                        containerRef={grid2Container}
                    />
                    <Card style={{rotate: "-30deg", top: "40%", left: "42%"}} image="assets/databases/mysql.svg"
                        containerRef={grid2Container}
                    />
                    <Card style={{rotate: "45deg", top: "5%", left: "62%"}} image="assets/programming languages/typescript.svg"
                        containerRef={grid2Container}
                    />
                    <Card style={{rotate: "-60deg", top: "70%", left: "3%"}} image="assets/programming languages/bash.svg"
                        containerRef={grid2Container}
                    />
                </div>
            </div>
            {/* Grid 3 */}
            <div className="grid-black-color grid-3">
                <div className="z-10 w-[50%]">
                    <p className="headtext">
                        Time Zone
                    </p>
                    <p className="subtext">
                       I'm based in Nairobi, Kenya. <br /> I'm open to remote collaboration and work opportunities.
                    </p> 

                </div>
                <figure className="absolute left-[30%] top-[10%] hidden md:block">
                    <Globe/>

                </figure>


            </div>
            {/* Grid 4 */}
            <div className="grid-special-color grid-4">
                <div className="flex flex-col items-center justify-center gap-4  size-full ">
                    <p className="text-center headtext ">Would you like to collab with me?

                    </p>
                    <CopyEmailButton />

                </div>
            </div>
            {/* Grid 5 */}
            <div className= "grid-default-color grid-5">
                <div className="z-10 w-[50%]"> 
                    <p className="headtext">Tech Stack</p>
                    <p className="subtext">
                        I work with a diverse range of technologies to build robust and scalable applications.
                    </p>

                </div>
                <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
                    <Frameworks/>
                </div>
            </div>
        </div>
    </section>
);
}

export default About