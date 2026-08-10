import React, { useMemo, useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Envelope({ isOpen }) {
  const textureFront = useTexture('/assets/image1.png');
  const textureBackRaw = useTexture('/assets/image2.png');
  const { gl } = useThree();

  const flapRatio = 0.32;
  const bodyRatio = 1 - flapRatio;

  const textureBackBody = useMemo(() => {
    const tex = textureBackRaw.clone();
    tex.repeat.set(1, bodyRatio);
    tex.offset.set(0, 0); // Bottom 68%
    return tex;
  }, [textureBackRaw, bodyRatio]);

  const textureBackFlap = useMemo(() => {
    const tex = textureBackRaw.clone();
    tex.repeat.set(1, flapRatio);
    tex.offset.set(0, bodyRatio); // Top 32%
    return tex;
  }, [textureBackRaw, flapRatio, bodyRatio]);

  useEffect(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
    [textureFront, textureBackBody, textureBackFlap].forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAnisotropy;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
    });
  }, [gl, textureFront, textureBackBody, textureBackFlap]);

  const width = 3.21;
  const height = 4.5;
  const flapHeight = height * flapRatio;
  const exposedBodyHeight = height * bodyRatio;

  const { rotateX } = useSpring({
    rotateX: isOpen ? Math.PI * 0.9 : 0,
    delay: isOpen ? 0 : 1200, // Open instantly, wait for letter to slide in before closing
    config: { mass: 1, tension: 120, friction: 20 }
  });

  const { opacity } = useSpring({
    opacity: isOpen ? 0 : 1, 
    delay: 800, // Wait 800ms for both opening and closing
    config: { mass: 1, tension: 120, friction: 20 }
  });

  return (
    <a.group visible={opacity.to(o => o > 0.01)}>
      {/* Front */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[width, height]} />
        <a.meshStandardMaterial map={textureFront} transparent opacity={opacity} />
      </mesh>

      {/* Back Base (White background for the inside of the envelope) */}
      <mesh position={[0, 0, -0.05]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <a.meshStandardMaterial color="#f0f0f0" transparent opacity={opacity} />
      </mesh>

      {/* Back Exposed Body (Bottom 68% of image2) */}
      <mesh position={[0, -height / 2 + exposedBodyHeight / 2, -0.051]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, exposedBodyHeight]} />
        <a.meshStandardMaterial map={textureBackBody} transparent opacity={opacity} />
      </mesh>

      {/* Flap (Top 32% of image2) */}
      <a.group
        position={[0, height / 2, -0.06]}
        rotation-x={rotateX}
      >
        <mesh position={[0, -flapHeight / 2, 0]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[width, flapHeight]} />
          <a.meshStandardMaterial map={textureBackFlap} side={THREE.DoubleSide} transparent opacity={opacity} />
        </mesh>
      </a.group>
    </a.group>
  );
}
