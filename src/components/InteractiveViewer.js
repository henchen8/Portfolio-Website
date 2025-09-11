import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Preload the GLTF model
useGLTF.preload('/Assembly%206%20Motor%20Interfacing.gltf');

// Load the actual 3D model
function Model() {
  const { scene } = useGLTF('/Assembly%206%20Motor%20Interfacing.gltf');
  return <primitive object={scene} scale={30} />;
}

// Rubik's Cube Assembly component with your actual model
function RubiksCubeAssembly() {
  const groupRef = useRef();

  return (
    <group ref={groupRef}>
      {/* Your actual 3D model */}
      <Model />
    </group>
  );
}

// Main Interactive Viewer Component
function InteractiveViewer() {
  return (
    <div className="interactive-viewer-container">
      <Canvas
        camera={{ position: [25, 25, 25], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* The Rubik's Cube Assembly */}
        <RubiksCubeAssembly />
        
        {/* Controls for interaction */}
        <OrbitControls
          enablePan={true}
          enableZoom={false}
          enableRotate={true}
          minDistance={25}
          maxDistance={70}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}

export default InteractiveViewer;
