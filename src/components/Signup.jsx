/**
 * @file Signup.jsx
 * @description Composant d'inscription complet pour Alfheim IA.
 *
 * Améliorations apportées :
 * 1. Design modernisé et épuré : utilisation de classes Tailwind pour un espacement suffisant,
 *    des bordures et des états focus/hover améliorés pour une meilleure lisibilité.
 * 2. Expérience utilisateur optimisée :
 *      - Un feedback immédiat avec messages d'erreur ou de succès.
 *      - Des animations et transitions fluides pour renforcer l'interaction.
 * 3. Validation logique : le champ "Niveau d’études actuel" est requis et activé uniquement
 *    si le statut choisi est "Étudiant(e)" afin d'éviter des réponses incohérentes.
 *
 * Les questions et réponses restent exactement identiques, tout en proposant une interface plus
 * professionnelle et optimisée pour le mobile.
 */

import React, { useState, useEffect } from "react";
import { ref, push, query, orderByChild, equalTo, get } from "firebase/database";
import { database } from "@/firebase";
import "@/assets/css/Signup.css"; // Assurez-vous que ce fichier CSS ne contredit pas les styles Tailwind

const Signup = () => {
    // États pour chaque champ du formulaire
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName]   = useState("");
    const [email, setEmail]         = useState("");
    const [institution, setInstitution] = useState("");
    const [studyField, setStudyField]   = useState("");
    const [status, setStatus] = useState("");
    const [motivations, setMotivations] = useState([]);
    const [otherMotivation, setOtherMotivation] = useState(""); // Champ pour "Autre" dans motivations
    const [recontact, setRecontact]     = useState("");
    const [currentLevel, setCurrentLevel] = useState("");
    const [resources, setResources] = useState([]);
    const [suggestions, setSuggestions] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Vérification via les cookies si l'utilisateur est déjà inscrit
    useEffect(() => {
        const cookies = document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {});
        if (cookies.subscribed === "true") {
            setIsSubscribed(true);
        }
    }, []);

    // Gestion du changement pour les cases à cocher des motivations
    const handleMotivationChange = (motivation) => {
        setMotivations(prev =>
            prev.includes(motivation)
                ? prev.filter(item => item !== motivation)
                : [...prev, motivation]
        );
    };

    // Gestion du changement pour les cases à cocher des ressources
    const handleResourceChange = (resource) => {
        setResources(prev =>
            prev.includes(resource)
                ? prev.filter(item => item !== resource)
                : [...prev, resource]
        );
    };

    // Validation logique : si le statut n'est pas "Étudiant(e)", on désactive et vide le champ "Niveau d’études actuel"
    useEffect(() => {
        if (status !== "Étudiant(e)") {
            setCurrentLevel("");
        }
    }, [status]);

    // Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation logique : le "Niveau d’études" est requis seulement si le statut est étudiant
        if (status === "Étudiant(e)" && !currentLevel) {
            setMessage("Veuillez sélectionner votre niveau d’études.");
            setLoading(false);
            return;
        }

        // Vérification en temps réel si l'email est déjà inscrit dans Firebase
        const subscriptionsRef = ref(database, "newsletter_subscriptions");
        const q = query(subscriptionsRef, orderByChild("email"), equalTo(email));
        try {
            const snapshot = await get(q);
            if (snapshot.exists()) {
                setMessage("Cet email est déjà inscrit.");
                setLoading(false);
                return;
            }
        } catch (err) {
            console.error("Erreur lors de la vérification de l'email :", err);
            setMessage("Erreur lors de la vérification. Réessayez plus tard.");
            setLoading(false);
            return;
        }

        const newSubscription = {
            firstName,
            lastName,
            email,
            institution,
            studyField,
            status,
            motivations,
            otherMotivation,
            recontact,
            currentLevel,
            resources,
            suggestions,
            timestamp: Date.now(),
        };

        try {
            await push(ref(database, "newsletter_subscriptions"), newSubscription);
            setMessage("Inscription réussie !");
            // Réinitialisation des champs après inscription réussie
            setFirstName("");
            setLastName("");
            setEmail("");
            setInstitution("");
            setStudyField("");
            setStatus("");
            setMotivations([]);
            setOtherMotivation("");
            setRecontact("");
            setCurrentLevel("");
            setResources([]);
            setSuggestions("");
            document.cookie = "subscribed=true; max-age=31536000; path=/";
            setIsSubscribed(true);
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            setMessage("Erreur lors de l'inscription. Réessayez plus tard.");
        }
        setLoading(false);
    };

    // Si l'utilisateur est déjà inscrit, afficher le message de validation
    if (isSubscribed) {
        return (
            <div className="validation-logo flex flex-col items-center justify-center py-8">
                <svg viewBox="0 0 24 24" className="w-16 h-16 text-green-500 mb-4">
                    <path d="M9 16.17l-3.88-3.88a1 1 0 0 0-1.41 1.41l4.59 4.59a1 1 0 0 0 1.41 0l10-10a1 1 0 0 0-1.41-1.41L9 16.17z"/>
                </svg>
                <p className="text-xl font-semibold">Vous êtes déjà inscrit !</p>
            </div>
        );
    }

    return (
        <div className="signup-container max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
            <h2 className="signup-title text-3xl font-bold text-center mb-6">
                Inscrivez-vous pour tester Alfheim IA
            </h2>
            <form onSubmit={handleSubmit} className="signup-form space-y-4">
                {/* Champ Prénom */}
                <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* Champ Nom */}
                <input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* Champ Email */}
                <input
                    type="email"
                    placeholder="Adresse Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* Champ Établissement */}
                <input
                    type="text"
                    placeholder="Établissement ou Organisation"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* Champ Domaine d’études ou d’activité */}
                <input
                    type="text"
                    placeholder="Domaine d’études ou d’activité"
                    value={studyField}
                    onChange={(e) => setStudyField(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* Sélecteur Statut */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="" disabled>
                        Statut
                    </option>
                    <option value="Étudiant(e)">Étudiant(e)</option>
                    <option value="Enseignant(e)">Enseignant(e)</option>
                    <option value="Chercheur(euse)">Chercheur(euse)</option>
                    <option value="Passionné(e)/Curieux(se)">
                        Passionné(e) / Curieux(se)
                    </option>
                    <option value="Autre">Autre</option>
                </select>
                {/* Groupes de cases à cocher pour la Motivation */}
                <div className="signup-checkbox-group space-y-2">
                    <p className="signup-label font-semibold">
                        Pourquoi souhaitez-vous tester Alfheim IA ?
                    </p>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Innovation pédagogique"
                            checked={motivations.includes("Innovation pédagogique")}
                            onChange={() => handleMotivationChange("Innovation pédagogique")}
                            className="mr-2"
                        />
                        <span>Découvrir une nouvelle approche pédagogique</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Besoin d'accompagnement"
                            checked={motivations.includes("Besoin d'accompagnement")}
                            onChange={() => handleMotivationChange("Besoin d'accompagnement")}
                            className="mr-2"
                        />
                        <span>Améliorer mon accompagnement dans mes cours/recherches</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Curiosité"
                            checked={motivations.includes("Curiosité")}
                            onChange={() => handleMotivationChange("Curiosité")}
                            className="mr-2"
                        />
                        <span>Être curieux(se) et explorer de nouvelles technologies</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Autre"
                            checked={motivations.includes("Autre")}
                            onChange={() => handleMotivationChange("Autre")}
                            className="mr-2"
                        />
                        <span>Autre</span>
                    </label>
                    {/* Champ de texte conditionnel pour "Autre" */}
                    {motivations.includes("Autre") && (
                        <input
                            type="text"
                            placeholder="Veuillez préciser"
                            value={otherMotivation}
                            onChange={(e) => setOtherMotivation(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
                        />
                    )}
                </div>
                {/* Groupe de boutons radio pour le Recontact */}
                <div className="signup-radio-group space-y-2">
                    <p className="signup-label font-semibold">
                        Souhaitez-vous être recontacté(e) ultérieurement ?
                    </p>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="recontact"
                            value="oui"
                            checked={recontact === "oui"}
                            onChange={(e) => setRecontact(e.target.value)}
                            required
                            className="mr-2"
                        />
                        <span>Oui</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="recontact"
                            value="non"
                            checked={recontact === "non"}
                            onChange={(e) => setRecontact(e.target.value)}
                            className="mr-2"
                        />
                        <span>Non</span>
                    </label>
                </div>
                {/* Sélecteur de Niveau d’études (uniquement requis pour les Étudiant(e)) */}
                <select
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                    required={status === "Étudiant(e)"}
                    disabled={status !== "Étudiant(e)"}
                    className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        status !== "Étudiant(e)" ? "bg-gray-100 dark:bg-gray-700/50" : ""
                    }`}
                >
                    <option value="" disabled>
                        Niveau d’études actuel
                    </option>
                    <option value="Lycée">Lycée</option>
                    <option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                    <option value="Classe Préparatoire">Classe Préparatoire</option>
                    <option value="Master">Master</option>
                    <option value="Doctorat">Doctorat</option>
                    <option value="Autre">Autre</option>
                </select>
                {/* Groupes de cases à cocher pour le type de Ressource */}
                <div className="signup-checkbox-group space-y-2">
                    <p className="signup-label font-semibold">
                        Quel type de ressource vous intéresse le plus ?
                    </p>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Modèles 3D interactifs"
                            checked={resources.includes("Modèles 3D interactifs")}
                            onChange={() => handleResourceChange("Modèles 3D interactifs")}
                            className="mr-2"
                        />
                        <span>Modèles 3D interactifs</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Animations pédagogiques"
                            checked={resources.includes("Animations pédagogiques")}
                            onChange={() => handleResourceChange("Animations pédagogiques")}
                            className="mr-2"
                        />
                        <span>Animations pédagogiques</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="IA pour répondre à mes questions"
                            checked={resources.includes("IA pour répondre à mes questions")}
                            onChange={() => handleResourceChange("IA pour répondre à mes questions")}
                            className="mr-2"
                        />
                        <span>IA pour répondre à mes questions</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Ressources textuelles ou théoriques"
                            checked={resources.includes("Ressources textuelles ou théoriques")}
                            onChange={() => handleResourceChange("Ressources textuelles ou théoriques")}
                            className="mr-2"
                        />
                        <span>Ressources textuelles ou théoriques</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Travaux pratiques virtuels"
                            checked={resources.includes("Travaux pratiques virtuels")}
                            onChange={() => handleResourceChange("Travaux pratiques virtuels")}
                            className="mr-2"
                        />
                        <span>Travaux pratiques virtuels</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Autre"
                            checked={resources.includes("Autre")}
                            onChange={() => handleResourceChange("Autre")}
                            className="mr-2"
                        />
                        <span>Autre</span>
                    </label>
                </div>
                {/* Champ Suggestions */}
                <textarea
                    placeholder="Avez-vous une suggestion ou une attente spécifique vis-à-vis d’Alfheim IA ?"
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="4"
                />
                {/* Bouton de soumission */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                >
                    {loading ? "Inscription en cours..." : "S'inscrire"}
                </button>
            </form>
            {/* Affichage du message (succès ou erreur) */}
            {message && <p className="signup-message text-center mt-4">{message}</p>}
        </div>
    );
};

export default Signup;
