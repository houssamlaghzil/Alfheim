// src/components/Pages/HiddenEditor.jsx
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { auth, storage } from "@/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { createModel, updateModel, updatePois, listModels, getModel } from "@/api/models";
import ModelViewer from "@/components/HiddenEditor/ModelViewer";
import PoiForm from "@/components/HiddenEditor/PoiForm";
import PoiPopup from "@/components/HiddenEditor/PoiPopup";
import { Button } from "@/components/ui/button";

export default function HiddenEditor() {
    const { modelId } = useParams();
    const navigate = useNavigate();
    const editMode = new URLSearchParams(useLocation().search).get("edit") === "true";
    const toast = useToast();

    // --- Authentification ---
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, u => {
            console.log("[Auth] state changed:", u);
            setUser(u);
        });
        return () => unsub();
    }, []);

    const handleLogin = async () => {
        console.log("[Auth] attempting login:", email);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.toast({ title: "Connecté", description: auth.currentUser.email });
        } catch (e) {
            console.error("[Auth] login error:", e);
            toast.toast({ title: "Erreur login", description: e.message, variant: "destructive" });
        }
    };
    const handleLogout = async () => {
        console.log("[Auth] logging out");
        try {
            await signOut(auth);
            toast.toast({ title: "Déconnecté" });
        } catch (e) {
            console.error("[Auth] logout error:", e);
        }
    };

    // --- Liste des modèles existants ---
    const [modelsList, setModelsList] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState("");
    useEffect(() => {
        if (!user) return;
        (async () => {
            console.log("[UI] fetching modelsList");
            try {
                const list = await listModels();
                setModelsList(list);
            } catch (e) {
                console.error("[UI] listModels error:", e);
                toast.toast({ title: "Erreur liste", description: e.message, variant: "destructive" });
            }
        })();
    }, [user]);

    // --- État du modèle et POIs ---
    const [modelUrl, setModelUrl] = useState("");
    const [fileName, setFileName] = useState("");
    const [tags, setTags] = useState("");
    const [pois, setPois] = useState([]);
    const [selectedPoi, setSelectedPoi] = useState(null);
    const [isOwnerOrAdmin, setIsOwnerOrAdmin] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // --- Chargement d’un modèle unique ---
    useEffect(() => {
        if (!user || !modelId) return;
        (async () => {
            console.log("[UI] fetching getModel:", modelId);
            try {
                const m = await getModel(modelId);
                setModelUrl(m.url);
                setFileName(m.name);
                setTags((m.tags || []).join(","));
                setPois(Object.entries(m.pois || {}).map(([id, p]) => ({ id, ...p })));
                setIsOwnerOrAdmin(m.userId === user.uid);
            } catch (e) {
                console.error("[UI] getModel error:", e);
                toast.toast({ title: "Erreur modèle", description: e.message, variant: "destructive" });
            }
        })();
    }, [user, modelId]);

    // --- Gestion du fichier GLB ---
    const handleFileChange = e => {
        const f = e.target.files[0];
        console.log("[UI] file selected:", f);
        if (f) {
            setSelectedFile(f);
            setFileName(f.name);
        }
    };

    // --- Création / mise à jour du modèle ---
    const handleSaveModel = async () => {
        console.log("[UI] saveModel start:", { modelId, fileName, tags, selectedFile });
        if (!user) {
            toast.toast({ title: "Erreur", description: "Connectez‑vous d’abord.", variant: "destructive" });
            return;
        }
        if (!fileName || (!selectedFile && !modelUrl)) {
            toast.toast({ title: "Erreur", description: "Nom et fichier requis.", variant: "destructive" });
            return;
        }
        try {
            let urlToSave = modelUrl;
            if (selectedFile) {
                console.log("[Storage] uploading new GLB");
                const path = `models/${user.uid}/${Date.now()}_${selectedFile.name}`;
                const sRef = storageRef(storage, path);
                await uploadBytes(sRef, selectedFile);
                urlToSave = await getDownloadURL(sRef);
                console.log("[Storage] uploaded URL:", urlToSave);
            }
            const tagsArray = tags.split(",").map(t => t.trim()).filter(Boolean);

            let newId = modelId;
            if (modelId) {
                console.log("[API] updateModel");
                await updateModel(modelId, fileName, urlToSave, tagsArray);
            } else {
                console.log("[API] createModel");
                newId = await createModel(fileName, urlToSave, tagsArray);
            }

            toast.toast({ title: "Modèle enregistré" });
            navigate(`/hidden/${newId}?edit=true`);
        } catch (e) {
            console.error("[Error] saveModel:", e);
            toast.toast({ title: "Erreur sauvegarde", description: e.message, variant: "destructive" });
        }
    };

    // --- Sauvegarde des POIs ---
    const handleSavePois = async () => {
        console.log("[UI] savePois start:", pois);
        if (!modelId) return;
        try {
            const poisObj = Object.fromEntries(
                pois.map(p => [p.id, { title: p.title, description: p.description, position: p.position }])
            );
            await updatePois(modelId, poisObj);
            toast.toast({ title: "POIs enregistrés" });
            navigate(`/hidden/${modelId}`);
        } catch (e) {
            console.error("[Error] savePois:", e);
            toast.toast({ title: "Erreur POIs", description: e.message, variant: "destructive" });
        }
    };

    // --- Si non connecté, afficher login ---
    if (!user) {
        return (
            <div className="p-8 space-y-4">
                <h1 className="text-2xl font-bold">Connexion requise</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border p-2 w-full"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="border p-2 w-full"
                />
                <Button onClick={handleLogin}>Se connecter</Button>
                <Toaster />
            </div>
        );
    }

    // --- UI principale ---
    return (
        <div className="p-8 space-y-6">
            <Toaster />
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    {!modelId
                        ? "Créer ou charger un modèle"
                        : editMode
                            ? "Édition du modèle"
                            : "Visualisation du modèle"}
                </h1>
                <Button variant="outline" onClick={handleLogout}>
                    Déconnexion
                </Button>
            </div>

            {!modelId && (
                <div className="flex items-center space-x-2">
                    <select
                        className="border p-2 flex-1"
                        value={selectedModelId}
                        onChange={e => setSelectedModelId(e.target.value)}
                    >
                        <option value="">-- Charger un modèle existant --</option>
                        {modelsList.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                    <Button
                        onClick={() => navigate(`/hidden/${selectedModelId}?edit=true`)}
                        disabled={!selectedModelId}
                    >
                        Charger
                    </Button>
                </div>
            )}

            {(!modelId || editMode) && (
                <div className="space-y-2">
                    <input type="file" accept=".glb" onChange={handleFileChange} />
                    <input
                        type="text"
                        placeholder="Nom du modèle *"
                        value={fileName}
                        onChange={e => setFileName(e.target.value)}
                        className="border p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Tags / catégorie (facultatif)"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        className="border p-2 w-full"
                    />
                    <Button
                        onClick={handleSaveModel}
                        disabled={!fileName || (!selectedFile && !modelUrl)}
                    >
                        Enregistrer le modèle
                    </Button>
                </div>
            )}

            {modelUrl && (
                <div style={{ height: 500 }} className="mb-6">
                    <Canvas camera={{ position: [0,1,4], fov: 60 }} style={{ width: "100%", height: "100%" }}>
                        <ambientLight intensity={0.6} />
                        <pointLight position={[10,10,10]} intensity={0.8} />
                        <Suspense fallback={<Html center>Chargement 3D…</Html>}>
                            <ModelViewer
                                url={modelUrl}
                                pois={pois}
                                editMode={editMode && isOwnerOrAdmin}
                                onAddPoi={pos => {
                                    console.log("[UI] onAddPoi", pos);
                                    const newPoi = { id: Date.now().toString(), position: pos, title: "", description: "" };
                                    setPois(ps => [...ps, newPoi]);
                                    setSelectedPoi(newPoi);
                                }}
                                onSelectPoi={poi => {
                                    console.log("[UI] onSelectPoi", poi);
                                    setSelectedPoi(poi);
                                }}
                            />
                        </Suspense>
                        <OrbitControls />
                    </Canvas>
                </div>
            )}

            {selectedPoi && (
                <PoiForm
                    poi={selectedPoi}
                    onCancel={() => {
                        console.log("[UI] PoiForm cancel");
                        setSelectedPoi(null);
                    }}
                    onSave={updated => {
                        console.log("[UI] PoiForm save", updated);
                        setPois(ps => ps.map(p => (p.id === updated.id ? updated : p)));
                        setSelectedPoi(null);
                    }}
                />
            )}

            {editMode && isOwnerOrAdmin && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Points d’intérêt</h2>
                    <ul className="space-y-2 mb-4">
                        {pois.map(p => (
                            <li key={p.id} className="flex justify-between items-center border p-2 rounded">
                                <span>{p.title || "[sans titre]"}</span>
                                <div className="space-x-2">
                                    <Button size="sm" onClick={() => setSelectedPoi(p)}>Éditer</Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {
                                            console.log("[UI] delete POI", p);
                                            setPois(ps => ps.filter(x => x.id !== p.id));
                                        }}
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Button onClick={handleSavePois}>Terminer l’édition</Button>
                </div>
            )}
        </div>
    );
}
