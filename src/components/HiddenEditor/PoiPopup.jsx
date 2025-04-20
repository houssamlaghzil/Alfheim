// src/components/HiddenEditor/PoiPopup.jsx
import React, { useState } from "react";
import { Html } from "@react-three/drei";

export default function PoiPopup({ poi }) {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        console.log("[PoiPopup] toggle:", poi, !open);
        setOpen(o => !o);
    };

    return (
        <group position={[poi.position.x, poi.position.y, poi.position.z]}>
            <Html center>
                <div className="cursor-pointer annotation" onClick={toggle}>
                    📍
                    {open && (
                        <div className="annotation-popup">
                            <strong>{poi.title}</strong>
                            <p>{poi.description}</p>
                        </div>
                    )}
                </div>
            </Html>
        </group>
    );
}
