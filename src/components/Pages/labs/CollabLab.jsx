import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import io from 'socket.io-client';

const socket = io('https://example.com'); // serveur placeholder

export default function CollabLab() {
  const [peers, setPeers] = useState({});

  useEffect(() => {
    socket.on('move', ({ id, pos }) => {
      setPeers((p) => ({ ...p, [id]: pos }));
    });
    const handleMove = (e) => {
      const pos = [(e.clientX / window.innerWidth) * 4 - 2, 1, (e.clientY / window.innerHeight) * -4 + 2];
      socket.emit('move', { pos });
    };
    window.addEventListener('pointermove', handleMove);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      socket.off('move');
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground py-8 space-y-4">
      <h1 className="text-3xl text-center font-bold mb-4">Laboratoire collaboratif</h1>
      <p className="text-center mb-2">Partagez vos mouvements de souris avec les autres participants.</p>
      <Canvas camera={{ position: [0, 0, 5] }} style={{ height: '70vh' }}>
        <ambientLight intensity={0.5} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="purple" />
        </mesh>
        {Object.entries(peers).map(([key, position]) => (
          <mesh key={key} position={position}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="hotpink" />
          </mesh>
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
