import React, { useState } from "react";

const GyroPermissionButton = () => {
    const [permission, setPermission] = useState(null);

    const requestGyroPermission = () => {
        if (
            typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
            DeviceOrientationEvent.requestPermission()
                .then((response) => {
                    setPermission(response);
                })
                .catch((error) => console.error("Erreur de permission:", error));
        }
    };

    return (
        <button onClick={requestGyroPermission} className="bg-blue-600 text-white px-4 py-2 rounded">
            Activer le gyroscope
        </button>
    );
};

export default GyroPermissionButton;
