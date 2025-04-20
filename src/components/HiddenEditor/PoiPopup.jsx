// src/components/HiddenEditor/PoiPopup.jsx
import React, { useState } from "react";
import { Html } from "@react-three/drei";

/**
 * PoiPopup
 * Affiche un marqueur 📍 et une bulle de description
 * qui s’ajuste automatiquement à la taille de son contenu.
 */
export default function PoiPopup({ poi, editMode, onSelect }) {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(o => !o);
        if (!open && onSelect) {
            onSelect(poi);
        }
    };

    return (
        <group position={[poi.position.x, poi.position.y, poi.position.z]}>
            <Html center>
                <div
                    className="annotation cursor-pointer transition-transform hover:scale-110"
                    onClick={toggle}
                >
                    📍
                    {open && (
                        <div
                            className="
                annotation-popup
                bg-white
                p-3
                rounded-2xl
                shadow-lg
                text-sm
                max-w-sm
                whitespace-normal
                break-words
              "
                            style={{ width: "auto", height: "auto" }}
                        >
                            <strong className="block mb-1">{poi.title}</strong>
                            <p>{poi.description}</p>
                        </div>
                    )}
                </div>
            </Html>
        </group>
    );
}
