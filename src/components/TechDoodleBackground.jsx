import React from 'react';

export default function TechDoodleBackground() {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        backgroundColor: '#0c0c0d',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tech-doodles" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="rgba(255, 87, 51, 0.05)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Curly braces */}
              <path d="M 20 20 Q 15 20, 15 25 T 10 30 Q 15 30, 15 35 T 20 40" />
              <path d="M 30 20 Q 35 20, 35 25 T 40 30 Q 35 30, 35 35 T 30 40" />
              
              {/* Tags */}
              <path d="M 70 80 L 60 90 L 70 100" />
              <path d="M 90 80 L 100 90 L 90 100" />
              <path d="M 85 75 L 75 105" />

              {/* Terminal prompt */}
              <path d="M 80 15 L 85 20 L 80 25" />
              <path d="M 90 25 L 98 25" />

              {/* Bug/gear like shape */}
              <circle cx="30" cy="90" r="5" />
              <path d="M 30 82 L 30 85 M 30 95 L 30 98 M 22 90 L 25 90 M 35 90 L 38 90" />
              <path d="M 24 84 L 26 86 M 34 94 L 36 96 M 34 84 L 36 86 M 24 94 L 26 96" />
              
              {/* Binary dots/data */}
              <circle cx="100" cy="50" r="1.5" fill="rgba(255, 87, 51, 0.03)" />
              <circle cx="108" cy="50" r="1.5" fill="rgba(255, 87, 51, 0.03)" />
              <circle cx="100" cy="58" r="1.5" fill="rgba(255, 87, 51, 0.03)" />
              <circle cx="108" cy="58" r="1.5" fill="rgba(255, 87, 51, 0.03)" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-doodles)" />
      </svg>
      {/* Subtle overlay gradient to blend the edges */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, #0c0c0d 80%)'
      }} />
    </div>
  );
}
