import React, { useState } from "react";

interface TooltipProps {
  text: string; // Tooltip content
  children: React.ReactNode; // The element that triggers the tooltip
  position?: "top" | "bottom" | "left" | "right"; // Optional placement
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = "top",
}) => {
  const [visible, setVisible] = useState(false);

  // Tooltip position styles
  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={`absolute z-20 whitespace-nowrap bg-white  text-xs px-2 py-1 rounded shadow-md transition-opacity duration-200 ${positionClasses[position]}`}
        >
          {text}
          <div
            className={`absolute border-4 border-transparent ${
              position === "top"
                ? "border-t-gray-800 top-full left-1/2 -translate-x-1/2"
                : position === "bottom"
                ? "border-b-gray-800 bottom-full left-1/2 -translate-x-1/2"
                : position === "left"
                ? "border-l-gray-800 left-full top-1/2 -translate-y-1/2"
                : "border-r-gray-800 right-full top-1/2 -translate-y-1/2"
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
