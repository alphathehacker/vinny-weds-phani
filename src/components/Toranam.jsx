import React from 'react';

export default function Toranam() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 1100, overflow: 'hidden', height: '100vh' }}>
      
      <style>
        {`
          @media (max-width: 768px) {
            .wi-side-garland { 
              transform: scale(0.7) !important;
              transform-origin: top center !important;
            }
            .wi-side-garland-left { left: -10px !important; }
            .wi-side-garland-right { right: -10px !important; }
            .wi-toranam { top: -20px !important; }
          }
        `}
      </style>

      {/* Shared Definitions */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="wi-leafGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B8F55" />
            <stop offset="100%" stopColor="#3F5D34" />
          </linearGradient>
          
          <g id="wi-leafcluster">
            <path d="M0,-4 C 10,-2 12,10 0,20 C -12,10 -10,-2 0,-4 Z" fill="url(#wi-leafGrad)" />
            <line x1="0" y1="-4" x2="0" y2="20" stroke="#2E4523" strokeWidth="0.8" />
          </g>
          
          <g id="wi-marigold">
            <circle cx="0" cy="0" r="5.5" fill="#D4A24C" />
            <circle cx="0" cy="0" r="2.4" fill="#F0D9A0" />
          </g>
        </defs>
      </svg>

      {/* Top Toranam */}
      <svg className="wi-toranam" viewBox="0 0 760 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ position: 'absolute', top: '-46px', left: '50%', transform: 'translateX(-50%)', width: 'min(760px, 94%)', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.35))' }}>
        <g className="wi-toranam-string" style={{ transformOrigin: 'center top', animation: 'wi-sway 4.5s ease-in-out infinite' }}>
          <path d="M0,14 Q190,80 380,20 Q570,80 760,14" fill="none" stroke="#8F631F" strokeWidth="2" />
          <use href="#wi-leafcluster" x="30" y="26" transform="rotate(-8 30 26)" />
          <use href="#wi-leafcluster" x="95" y="52" transform="rotate(-3 95 52)" />
          <use href="#wi-leafcluster" x="160" y="66" transform="rotate(4 160 66)" />
          <use href="#wi-leafcluster" x="225" y="42" transform="rotate(-6 225 42)" />
          <use href="#wi-leafcluster" x="290" y="24" transform="rotate(2 290 24)" />
          <use href="#wi-leafcluster" x="355" y="18" transform="rotate(-4 355 18)" />
          <use href="#wi-leafcluster" x="420" y="24" transform="rotate(6 420 24)" />
          <use href="#wi-leafcluster" x="485" y="42" transform="rotate(-2 485 42)" />
          <use href="#wi-leafcluster" x="550" y="66" transform="rotate(4 550 66)" />
          <use href="#wi-leafcluster" x="615" y="52" transform="rotate(-5 615 52)" />
          <use href="#wi-leafcluster" x="680" y="26" transform="rotate(7 680 26)" />
          <use href="#wi-leafcluster" x="730" y="14" transform="rotate(-3 730 14)" />

          <use href="#wi-marigold" x="62" y="42" />
          <use href="#wi-marigold" x="128" y="62" />
          <use href="#wi-marigold" x="192" y="58" />
          <use href="#wi-marigold" x="258" y="34" />
          <use href="#wi-marigold" x="322" y="20" />
          <use href="#wi-marigold" x="388" y="18" />
          <use href="#wi-marigold" x="452" y="30" />
          <use href="#wi-marigold" x="518" y="56" />
          <use href="#wi-marigold" x="582" y="62" />
          <use href="#wi-marigold" x="648" y="42" />
          <use href="#wi-marigold" x="708" y="18" />
        </g>
      </svg>

      {/* Left Vertical Garland */}
      <svg className="wi-side-garland wi-side-garland-left" viewBox="0 0 60 800" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ position: 'absolute', top: '-10px', left: '10px', width: '60px', height: 'min(800px, 80vh)', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.35))' }}>
        <g style={{ transformOrigin: 'top center', animation: 'wi-sway 5s ease-in-out infinite' }}>
          <line x1="30" y1="0" x2="30" y2="780" stroke="#8F631F" strokeWidth="2" />
          {[...Array(12)].map((_, i) => (
            <g key={`l-${i}`} transform={`translate(30, ${i * 65 + 40})`}>
              <use href="#wi-leafcluster" x="0" y="0" transform="rotate(90) scale(0.8) translate(0, -8)" />
              <use href="#wi-marigold" x="0" y="-12" />
              <use href="#wi-marigold" x="0" y="12" />
            </g>
          ))}
        </g>
      </svg>

      {/* Right Vertical Garland */}
      <svg className="wi-side-garland wi-side-garland-right" viewBox="0 0 60 800" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ position: 'absolute', top: '-10px', right: '10px', width: '60px', height: 'min(800px, 80vh)', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.35))' }}>
        <g style={{ transformOrigin: 'top center', animation: 'wi-sway 6s ease-in-out infinite' }}>
          <line x1="30" y1="0" x2="30" y2="780" stroke="#8F631F" strokeWidth="2" />
          {[...Array(12)].map((_, i) => (
            <g key={`r-${i}`} transform={`translate(30, ${i * 65 + 40})`}>
              <use href="#wi-leafcluster" x="0" y="0" transform="rotate(-90) scale(0.8) translate(0, -8)" />
              <use href="#wi-marigold" x="0" y="-12" />
              <use href="#wi-marigold" x="0" y="12" />
            </g>
          ))}
        </g>
      </svg>

    </div>
  );
}

