/**
 * @file Hero3D.jsx
 * @description Composant 3D animé utilisant @react-three/fiber et @react-three/drei.
 * Affiche un torus knot texturé pour un rendu immersif.
 */

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const Hero3D = () => {
    const meshRef = useRef();
    const [gradientTexture, normalMap] = useTexture([
        "textures/3d-geometric-weave-abstract-wallpaper-background.jpg",
        "textures/normalMap.jpg",
    ]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.1;
            meshRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
            <meshStandardMaterial
                color="#f5f5f5"
                map={gradientTexture}
                normalMap={normalMap}
                metalness={0.2}
                roughness={0.3}
                emissive="#ffffff"
                emissiveIntensity={0.05}
            />
        </mesh>
    );
};

export default Hero3D;
