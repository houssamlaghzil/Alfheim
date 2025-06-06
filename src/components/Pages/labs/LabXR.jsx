import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { VRButton, XR } from '@react-three/xr';
import { OrbitControls } from '@react-three/drei';
import GyroPermissionButton from '@/components/GyroPermissionButton.jsx';

export default function LabXR() {
  useEffect(() => {
    const handleOrientation = (e) => {
      const rot = e.alpha || 0;
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground py-8 space-y-4">
      <h1 className="text-3xl text-center font-bold mb-4">Laboratoire VR</h1>
      <p className="text-center mb-2">Entrez dans une expérience immersive et manipulez les objets en 3D.</p>
      <div className="flex justify-center mb-4"><GyroPermissionButton /></div>
      <VRButton />
      <Canvas camera={{ position: [0, 1.5, 3] }} style={{ height: '70vh' }}>
        <XR>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <mesh position={[0, 1, -2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
          <mesh position={[2, 0.5, -3]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="skyblue" />
          </mesh>
        </XR>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
