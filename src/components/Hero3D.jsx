/**
 * @file Hero3D.jsx
 * @description Composant 3D animé pour afficher le modèle GLB "cell.glb" avec des points d'intérêt posés sur sa surface.
 * Les points d'intérêt sont calculés via raycasting, et leur taille/ couleur ont été augmentées pour une meilleure visibilité.
 * Un clic sur chaque point affiche une popup d'informations, et OrbitControls permet de zoomer/dézoomer.
 */

import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Composant pour un point d'intérêt interactif
/*function PointOfInterest({ position, label }) {
    const [open, setOpen] = useState(false);
    return (
        <mesh
            position={position}
            onClick={(e) => {
                e.stopPropagation(); // Empêche le clic de perturber la rotation
                setOpen(!open);
            }}
        >
            {/!* Augmentation de la taille de la sphère (rayon 0.15 au lieu de 0.05) et plus de segments *!/}
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="red" />
            {open && (
                <Html
                    distanceFactor={10}
                    style={{
                        background: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                    }}
                    center
                >
                    {label}
                </Html>
            )}
        </mesh>
    );
}*/

export default function Hero3D() {
    const groupRef = useRef();
    const directionalLightRef = useRef();
    const gltf = useGLTF("/assets/cell.glb");
    const { scene, camera } = useThree();
    const [interestPoints, setInterestPoints] = useState([]);

    // Recentrage du modèle sur (0,0,0)
    useEffect(() => {
        if (!gltf?.scene) return;
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        box.getCenter(center);
        gltf.scene.position.sub(center);
    }, [gltf]);

    // Calcul automatique des points d'intérêt sur la surface
  /*  useEffect(() => {
        if (!gltf?.scene || !groupRef.current) return;

        const interestDefs = [
            { id: "point1", direction: new THREE.Vector3(500, 15000, 500), label: "Noyau" },
            { id: "point2", direction: new THREE.Vector3(-0.3, -0.1, 0.4), label: "Mitochondrie" },
        ];
        const raycaster = new THREE.Raycaster();
        const origin = new THREE.Vector3(0, 0, 0);
        const computedPoints = interestDefs.map((def) => {
            raycaster.set(origin, def.direction.clone().normalize());
            const intersects = raycaster.intersectObject(gltf.scene, true);
            let pos;
            if (intersects.length > 0) {
                pos = intersects[0].point.clone();
                pos = groupRef.current.worldToLocal(pos);
            } else {
                pos = def.direction.clone().normalize().multiplyScalar(1);
            }
            return { ...def, position: pos };
        });
        setInterestPoints(computedPoints);
    }, [gltf, groupRef.current]);*/

    // Rotation continue du groupe (seule la rotation sur Y est appliquée)
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = 0;
            groupRef.current.rotation.y += delta * 0.15;
        }
    });

    // Mise à jour de la directionalLight pour qu'elle suive la caméra
    useFrame(() => {
        if (directionalLightRef.current) {
            directionalLightRef.current.position.copy(camera.position);
            directionalLightRef.current.target.position.set(0, 0, 0);
            scene.add(directionalLightRef.current.target);
        }
    });

    return (
        <>
            {/* Lumière ambiante pour un éclairage global */}
            <ambientLight intensity={0.7} />
            {/* DirectionalLight placée à la position de la caméra */}
            <directionalLight ref={directionalLightRef} intensity={2.0} color="#ffffff" />
            {/* Groupe contenant le modèle 3D et les points d'intérêt */}
            <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
                <primitive object={gltf.scene} />
                {interestPoints.map((pt) => (
                    <PointOfInterest key={pt.id} position={pt.position} label={pt.label} />
                ))}
            </group>
            {/* OrbitControls permet de zoomer/dézoomer via la molette et de faire pivoter la vue */}
            <OrbitControls />
        </>
    );
}
