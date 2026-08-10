import React, { useState } from 'react';
import { useCursor } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { useThree } from '@react-three/fiber';
import Envelope from './Envelope';
import Letter from './Letter';

export default function Scene({ isOpen, setIsOpen }) {
  const [hovered, setHovered] = useState(false);

  const { viewport } = useThree();
  // We need about 7.5 units of width to comfortably show the fully open book.
  const mobileScale = Math.min(1, viewport.width / 7.5);

  useCursor(hovered, 'pointer', 'auto');

  const { y, rotateX } = useSpring({
    y: isOpen ? -0.5 : 0,
    rotateX: isOpen ? 0 : 0.2,
    delay: isOpen ? 0 : 800, // Move instantly when opening, wait 800ms for book to shut when closing
    config: { mass: 1, tension: 120, friction: 20 }
  });

  return (
    <a.group 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { 
        if (!isOpen) {
          e.stopPropagation(); 
          setIsOpen(true); 
        }
      }}
      onPointerMissed={() => setIsOpen(false)}
      position-y={y}
      rotation-x={rotateX}
      scale={mobileScale}
    >
      <Envelope isOpen={isOpen} />
      <Letter isOpen={isOpen} />
    </a.group>
  );
}
