/**
 * @file DemoConception.jsx
 * @description Page de démonstration "Demo 3 : Conception réalité".
 * Variante de la démo d'information, avec un style différent pour illustrer la phase de conception.
 */

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Edges, MeshPortalMaterial, CameraControls, Environment, PivotControls } from '@react-three/drei'
import { useControls } from 'leva'

export const DemoConception = () => (
    <Canvas shadows camera={{ position: [-3, 0.5, 3] }} style={{ width: '100%', height: '100vh' }}>
        <PivotControls anchor={[-1, -1, -1]} scale={0.8} lineWidth={4}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2, 2, 2]} />
                <Edges />
                <Side rotation={[0, 0, 0]} bg="darkorange" index={0}>
                    <torusGeometry args={[0.7, 0.3, 64]} />
                </Side>
                <Side rotation={[0, Math.PI, 0]} bg="skyblue" index={1}>
                    <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
                </Side>
                <Side rotation={[0, Math.PI / 2, Math.PI / 2]} bg="lightgreen" index={2}>
                    <boxGeometry args={[1.2, 1.2, 1.2]} />
                </Side>
                <Side rotation={[0, Math.PI / 2, -Math.PI / 2]} bg="mediumpurple" index={3}>
                    <octahedronGeometry />
                </Side>
                <Side rotation={[0, -Math.PI / 2, 0]} bg="crimson" index={4}>
                    <icosahedronGeometry />
                </Side>
                <Side rotation={[0, Math.PI / 2, 0]} bg="hotpink" index={5}>
                    <dodecahedronGeometry />
                </Side>
            </mesh>
        </PivotControls>
        <CameraControls makeDefault />
    </Canvas>
)

function Side({ rotation = [0, 0, 0], bg = '#f0f0f0', children, index }) {
    const mesh = useRef()
    const { worldUnits } = useControls({ worldUnits: false })
    const { nodes } = useGLTF('/aobox-transformed.glb')
    useFrame((state, delta) => {
        if (mesh.current) {
            // Augmente légèrement la vitesse de rotation pour cette démo
            mesh.current.rotation.x += delta * 0.2
            mesh.current.rotation.y += delta * 0.2
        }
    })
    return (
        <MeshPortalMaterial worldUnits={worldUnits} attach={`material-${index}`}>
            <ambientLight intensity={0.5} />
            <Environment preset="sunset" />
            <mesh castShadow receiveShadow rotation={rotation} geometry={nodes.Cube.geometry}>
                <meshStandardMaterial aoMapIntensity={1} aoMap={nodes.Cube.material.aoMap} color={bg} />
                <spotLight castShadow color={bg} intensity={2} position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-normalBias={0.05} shadow-bias={0.0001} />
            </mesh>
            <mesh castShadow receiveShadow ref={mesh}>
                {children}
                <meshLambertMaterial color={bg} />
            </mesh>
        </MeshPortalMaterial>
    )
}
