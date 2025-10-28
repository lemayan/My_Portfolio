import { Html, useProgress } from "@react-three/drei"

const Loader = () => {
    const {progress} = useProgress();

  return <Html center>
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
      <p className="mt-4 font-normal text-xl text-white">{progress.toFixed(0)}% Loaded</p>
    </div>
  </Html>
}

export default Loader