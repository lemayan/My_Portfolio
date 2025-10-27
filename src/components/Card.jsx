import { motion } from "motion/react";
const Card = ({ style, text, image, containerRef }) => {
  return image && !text ? (
    <motion.img
      className="absolute w-[4rem] h-[4rem] object-contain cursor-grab"
      src={image}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    />
  ) : (
    <motion.div
      className="absolute px-4 py-3 text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-storm w-[12rem] h-[3rem] flex items-center justify-center cursor-grab overflow-hidden"
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    >
      <span className="leading-tight text-base">{text}</span>
    </motion.div>
  );
};

export default Card;