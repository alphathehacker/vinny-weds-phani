import React, { useState, useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Letter({ isOpen }) {
  const textureFront = useTexture('/assets/image3.png');
  const textureBack = useTexture('/assets/image7.png');
  const textureInnerLeft = useTexture('/assets/image5.1.jpg');
  const textureInnerRight = useTexture('/assets/image5.2.jpg');
  
  const { gl } = useThree();

  useEffect(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
    [textureFront, textureBack, textureInnerLeft, textureInnerRight].forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
    });
  }, [gl, textureFront, textureBack, textureInnerLeft, textureInnerRight]);

  const [bookOpen, setBookOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setBookOpen(false);
    }
  }, [isOpen]);

  const width = 3.0;
  const height = 3.75;

  const { y, scale } = useSpring({
    y: isOpen ? 0.5 : 0, // Lowered from 1.5 to keep it vertically centered
    scale: isOpen ? 0.95 : 1, // Slightly larger when open for readability
    delay: isOpen ? 400 : 800, // Wait 800ms when closing for the book to shut fully
    config: { mass: 1, tension: 100, friction: 20 }
  });

  const { rootX, rotateY } = useSpring({
    rootX: bookOpen ? width / 2 : 0, // Shift right to center the left-opening spread
    rotateY: bookOpen ? -Math.PI * 0.95 : 0, // Swing open to the left (TOWARDS camera)
    config: { mass: 2.5, tension: 40, friction: 25 } // Slow soothing physics
  });

  return (
    <a.group
      position-x={rootX}
      position-y={y}
      position-z={0.01}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        if (isOpen) {
          setBookOpen(!bookOpen);
        }
      }}
    >
      {/* Back Page (Stationary half, becomes the right side of the spread) */}
      <group position={[0, 0, -0.01]}>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial map={textureInnerRight} />
        </mesh>
        <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial map={textureBack} />
        </mesh>
      </group>

      {/* Front Page Group (Hinged at left edge) */}
      <a.group
        position={[-width / 2, 0, 0.02]}
        rotation-y={rotateY}
      >
        <group position={[width / 2, 0, 0]}>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial map={textureFront} />
          </mesh>
          <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial map={textureInnerLeft} />
          </mesh>
        </group>
      </a.group>
    </a.group>
  );
}
