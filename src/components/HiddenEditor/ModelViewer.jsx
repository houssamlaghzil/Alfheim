// src/components/HiddenEditor/ModelViewer.jsx
import React, { useEffect } from "react";
import * as THREE from "three";
import { useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PoiPopup from "./PoiPopup";

export default function ModelViewer({ url, pois, editMode, onAddPoi, onSelectPoi }) {
    const gltf = useLoader(GLTFLoader, url);
    const { scene, camera, gl } = useThree();

    useEffect(() => {
        console.log("[Viewer] adding model to scene");
        scene.add(gltf.scene);
        return () => {
            console.log("[Viewer] removing model from scene");
            scene.remove(gltf.scene);
        };
    }, [gltf, scene]);

    useEffect(() => {
        if (!editMode) return;
        const raycaster = new THREE.Raycaster();
        const handleClick = e => {
            const { left, top, width, height } = gl.domElement.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 2 - 1;
            const y = -((e.clientY - top) / height) * 2 + 1;
            raycaster.setFromCamera({ x, y }, camera);
            const hits = raycaster.intersectObject(gltf.scene, true);
            if (hits.length) {
                console.log("[Viewer] model clicked at", hits[0].point);
                onAddPoi(hits[0].point);
            }
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
                            console.log("[Viewer] POI mesh clicked", poi);
                            onSelectPoi(poi);
                        }}
                    >
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                ) : (
                    <PoiPopup key={poi.id} poi={poi} />
                )
            )}
        </>
    );
}
