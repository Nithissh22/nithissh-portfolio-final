import React from "react";

interface NSGMarkProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function NSGMark({ className = "", ...props }: NSGMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`nsg-mark ${className}`}
      {...props}
    >
      <style>
        {`
          .nsg-mark {
            --mark-n: #f0ece4;
            --mark-sg: #B5521A;
            --mark-shape: #B5521A;
            --mark-circle: rgba(240, 236, 228, 0.12);
          }
          :global(.mark-light) .nsg-mark,
          .nsg-mark.mark-light {
            --mark-n: #0a0a0a;
            --mark-sg: #B5521A;
            --mark-shape: #B5521A;
            --mark-circle: rgba(10, 10, 10, 0.12);
          }
        `}
      </style>
      
      {/* Outer Octagon */}
      <polygon
        points="30,2 70,2 98,30 98,70 70,98 30,98 2,70 2,30"
        fill="none"
        stroke="var(--mark-shape)"
        strokeWidth="1"
      />

      {/* 4 Tick Marks at edges */}
      <g stroke="var(--mark-shape)" strokeWidth="1" opacity="0.5">
        <line x1="50" y1="-2" x2="50" y2="6" />
        <line x1="50" y1="94" x2="50" y2="102" />
        <line x1="-2" y1="50" x2="6" y2="50" />
        <line x1="94" y1="50" x2="102" y2="50" />
      </g>

      {/* Inner Circle (70% of octagon size ~ radius 34) */}
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke="var(--mark-circle)"
        strokeWidth="1"
      />

      {/* Center N */}
      <text
        x="50"
        y="55"
        fontFamily="'Cormorant Garamond', serif"
        fontWeight="600"
        fontSize="44"
        textAnchor="middle"
        fill="var(--mark-n)"
      >
        N
      </text>

      {/* SG */}
      <text
        x="53"
        y="72"
        fontFamily="'Cormorant Garamond', serif"
        fontWeight="300"
        fontSize="12"
        letterSpacing="6"
        textAnchor="middle"
        fill="var(--mark-sg)"
      >
        SG
      </text>
    </svg>
  );
}
