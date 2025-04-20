import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Formulaire flottant en mode édition.
 */
export default function PoiForm({ poi, onSave, onCancel }) {
    const [title, setTitle] = useState(poi.title || "");
    const [description, setDescription] = useState(poi.description || "");

    useEffect(() => {
        setTitle(poi.title || "");
        setDescription(poi.description || "");
    }, [poi]);

    const handleSubmit = e => {
        e.preventDefault();
        onSave({ ...poi, title, description });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <form
                onSubmit={handleSubmit}
                className="pointer-events-auto bg-white p-6 rounded-2xl shadow-lg w-80 space-y-4"
            >
                <h3 className="text-lg font-semibold">
                    {poi.title ? "Modifier POI" : "Nouveau POI"}
                </h3>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Titre *"
                    required
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                />
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description *"
                    required
                    rows={3}
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                />
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onCancel}>
                        Annuler
                    </Button>
                    <Button type="submit">Valider</Button>
                </div>
            </form>
        </div>
    );
}
