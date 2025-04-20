import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { auth, storage } from "@/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
    createModel,
    updateModel,
    updatePois,
    listModels,
    getModel,
} from "@/api/models";
import ModelViewer from "@/components/HiddenEditor/ModelViewer";
import PoiForm from "@/components/HiddenEditor/PoiForm";
import ChatSidebar from "@/components/HiddenEditor/ChatSidebar";
import { Button } from "@/components/ui/button";

export default function HiddenEditor() {
    const { modelId } = useParams();
    const navigate = useNavigate();
    const isEditMode = new URLSearchParams(useLocation().search).get("edit") === "true";
    const toast = useToast();

    // Auth
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.toast({ title: "Connecté", description: auth.currentUser.email });
        } catch (e) {
            toast.toast({ title: "Erreur login", description: e.message, variant: "destructive" });
        }
    };
    const handleLogout = async () => {
        await signOut(auth);
        toast.toast({ title: "Déconnecté" });
    };

    // Liste des modèles
    const [modelsList, setModelsList] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState("");
    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                const list = await listModels();
                setModelsList(list);
            } catch (e) {
                toast.toast({ title: "Erreur liste", description: e.message, variant: "destructive" });
            }
        })();
    }, [user]);

    // État du modèle
    const [modelUrl, setModelUrl] = useState("");
    const [fileName, setFileName] = useState("");
    const [tags, setTags] = useState("");
    const [pois, setPois] = useState([]);
    const [selectedPoi, setSelectedPoi] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    // Contexte du chat
    const [chatContext, setChatContext] = useState("");

    // Chargement d’un modèle existant
    useEffect(() => {
        if (!user || !modelId) return;
        (async () => {
            try {
                const m = await getModel(modelId);
                setModelUrl(m.url);
                setFileName(m.name);
                setTags((m.tags || []).join(","));
                setPois(Object.entries(m.pois || {}).map(([id, p]) => ({ id, ...p })));
                setIsOwner(m.userId === user.uid);
            } catch (e) {
                toast.toast({ title: "Erreur modèle", description: e.message, variant: "destructive" });
            }
        })();
    }, [user, modelId]);

    // Gestion du fichier GLB
    const handleFileChange = e => {
        const f = e.target.files[0];
        if (f) {
            setSelectedFile(f);
            setFileName(f.name);
        }
    };

    // (Re)création ou mise à jour du modèle
    const handleSaveModel = async () => {
        if (!fileName || (!selectedFile && !modelUrl)) {
            toast.toast({ title: "Erreur", description: "Nom et fichier requis.", variant: "destructive" });
            return;
        }
        let urlToSave = modelUrl;
        if (selectedFile) {
            const path = `models/${user.uid}/${Date.now()}_${selectedFile.name}`;
            const sRef = storageRef(storage, path);
            await uploadBytes(sRef, selectedFile);
            urlToSave = await getDownloadURL(sRef);
        }
        const tagsArray = tags.split(",").map(t => t.trim()).filter(Boolean);
        let newId = modelId;
        if (modelId) {
            await updateModel(modelId, fileName, urlToSave, tagsArray);
        } else {
            newId = await createModel(fileName, urlToSave, tagsArray);
        }
        navigate(`/hidden/${newId}?edit=true`);
        toast.toast({ title: "Modèle enregistré" });
    };

    // Sauvegarde des POIs
    const handleSavePois = async () => {
        const poisObj = Object.fromEntries(
            pois.map(p => [p.id, { title: p.title, description: p.description, position: p.position }])
        );
        await updatePois(modelId, poisObj);
        navigate(`/hidden/${modelId}`);
        toast.toast({ title: "POIs enregistrés" });
    };

    // Si pas encore connecté
    if (!user) {
        return (
            <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Connexion</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full mb-3 p-2 border rounded-lg focus:ring focus:ring-blue-200"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full mb-4 p-2 border rounded-lg focus:ring focus:ring-blue-200"
                />
                <Button onClick={handleLogin} className="w-full">
                    Se connecter
                </Button>
                <Toaster />
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <Toaster />
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    {!modelId
                        ? "Créer / Charger un modèle"
                        : isEditMode
                            ? "Édition du modèle"
                            : "Visualisation du modèle"}
                </h1>
                <Button variant="outline" onClick={handleLogout}>
                    Déconnexion
                </Button>
            </div>

            {/* CHARGER EXISTANT */}
            {!modelId && (
                <div className="flex gap-4">
                    <select
                        value={selectedModelId}
                        onChange={e => setSelectedModelId(e.target.value)}
                        className="flex-1 p-2 border rounded-lg focus:ring focus:ring-blue-200"
                    >
                        <option value="">-- Charger existant --</option>
                        {modelsList.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
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

            {/* FORMULAIRE CREATION/EDITION */}
            {(!modelId || isEditMode) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="file"
                        accept=".glb"
                        onChange={handleFileChange}
                        className="col-span-1 p-2 border rounded-lg hover:shadow-md transition"
                    />
                    <input
                        type="text"
                        placeholder="Nom du modèle *"
                        value={fileName}
                        onChange={e => setFileName(e.target.value)}
                        className="p-2 border rounded-lg focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="text"
                        placeholder="Tags / catégorie"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        className="p-2 border rounded-lg focus:ring focus:ring-blue-200"
                    />
                    <Button onClick={handleSaveModel} className="md:col-span-3">
                        Enregistrer modèle
                    </Button>
                </div>
            )}

            {/* CANVAS 3D + CHAT */}
            {modelUrl && (
                <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ height: 500 }}>
                    <Canvas camera={{ position: [0, 1, 4], fov: 60 }}>
                        <ambientLight intensity={0.6} />
                        <pointLight position={[10, 10, 10]} intensity={0.8} />
                        <Suspense fallback={<Html center>Chargement…</Html>}>
                            <ModelViewer
                                url={modelUrl}
                                pois={pois}
                                editMode={isEditMode && isOwner}
                                onAddPoi={pos => {
                                    const id = Date.now().toString();
                                    setPois(ps => [...ps, { id, position: pos, title: "", description: "" }]);
                                    setSelectedPoi({ id, position: pos, title: "", description: "" });
                                }}
                                onSelectPoi={poi => {
                                    if (isEditMode && isOwner) {
                                        setSelectedPoi(poi);
                                    } else {
                                        setChatContext(poi.description);
                                    }
                                }}
                            />
                        </Suspense>
                        <OrbitControls autoRotate enablePan={false} />
                    </Canvas>

                    {/* Chat toujours visible */}
                    <ChatSidebar context={chatContext} />
                </div>
            )}

            {/* MODAL POI (édition) */}
            {selectedPoi && isEditMode && isOwner && (
                <PoiForm
                    poi={selectedPoi}
                    onCancel={() => setSelectedPoi(null)}
                    onSave={updated => {
                        setPois(ps => ps.map(p => (p.id === updated.id ? updated : p)));
                        setSelectedPoi(null);
                    }}
                />
            )}

            {/* LISTE & SAUVEGARDE POIs */}
            {isEditMode && isOwner && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Points d’intérêt</h2>
                    <ul className="space-y-2">
                        {pois.map(p => (
                            <li
                                key={p.id}
                                className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                            >
                                <span>{p.title || "[sans titre]"}</span>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => setSelectedPoi(p)}>
                                        Éditer
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => setPois(ps => ps.filter(x => x.id !== p.id))}>
                                        Supprimer
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Button onClick={handleSavePois} className="mt-4">
                        Terminer l’édition
                    </Button>
                </div>
            )}
        </div>
    );
}
