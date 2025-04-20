// src/api/models.js
import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase";

/**
 * Récupère la liste des modèles via la Cloud Function `listModels`.
 */
export async function listModels() {
    console.log("[API] ▶ listModels()");
    try {
        const fn = httpsCallable(functions, "listModels");
        const res = await fn();  // pas de payload, le SDK ajoute l'ID token
        console.log("[API] ✔️ listModels response:", res.data);
        return res.data;
    } catch (e) {
        console.error("[API] ❌ listModels error:", e);
        throw e;
    }
}

/**
 * Crée un nouveau modèle via la Cloud Function `createModel`.
 */
export async function createModel(name, url, tags) {
    console.log("[API] ▶ createModel()", { name, url, tags });
    try {
        const fn = httpsCallable(functions, "createModel");
        const res = await fn({ name, url, tags });
        console.log("[API] ✔️ createModel response:", res.data);
        return res.data.modelId;
    } catch (e) {
        console.error("[API] ❌ createModel error:", e);
        throw e;
    }
}

/**
 * Met à jour un modèle existant via la Cloud Function `updateModel`.
 */
export async function updateModel(modelId, name, url, tags) {
    console.log("[API] ▶ updateModel()", { modelId, name, url, tags });
    try {
        const fn = httpsCallable(functions, "updateModel");
        await fn({ modelId, name, url, tags });
        console.log("[API] ✔️ updateModel success");
    } catch (e) {
        console.error("[API] ❌ updateModel error:", e);
        throw e;
    }
}

/**
 * Met à jour les POIs d’un modèle via la Cloud Function `updatePois`.
 */
export async function updatePois(modelId, pois) {
    console.log("[API] ▶ updatePois()", { modelId, pois });
    try {
        const fn = httpsCallable(functions, "updatePois");
        await fn({ modelId, pois });
        console.log("[API] ✔️ updatePois success");
    } catch (e) {
        console.error("[API] ❌ updatePois error:", e);
        throw e;
    }
}

/**
 * Récupère les données complètes d’un modèle via la Cloud Function `getModel`.
 */
export async function getModel(modelId) {
    console.log("[API] ▶ getModel()", modelId);
    try {
        const fn = httpsCallable(functions, "getModel");
        const res = await fn({ modelId });
        console.log("[API] ✔️ getModel response:", res.data);
        return res.data;
    } catch (e) {
        console.error("[API] ❌ getModel error:", e);
        throw e;
    }
}
