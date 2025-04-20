// src/components/HiddenEditor/PoiForm.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function PoiForm({ poi, onSave, onCancel }) {
    const [title, setTitle] = useState(poi.title || "");
    const [description, setDescription] = useState(poi.description || "");

    useEffect(() => {
        console.log("[PoiForm] mounted with", poi);
    }, [poi]);

    const handleSubmit = e => {
        e.preventDefault();
        console.log("[PoiForm] submitting:", { id: poi.id, title, description });
        try {
            onSave({ ...poi, title, description });
        } catch (err) {
            console.error("[PoiForm] onSave error:", err);
        }
    };

    return (
        <form
            className="absolute top-1/4 left-1/4 bg-white p-4 rounded shadow-lg z-20 w-80"
            onSubmit={handleSubmit}
        >
            <h3 className="font-semibold mb-2">
                {poi.title ? "Modifier POI" : "Nouveau POI"}
            </h3>
            <div className="space-y-2">
                <input
                    placeholder="Titre *"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="border p-1 w-full"
                    required
                />
                <textarea
                    placeholder="Description *"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="border p-1 w-full"
                    rows={3}
                    required
                />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {
                    console.log("[PoiForm] cancel");
                    onCancel();
                }}>
                    Annuler
                </Button>
                <Button type="submit">Valider</Button>
            </div>
        </form>
    );
}
