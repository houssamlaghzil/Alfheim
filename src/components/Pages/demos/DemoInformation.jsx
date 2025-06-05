/**
 * @file DemoInformation.jsx
 * @description Page de démonstration "Demo Information".
 * Cette page présente le modèle 3D issu du concept original de Tom Bogner,
 * avec des annotations cliquables pour Thalia, Euphrosyne et Aglaia.
 * Lorsqu'on clique sur une annotation, une petite popup stylisée apparaît en premier plan avec une explication,
 * puis disparaît après quelques secondes.
 */

import React, { useRef, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { useGLTF, SoftShadows, Html, CameraControls, PivotControls, Environment } from '@react-three/drei'
import { easing, geometry } from 'maath'

extend(geometry)

// Composant Annotation : Affiche une annotation cliquable qui, au clic, affiche une popup.
// Ici, on supprime la propriété "geometry" pour éviter que Three.js rende un mesh de fond.
function Annotation({ children, info, ...props }) {
    const [showPopup, setShowPopup] = useState(false)

    // Au clic, affiche la popup pendant 3 secondes
    const handleClick = () => {
        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 3000)
    }

    return (
        <Html
            {...props}
            transform
            occlude="blending"
            portal={document.body}
            zIndexRange={[10000, 100000]}
            style={{ pointerEvents: 'none', background: 'hsl(var(--card))' }}
        >
            <div
                className="annotation cursor-pointer"
                onClick={handleClick}
                style={{
                    background: 'hsl(var(--card))',
                    padding: '0.3em 0.6em',
                    borderRadius: '4px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    color: 'hsl(var(--foreground))',
                    pointerEvents: 'auto'
                }}
            >
                {children}
                {showPopup && (
                    <div
                        className="annotation"
                        style={{
                            background: 'hsl(var(--card))',
                            padding: '0.4em 0.8em',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            whiteSpace: 'nowrap',
                            fontSize: '0.8em',
                            zIndex: 1000000,
                            boxShadow: '0px 0px 8px rgba(0,0,0,0.2)'
                        }}
                    >
                        {info || "Information non disponible."}
                    </div>
                )}
            </div>
        </Html>
    )
}

// Composant Model : Charge et anime le modèle 3D, et affiche trois annotations cliquables.
function Model(props) {
    const group = useRef()
    const light = useRef()
    const { nodes } = useGLTF('/graces-draco.glb') // Assurez-vous que ce fichier se trouve dans le dossier public
    useFrame((state, delta) => {
        // Animation basée sur le pointeur pour l'interactivité
        easing.dampE(group.current.rotation, [0, -state.pointer.x * (Math.PI / 10), 0], 1.5, delta)
        easing.damp3(group.current.position, [0, -5.5, 1 - Math.abs(state.pointer.x)], 1, delta)
        easing.damp3(light.current.position, [state.pointer.x * 12, 0, 8 + state.pointer.y * 4], 0.2, delta)
    })
    return (
        <group ref={group} {...props}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Node_3.geometry}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.2}
                dispose={null}
            >
                {/* Utiliser une couleur plus claire pour éviter un rendu trop sombre */}
                <meshLambertMaterial color="#808080" />
            </mesh>
            <Annotation
                position={[1.75, 3, 5]}
                info="Thalia : Déesse de la comédie et de la poésie, symbole de joie et de légèreté."
            >
                Thalia <span style={{ fontSize: '1em' }}>🌗</span>
            </Annotation>
            <Annotation
                position={[-4.5, 3.6, 5]}
                info="Euphrosyne : Déesse de la joie et de la bonne humeur, incarnant l'harmonie."
            >
                Euphrosyne <span style={{ fontSize: '1em' }}>🌖</span>
            </Annotation>
            <Annotation
                position={[1.5, 8, 5]}
                info="Aglaia : Déesse de la splendeur, symbole de beauté et d'éclat de la connaissance."
            >
                <span style={{ fontSize: '1em' }}>🌕</span> Aglaia
            </Annotation>
            <spotLight
                angle={0.5}
                penumbra={0.5}
                ref={light}
                castShadow
                intensity={1000}  // Vous pouvez ajuster cette valeur pour augmenter la portée
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.001}
            >
                <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
            </spotLight>
        </group>
    )
}

// Composant principal de la démo "Demo Information"
export function DemoInformation() {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 1.5, 14], fov: 45 }}
            style={{ width: '100%', height: '100vh' }}
        >
            <fog attach="fog" args={['black', 0, 20]} />
            <pointLight position={[10, -10, -20]} intensity={10} />
            <pointLight position={[-10, -10, -20]} intensity={10} />
            <PivotControls anchor={[-1.1, -1.1, -1.1]} scale={0.75} lineWidth={3.5}>
                <Model position={[0, -5.5, 3]} rotation={[0, -0.2, 0]} />
            </PivotControls>
            <CameraControls
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
                makeDefault
            />
            <SoftShadows samples={3} />
            <Environment preset="city" />
        </Canvas>
    )
}
