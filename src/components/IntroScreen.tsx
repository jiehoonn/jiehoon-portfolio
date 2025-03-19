import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

// Create a simplex noise instance
const noise3D = createNoise3D();

// Distorting Bubble effect
function Bubble({ onExpand }: { onExpand: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.SphereGeometry>(null);
  const originalPositions = useRef<Float32Array | null>(null);
  const { mouse, viewport, size } = useThree();
  const [clicked, setClicked] = useState(false);
  const scale = useRef(1);
  const [expanding, setExpanding] = useState(false);
  const expansionStartTime = useRef<number | null>(null);
  
  // Smoothed mouse position
  const smoothedMouse = useRef({ x: 0, y: 0 });
  
  // Handle click and expansion
  const handleClick = () => {
    if (clicked || expanding) return;
    
    setClicked(true);
    
    // Start expansion after the squish animation
    setTimeout(() => {
      setExpanding(true);
      expansionStartTime.current = Date.now();
      
      // Notify parent component to transition
      setTimeout(() => {
        onExpand();
      }, 1200); // Make transition much quicker
    }, 500); // Faster initial animation
  };
  
  // Spring animation for click effect
  useEffect(() => {
    if (clicked && !expanding) {
      // Scale down when clicked
      const scaleDown = () => {
        scale.current -= 0.05;
        if (scale.current > 0.7) {
          requestAnimationFrame(scaleDown);
        }
      };
      scaleDown();
      
      // Then bounce back
      setTimeout(() => {
        const bounceUp = () => {
          scale.current += 0.03;
          if (scale.current < 1) {
            requestAnimationFrame(bounceUp);
          } else {
            scale.current = 1;
          }
        };
        bounceUp();
      }, 700);
    }
  }, [clicked, expanding]);
  
  // Store original vertex positions on first render
  useEffect(() => {
    if (geometryRef.current && !originalPositions.current) {
      const positions = geometryRef.current.attributes.position.array.slice();
      originalPositions.current = new Float32Array(positions);
    }
  }, []);
  
  // Calculate distance for mouse influence
  const getDistanceFactor = (mouseX: number, mouseY: number, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
    return 1 - Math.min(dist / maxDist, 1);
  };
  
  // Update vertices with noise
  useFrame(({ clock }) => {
    if (!geometryRef.current || !originalPositions.current || !meshRef.current) return;
    
    const time = clock.getElapsedTime();
    const positions = geometryRef.current.attributes.position.array as Float32Array;
    
    // Smooth mouse movement with easing
    smoothedMouse.current.x += (mouse.x - smoothedMouse.current.x) * 0.1;
    smoothedMouse.current.y += (mouse.y - smoothedMouse.current.y) * 0.1;
    
    // Calculate distance factor for mouse influence
    const mouseX = (smoothedMouse.current.x * 0.5 + 0.5) * size.width;
    const mouseY = (smoothedMouse.current.y * 0.5 + 0.5) * size.height;
    const distFactor = getDistanceFactor(mouseX, mouseY, size.width, size.height);
    
    // Handle expansion animation
    let expandScale = 1;
    if (expanding && expansionStartTime.current) {
      // Calculate progress based on actual elapsed time
      const elapsed = Math.min(1000, Date.now() - expansionStartTime.current); // Speed up to 1000ms
      const progress = elapsed / 1000; // normalize to 0-1
      
      // More dramatic expansion curve
      expandScale = 1 + Math.pow(progress * 10, 2); // Faster initial growth (8 -> 10)
    }
    
    // Apply noise to each vertex
    for (let i = 0; i < positions.length; i += 3) {
      const originalX = originalPositions.current[i];
      const originalY = originalPositions.current[i + 1];
      const originalZ = originalPositions.current[i + 2];
      
      // Generate multiple layers of noise for more complexity
      const noise1 = noise3D(
        originalX * 0.01 + time * 0.5,
        originalY * 0.01 + time * 0.5,
        originalZ * 0.01
      );
      
      const noise2 = noise3D(
        originalX * 0.02 - time * 0.3,
        originalY * 0.02 - time * 0.3,
        originalZ * 0.02 + time * 0.2
      );
      
      // Combine noise layers
      const combinedNoise = noise1 * 0.6 + noise2 * 0.4;
      
      // Reduce distortion during expansion for smoother look
      const distortionFactor = expanding ? 
        Math.max(0.1, 1 - Math.pow(expandScale / 10, 0.5)) : 
        1;
      
      // Calculate distortion factor - increased amplitude
      const ratio = 0.8 + (combinedNoise * 0.5 * (distFactor + 0.5) * distortionFactor);
      
      // Apply distortion and expansion
      positions[i] = originalX * ratio * expandScale;
      positions[i + 1] = originalY * ratio * expandScale;
      positions[i + 2] = originalZ * ratio * expandScale;
    }
    
    // Update geometry
    geometryRef.current.attributes.position.needsUpdate = true;
    
    // Apply smooth rotation based on mouse position
    if (meshRef.current) {
      // Reduce rotation during expansion
      const rotationFactor = expanding ? Math.max(0.1, 1 - expandScale / 10) : 1;
      
      // Smoother rotation with easing
      const targetRotY = (-4 + smoothedMouse.current.x * 4) * rotationFactor;
      const targetRotZ = (4 + smoothedMouse.current.y * -4) * rotationFactor;
      
      meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.1;
      meshRef.current.rotation.z += (targetRotZ - meshRef.current.rotation.z) * 0.1;
      
      // Apply scale - normal scale times expansion scale
      const finalScale = scale.current * (expanding ? expandScale : 1);
      meshRef.current.scale.set(finalScale, finalScale, finalScale);
    }
  });
  
  return (
    <mesh 
      ref={meshRef} 
      castShadow
      onPointerDown={handleClick}
    >
      <sphereGeometry 
        ref={geometryRef} 
        args={[120, 80, 80]} 
      />
      <meshStandardMaterial 
        emissive="#ff0099"
        emissiveIntensity={0.8}
        roughness={0.61}
        metalness={0.21}
      />
    </mesh>
  );
}

// Shadow plane
function ShadowPlane() {
  return (
    <mesh 
      receiveShadow 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -150, 0]}
    >
      <planeGeometry args={[2000, 2000]} />
      <shadowMaterial opacity={0.15} />
    </mesh>
  );
}

