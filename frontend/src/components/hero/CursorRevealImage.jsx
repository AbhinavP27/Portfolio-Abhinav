import { useState } from "react";
import normalImage from "../../assets/normal.jpg";
import hoverImage from "../../assets/sunglasses.jpg";

const CursorRevealImage = () => {

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-[350px] h-[450px] rounded-[30px] overflow-hidden border border-gray-800 shadow-2xl"
    >

      {/* Normal Image */}
      <img
        src={normalImage}
        alt=""
        className="absolute w-full h-full object-cover"
      />

      {/* Hover Reveal */}
      <img
        src={hoverImage}
        alt=""
        className="absolute w-full h-full object-cover"
        style={{
          maskImage: `radial-gradient(circle 120px at ${position.x}px ${position.y}px, black 100%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 120px at ${position.x}px ${position.y}px, black 100%, transparent 100%)`,
        }}
      />

      {/* Glow Border */}
      <div className="absolute inset-0 border border-purple-500/30 rounded-[30px]"></div>

    </div>
  );
};

export default CursorRevealImage;