import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import Toranam from './components/Toranam';
import Band from './components/Band';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <>
      <Toranam />
      <Band isFixed={true} hasStarted={hasStarted} />
      
      {/* Save the Date Overlay - Appears only when the 3D card is closed */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity: (hasStarted && !isCardOpen) ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        pointerEvents: 'none',
        zIndex: 500,
        fontFamily: "'Cormorant Garamond', serif", /* Changed to an elegant serif font */
        color: '#F0D9A0',
        textShadow: '0 4px 10px rgba(0,0,0,0.5)',
        width: '100%'
      }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', margin: 0, fontWeight: 500, fontStyle: 'italic', letterSpacing: '2px' }}>Save the Date</h2>
        <p style={{ fontSize: 'clamp(20px, 3vw, 28px)', margin: '10px 0 0 0', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>27 / 08 / 2026</p>
        <p style={{ fontSize: '14px', marginTop: '15px', opacity: 0.8, fontStyle: 'italic', fontFamily: "'Poppins', sans-serif" }}>Tap the card to open</p>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        
        {/* Lighting for a soft, premium look */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        <Environment preset="city" />

        {/* Main interactive scene */}
        <Scene isOpen={isCardOpen} setIsOpen={setIsCardOpen} />

        {/* Nice soft shadows on the "floor" */}
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4} />

        {/* Allow user to pan/zoom slightly but keep the focus on the card */}
        {/* User Interaction Controls */}
        {hasStarted && (
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            minDistance={2} 
            maxDistance={15} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 2 + 0.2} 
          />
        )}
      </Canvas>
      <Overlay hasStarted={hasStarted} onStart={() => setHasStarted(true)} />
    </>
  );
}

export default App;
