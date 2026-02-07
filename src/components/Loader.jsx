import { Html, useProgress } from "@react-three/drei"
import { useEffect, useState } from "react"

const Loader = () => {
    const {progress} = useProgress();
    const [smoothProgress, setSmoothProgress] = useState(0);
    const [mouthOpen, setMouthOpen] = useState(false);

    useEffect(() => {
      // Smooth transition for progress value
      const timeout = setTimeout(() => {
        setSmoothProgress(progress);
      }, 50);
      return () => clearTimeout(timeout);
    }, [progress]);

    // Animate mouth opening/closing
    useEffect(() => {
      const interval = setInterval(() => {
        setMouthOpen(prev => !prev);
      }, 400);
      return () => clearInterval(interval);
    }, []);

  return <Html center>
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-64 h-32 flex items-center justify-center">
        {/* Cute Pokemon-style creature */}
        <div className="relative z-10">
          {/* Body */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg relative">
              {/* Eyes */}
              <div className="absolute top-6 left-4 w-3 h-3 bg-black rounded-full animate-blink"></div>
              <div className="absolute top-6 right-4 w-3 h-3 bg-black rounded-full animate-blink"></div>
              
              {/* Cheeks */}
              <div className="absolute top-8 left-1 w-4 h-4 bg-pink-400 rounded-full opacity-60"></div>
              <div className="absolute top-8 right-1 w-4 h-4 bg-pink-400 rounded-full opacity-60"></div>
              
              {/* Mouth */}
              <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-200 ${mouthOpen ? 'w-8 h-6' : 'w-6 h-3'}`}>
                <div className={`w-full h-full bg-gradient-to-b from-red-400 to-red-500 rounded-full ${mouthOpen ? 'rounded-b-lg' : ''}`}></div>
              </div>
              
              {/* Ears */}
              <div className="absolute -top-2 -left-2 w-6 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-t-full transform -rotate-12"></div>
              <div className="absolute -top-2 -right-2 w-6 h-8 bg-gradient-to-bl from-yellow-400 to-yellow-500 rounded-t-full transform rotate-12"></div>
            </div>
          </div>
        </div>
        
        {/* Flying cubes being eaten */}
        <div className="absolute left-32 top-8">
          <div className="cube-1 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded shadow-lg animate-fly-to-mouth"></div>
        </div>
        <div className="absolute left-36 top-4">
          <div className="cube-2 w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-600 rounded shadow-lg animate-fly-to-mouth-delayed"></div>
        </div>
        <div className="absolute left-40 top-12">
          <div className="cube-3 w-4 h-4 bg-gradient-to-br from-pink-400 to-pink-600 rounded shadow-lg animate-fly-to-mouth-delayed-2"></div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-8 w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${smoothProgress}%` }}
        ></div>
      </div>
      
      {/* Progress text */}
      <p className="mt-4 font-medium text-2xl text-white transition-all duration-300 ease-out">
        {smoothProgress.toFixed(0)}%
      </p>
      <p className="mt-1 text-sm text-gray-400 font-light">Nom nom nom...</p>
    </div>

    <style jsx>{`
      @keyframes fly-to-mouth {
        0% {
          transform: translateX(0) translateY(0) scale(1) rotate(0deg);
          opacity: 1;
        }
        80% {
          transform: translateX(-140px) translateY(5px) scale(0.8) rotate(180deg);
          opacity: 1;
        }
        100% {
          transform: translateX(-150px) translateY(10px) scale(0.2) rotate(270deg);
          opacity: 0;
        }
      }
      
      @keyframes blink {
        0%, 90%, 100% {
          transform: scaleY(1);
        }
        95% {
          transform: scaleY(0.1);
        }
      }
      
      .animate-fly-to-mouth {
        animation: fly-to-mouth 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
      }
      
      .animate-fly-to-mouth-delayed {
        animation: fly-to-mouth 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        animation-delay: 0.5s;
      }
      
      .animate-fly-to-mouth-delayed-2 {
        animation: fly-to-mouth 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        animation-delay: 1s;
      }
      
      .animate-blink {
        animation: blink 3s ease-in-out infinite;
      }
    `}</style>
  </Html>
}

export default Loader