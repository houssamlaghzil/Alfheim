import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
// Assurez-vous d'avoir installé `@react-three/drei` : npm install @react-three/drei
import { useTexture } from "@react-three/drei";

function Hero3D() {
    const meshRef = useRef();

    // Chargement d'une texture de dégradé + d'une normal map (optionnelle)
    // Placez vos fichiers (pastelGradient.png, normalMap.png) dans /public/textures/
    const [gradientTexture, normalMap] = useTexture([
        "src/textures/3d-geometric-weave-abstract-wallpaper-background.jpg",
        "src/textures/normalMap.jpg", // Supprimez si vous n'avez pas de normal map
    ]);

    // Animation de rotation
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
                // Couleur de base très claire pour laisser la texture visible
                color="#f5f5f5"
                // Texture de dégradé appliquée sur la géométrie
                map={gradientTexture}
                // Normal map (si vous avez un fichier normalMap.png)
                normalMap={normalMap}
                // Ajustez metalness/roughness pour plus ou moins de brillance
                metalness={0.2}
                roughness={0.3}
                // Éventuellement un léger émissif pour un rendu plus lumineux
                emissive="#ffffff"
                emissiveIntensity={0.05}
            />
        </mesh>
    );
}

export default Hero3D;
