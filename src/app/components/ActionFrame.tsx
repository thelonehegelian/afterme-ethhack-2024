import React, { useState } from "react";
import type { SVGProps } from "react";

import "./ActionFrame.css";

interface ActionFrameProps {
  icon: React.JSX.Element;
  actionText: string;
  defaultSelection?: boolean;
}

const ActionFrame: React.FC<ActionFrameProps> = ({
  icon,
  actionText,
  defaultSelection = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(defaultSelection);

  return (
    <div
      className={`cursor-pointer h-64 w-64 rounded-2xl flex items-center justify-center m-2 ${
        isSelected
          ? "bg-[#F2CF03] hover:bg-[#F2CF03]"
          : "bg-[#D9D9D9] hover:bg-[#bfbfbf]"
      }`}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div
        className="bg-white rounded-full h-28 w-28 flex items-center justify-center transition-container cursor-pointer shadow-inner"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered ? (
          <span className="text-black transition-text text-sm text-center block">
            {actionText}
          </span>
        ) : (
          <div className="transition-icon">{icon}</div>
        )}
      </div>
    </div>
  );
};

export default ActionFrame;