// Main 3D scene
function Scene({ onEnter }: { onEnter: () => void }) {
  // Setup lights
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 300]} fov={100} />
      
      {/* Lights */}
      <hemisphereLight intensity={0.5} />
      <directionalLight 
        position={[0, 450, 350]} 
        intensity={0.4} 
        color="#ff8f16"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-left={-650}
        shadow-camera-right={650}
        shadow-camera-top={650}
        shadow-camera-bottom={-650}
        shadow-camera-near={1}
        shadow-camera-far={1000}
      />
      <directionalLight position={[-600, 350, 350]} intensity={0.25} color="#fff150" />
      <directionalLight position={[0, -250, 300]} intensity={0.15} color="#fff150" />
      
      {/* Fog */}
      <fog attach="fog" args={['#000000', 10, 950]} />
      
      {/* Bubble and Plane */}
      <Bubble onExpand={onEnter} />
      <ShadowPlane />
      
      {/* Fixed Hint Text - positioned directly in the scene */}
      <Text
        fontSize={24}
        position={[0, -220, 0]}
        color="#ffffff"
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Click the bubble
      </Text>
    </>
  );
}

// Main intro screen component
function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  
  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 300); // Much faster final transition
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 300], fov: 100 }}
      >
        <Scene onEnter={handleEnter} />
      </Canvas>
      
      {isExiting && (
        <motion.div 
          className="fixed inset-0 bg-black z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}
    </motion.div>
  );
}

export default IntroScreen; 