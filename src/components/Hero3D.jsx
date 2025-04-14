/**
 * @file Hero3D.jsx
 * @description Composant 3D animé pour afficher le modèle GLB "cell.glb" avec des points d'intérêt interactifs.
 * Le modèle est recentré pour que la rotation se fasse autour de son centre.
 * Un éclairage ambiant et directionnel (venant de la caméra) est utilisé.
 * Chaque point d'intérêt (petite sphère rouge) affiche une popup avec des informations lorsqu'on clique dessus.
 */

import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

// Composant pour un point d'intérêt interactif
function PointOfInterest({ position, label }) {
    const [open, setOpen] = useState(false);

    return (
        <mesh
            position={position}
            // L'arrêt de la propagation permet de ne pas déclencher la rotation du groupe lors du clic
            onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
            }}
        >
            {/* Petite sphère rouge pour représenter le point */}
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="red" />
            {open && (
                // Le composant Html de Drei permet d'afficher un élément HTML dans le monde 3D
                <Html
                    // distanceFactor ajuste la taille de l'overlay en fonction de la distance
                    distanceFactor={10}
                    // style de base pour la popup
                    style={{
                        background: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                    }}
                    // Positionnement relatif au centre du marqueur
                    center
                >
                    {label}
                </Html>
            )}
        </mesh>
    );
}

export default function Hero3D() {
    const groupRef = useRef();
    const gltf = useGLTF("/assets/cell.glb");
    const { scene, camera } = useThree();

    // Recentrage du modèle sur (0,0,0) grâce à la bounding box
    useEffect(() => {
        if (!gltf?.scene) return;
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        box.getCenter(center);
        gltf.scene.position.sub(center);
    }, [gltf]);

    // Animation de rotation : on fait tourner le groupe uniquement autour de Y
    useFrame((_, delta) => {
        if (groupRef.current) {
            // Pas de rotation sur X pour éviter l'effet de retournement
            groupRef.current.rotation.x = 0;
            groupRef.current.rotation.y += delta * 0.15;
        }
    });

    // Référence pour la directionalLight que l'on veut placer à la position de la caméra
    const directionalLightRef = useRef();
    useFrame(() => {
        if (directionalLightRef.current) {
            // Place la lumière au même endroit que la caméra
            directionalLightRef.current.position.copy(camera.position);
            // Oriente la lumière vers le centre de la scène (ou du modèle)
            directionalLightRef.current.target.position.set(0, 0, 0);
            scene.add(directionalLightRef.current.target);
        }
    });

    return (
        <>
            {/* Lumière ambiante pour un éclairage uniforme */}
            <ambientLight intensity={0.7} />
            {/* Directional Light placée au niveau de la caméra */}
            <directionalLight
                ref={directionalLightRef}
                intensity={2.0}
                color="#ffffff"
            />
            {/* Groupe contenant le modèle 3D et les points d'intérêt */}
            <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
                {/* Le modèle 3D */}
                <primitive object={gltf.scene} />
                {/* Ajout de quelques points d'intérêt (position à ajuster selon votre modèle) */}
                <PointOfInterest position={[0.5, 0.2, 0.1]} label="Noyau" />
                <PointOfInterest position={[-0.3, -0.1, 0.4]} label="Mitochondrie" />
            </group>
        </>
    );
}
