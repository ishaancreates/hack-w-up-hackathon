import { useMemo, useState } from "react";
import { cn } from "../../../lib/utils";

export type InteractiveGridPatternProps = {
  className?: string;
  squaresClassName?: string;
  width?: number; // **KEEP AS NUMBER** for calculations
  height?: number; // **KEEP AS NUMBER** for calculations
  squares?: [number, number];
};

/**
 * InteractiveGridPattern (React)
 * - Renders an SVG grid of squares, now using viewBox for responsiveness.
 */
export default function InteractiveGridPattern({
  className,
  squaresClassName,
  // Set a reasonable, static unit size for the *internal* SVG calculation
  width = 40,
  height = 40,
  squares = [24, 24],
}: InteractiveGridPatternProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [horizontal, vertical] = squares;
  const totalSquares = horizontal * vertical;

  // The total dimensions of the SVG's internal "coordinate system"
  const gridWidth = useMemo(() => width * horizontal, [width, horizontal]);
  const gridHeight = useMemo(() => height * vertical, [height, vertical]);

  // These positioning functions now correctly use the internal unit size (e.g., 40)
  const getX = (index: number) => (index % horizontal) * width;
  const getY = (index: number) => Math.floor(index / horizontal) * height;

  return (
    <svg
      // 1. Set `width` and `height` to 100% of the parent container
      // 2. Use `viewBox` to define the internal coordinate system based on calculated total dimensions
      width="100%"
      height="100%"
      viewBox={`0 0 ${gridWidth} ${gridHeight}`}
      preserveAspectRatio="none" // Ensures it stretches to fit the container
      className={cn(
        // **Crucial Tailwind Classes:** make sure the parent container has w-full and h-full
        "absolute inset-0 h-full w-full border border-gray-400/30",
        className
      )}
      aria-hidden
    >
      {Array.from({ length: totalSquares }).map((_, index) => (
        <rect
          key={index}
          x={getX(index)}
          y={getY(index)}
          width={width}
          height={height}
          className={cn(
            "stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000",
            hovered === index ? "fill-gray-300/30" : "fill-transparent",
            squaresClassName
          )}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}
    </svg>
  );
}
