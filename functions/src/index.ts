// functions/src/index.ts

import { initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { onCall, HttpsError } from "firebase-functions/v2/https";

// Initialise l’Admin SDK
initializeApp();
const db = getDatabase();

/**
 * Vérifie que l'utilisateur est authentifié, renvoie son uid.
 * Lance HttpsError('unauthenticated') sinon.
 */
function requireAuth(auth: any): string {
    if (!auth || !auth.uid) {
        throw new HttpsError("unauthenticated", "L’utilisateur doit être connecté.");
    }
    return auth.uid;
}

/**
 * listModels: renvoie les modèles de l’utilisateur ou tous si admin.
 */
export const listModels = onCall({ region: "us-central1" }, async (req) => {
    const uid = requireAuth(req.auth);
    const auth = req.auth!; // assure non-null après requireAuth
    const snap = await db.ref("models").once("value");
    const all = snap.val() || {};
    const arr = Object.entries(all).map(([id, m]: any) => ({ id, ...m }));
    const isAdmin = auth.token?.admin === true;
    return isAdmin ? arr : arr.filter(m => m.userId === uid);
});

/**
 * createModel: crée un modèle (name, url, tags[])
 */
export const createModel = onCall({ region: "us-central1" }, async (req) => {
    const uid = requireAuth(req.auth);
    const { name, url, tags } = req.data as { name: string; url: string; tags?: string[] };
    if (typeof name !== "string" || typeof url !== "string") {
        throw new HttpsError("invalid-argument", "Les champs 'name' et 'url' sont requis.");
    }
    const now = Date.now();
    const ref = db.ref("models").push();
    await ref.set({
        name,
        url,
        tags: Array.isArray(tags) ? tags : [],
        userId: uid,
        createdAt: now,
        updatedAt: now,
        pois: {}
    });
    return { modelId: ref.key };
});

/**
 * updateModel: met à jour les métadonnées d’un modèle existant.
 */
export const updateModel = onCall({ region: "us-central1" }, async (req) => {
    const uid = requireAuth(req.auth);
    const auth = req.auth!;
    const { modelId, name, url, tags } = req.data as {
        modelId: string;
        name: string;
        url: string;
        tags?: string[];
    };
    if (!modelId || typeof name !== "string" || typeof url !== "string") {
        throw new HttpsError("invalid-argument", "Fields 'modelId', 'name' and 'url' are required.");
    }
    const snap = await db.ref(`models/${modelId}`).once("value");
    const m = snap.val();
    if (!m) throw new HttpsError("not-found", "Modèle introuvable.");
    const isAdmin = auth.token?.admin === true;
    if (m.userId !== uid && !isAdmin) {
        throw new HttpsError("permission-denied", "Accès refusé.");
    }
    await db.ref(`models/${modelId}`).update({
        name,
        url,
        tags: Array.isArray(tags) ? tags : [],
        updatedAt: Date.now()
    });
    return { success: true };
});

/**
 * updatePois: remplace tous les POIs d’un modèle.
 */
export const updatePois = onCall({ region: "us-central1" }, async (req) => {
    const uid = requireAuth(req.auth);
    const auth = req.auth!;
    const { modelId, pois } = req.data as {
        modelId: string;
        pois: Record<string, { title: string; description: string; position: { x: number; y: number; z: number } }>;
    };
    if (!modelId || typeof pois !== "object") {
        throw new HttpsError("invalid-argument", "Fields 'modelId' and 'pois' are required.");
    }
    const snap = await db.ref(`models/${modelId}`).once("value");
    const m = snap.val();
    if (!m) throw new HttpsError("not-found", "Modèle introuvable.");
    const isAdmin = auth.token?.admin === true;
    if (m.userId !== uid && !isAdmin) {
        throw new HttpsError("permission-denied", "Accès refusé.");
    }
    await db.ref(`models/${modelId}/pois`).set(pois);
    await db.ref(`models/${modelId}`).update({ updatedAt: Date.now() });
    return { success: true };
});

/**
 * getModel: récupère un modèle entier (métadonnées + POIs).
 */
export const getModel = onCall({ region: "us-central1" }, async (req) => {
    const uid = requireAuth(req.auth);
    const auth = req.auth!;
    const { modelId } = req.data as { modelId: string };
    if (!modelId) {
        throw new HttpsError("invalid-argument", "Le champ 'modelId' est requis.");
    }
    const snap = await db.ref(`models/${modelId}`).once("value");
    const m = snap.val();
    if (!m) throw new HttpsError("not-found", "Modèle introuvable.");
    const isAdmin = auth.token?.admin === true;
    if (m.userId !== uid && !isAdmin) {
        throw new HttpsError("permission-denied", "Accès refusé.");
    }
    return m;
});
