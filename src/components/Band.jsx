import React from 'react';

export default function Band({ isFixed = false, hasStarted = true }) {
  return (
    <div className="wi-band-wrapper" style={{ 
      width: '100%',
      pointerEvents: 'none', 
      zIndex: 1100,
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: isFixed ? '0' : '40px',
      paddingRight: '90px',
      position: isFixed ? 'absolute' : 'relative',
      bottom: isFixed ? '15px' : 'auto',
      right: isFixed ? '0' : 'auto',
      opacity: (isFixed && !hasStarted) ? 0 : 1,
      transition: 'opacity 1s ease-in-out'
    }}>
      <style>
        {`
          @media (max-width: 900px) {
            .wi-band-wrapper {
              justify-content: center !important;
              padding-right: 0 !important;
              width: 100% !important;
              margin-top: ${isFixed ? '0' : '20px'} !important;
            }
            .wi-band-img {
              width: 100% !important;
              max-width: 100vw !important;
              padding: 0 10px; /* Slight breathing room so it doesn't touch the absolute edges */
            }
          }
        `}
      </style>
      <img 
        className="wi-band-img"
        src="/assets/band.png" 
        alt="Wedding Band Right" 
        style={{ 
          width: '380px', 
          maxWidth: '100vw',
          height: 'auto', 
          objectFit: 'contain',
          /* Remove drop-shadow to prevent browser rasterization blur */
          imageRendering: 'high-quality',
          WebkitBackfaceVisibility: 'hidden', /* Helps WebKit render sharp */
          transform: 'translateZ(0)' /* Hardware acceleration for crisp scaling */
        }} 
      />
    </div>
  );
}
