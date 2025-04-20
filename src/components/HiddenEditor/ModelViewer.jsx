import React, { useEffect } from "react";
import * as THREE from "three";
import { useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PoiPopup from "./PoiPopup";

/**
 * Renders the GLTF model, handles clicks to add/edit POIs,
 * and displays POIs with a callback onSelect.
 */
export default function ModelViewer({ url, pois, editMode, onAddPoi, onSelectPoi }) {
    const gltf = useLoader(GLTFLoader, url);
    const { scene, camera, gl } = useThree();

    // insertion du modèle dans la scène
    useEffect(() => {
        scene.add(gltf.scene);
        return () => scene.remove(gltf.scene);
    }, [gltf, scene]);

    // clic pour ajouter un POI
    useEffect(() => {
        if (!editMode) return;
        const ray = new THREE.Raycaster();
        const handleClick = e => {
            const { left, top, width, height } = gl.domElement.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 2 - 1;
            const y = -((e.clientY - top) / height) * 2 + 1;
            ray.setFromCamera({ x, y }, camera);
            const hits = ray.intersectObject(gltf.scene, true);
            if (hits.length) onAddPoi(hits[0].point);
        };
        gl.domElement.addEventListener("click", handleClick);
        return () => gl.domElement.removeEventListener("click", handleClick);
    }, [editMode, camera, gl, gltf.scene, onAddPoi]);

    return (
        <>
            {pois.map(poi =>
                editMode ? (
                    <mesh
                        key={poi.id}
                        position={[poi.position.x, poi.position.y, poi.position.z]}
                        onClick={e => {
                            e.stopPropagation();
                            onSelectPoi(poi);
                        }}
                    >
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                ) : (
                    <PoiPopup key={poi.id} poi={poi} onSelect={onSelectPoi} />
                )
            )}
        </>
    );
}
