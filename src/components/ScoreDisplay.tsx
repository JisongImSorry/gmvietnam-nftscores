import React, { useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const circleRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (circle) {
      const radius = circle.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

      const setProgress = (percent: number) => {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = `${offset}`;
      };

      setProgress(score);
    }
  }, [score]);

  return (
    <div className="flex items-center justify-center">
      <svg className="w-48 h-48" viewBox="0 0 100 100">
        <circle
          ref={circleRef}
          className="circle-progress stroke-green-500"
          strokeWidth="10"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute">
        <p className="text-6xl font-bold text-green-500">{score}</p>
      </div>
    </div>
  );
};

export default ScoreDisplay;
