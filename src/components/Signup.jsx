/**
 * @file Signup.jsx
 * @description Composant d'inscription complet pour Alfheim IA.
 * Recueille de nombreuses informations et vérifie en temps réel si l'email est déjà enregistré dans Firebase.
 */

import React, { useState, useEffect } from "react";
import { ref, push, query, orderByChild, equalTo, get } from "firebase/database";
import { database } from "@/firebase";
import "@/assets/css/Signup.css";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName]   = useState("");
    const [email, setEmail]         = useState("");
    const [institution, setInstitution] = useState("");
    const [studyField, setStudyField]   = useState("");
    const [status, setStatus] = useState("");
    const [motivations, setMotivations] = useState([]);
    const [otherMotivation, setOtherMotivation] = useState(""); // Champ pour "Autre"
    const [recontact, setRecontact]     = useState("");
    const [currentLevel, setCurrentLevel] = useState("");
    const [resources, setResources] = useState([]);
    const [suggestions, setSuggestions] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

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

    const handleMotivationChange = (motivation) => {
        setMotivations(prev =>
            prev.includes(motivation) ? prev.filter(item => item !== motivation) : [...prev, motivation]
        );
    };

    const handleResourceChange = (resource) => {
        setResources(prev =>
            prev.includes(resource) ? prev.filter(item => item !== resource) : [...prev, resource]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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

    if (isSubscribed) {
        return (
            <div className="validation-logo">
                <svg viewBox="0 0 24 24">
                    <path d="M9 16.17l-3.88-3.88a1 1 0 0 0-1.41 1.41l4.59 4.59a1 1 0 0 0 1.41 0l10-10a1 1 0 0 0-1.41-1.41L9 16.17z"/>
                </svg>
                <p>Vous êtes déjà inscrit !</p>
            </div>
        );
    }

    return (
        <div className="signup-container">
            <h2 className="signup-title">Inscrivez-vous pour tester Alfheim IA</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="signup-input"
                />
                <input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="signup-input"
                />
                <input
                    type="email"
                    placeholder="Adresse Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="signup-input"
                />
                <input
                    type="text"
                    placeholder="Établissement ou Organisation"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="signup-input"
                />
                <input
                    type="text"
                    placeholder="Domaine d’études ou d’activité"
                    value={studyField}
                    onChange={(e) => setStudyField(e.target.value)}
                    className="signup-input"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    className="signup-select"
                >
                    <option value="" disabled>Statut</option>
                    <option value="Étudiant(e)">Étudiant(e)</option>
                    <option value="Enseignant(e)">Enseignant(e)</option>
                    <option value="Chercheur(euse)">Chercheur(euse)</option>
                    <option value="Passionné(e)/Curieux(se)">Passionné(e) / Curieux(se)</option>
                    <option value="Autre">Autre</option>
                </select>
                <div className="signup-checkbox-group">
                    <p className="signup-label">Pourquoi souhaitez-vous tester Alfheim IA ?</p>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="checkbox"
                            value="Innovation pédagogique"
                            checked={motivations.includes("Innovation pédagogique")}
                            onChange={() => handleMotivationChange("Innovation pédagogique")}
                        />
                        <span style={{ marginLeft: '0.5em' }}>Découvrir une nouvelle approche pédagogique</span>
                    </label>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="checkbox"
                            value="Besoin d'accompagnement"
                            checked={motivations.includes("Besoin d'accompagnement")}
                            onChange={() => handleMotivationChange("Besoin d'accompagnement")}
                        />
                        <span style={{ marginLeft: '0.5em' }}>Améliorer mon accompagnement dans mes cours/recherches</span>
                    </label>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="checkbox"
                            value="Curiosité"
                            checked={motivations.includes("Curiosité")}
                            onChange={() => handleMotivationChange("Curiosité")}
                        />
                        <span style={{ marginLeft: '0.5em' }}>Être curieux(se) et explorer de nouvelles technologies</span>
                    </label>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="checkbox"
                            value="Autre"
                            checked={motivations.includes("Autre")}
                            onChange={() => handleMotivationChange("Autre")}
                        />
                        <span style={{ marginLeft: '0.5em' }}>Autre</span>
                    </label>
                    {motivations.includes("Autre") && (
                        <input
                            type="text"
                            placeholder="Veuillez préciser"
                            value={otherMotivation}
                            onChange={(e) => setOtherMotivation(e.target.value)}
                            className="signup-input"
                            style={{ marginTop: '0.5em' }}
                        />
                    )}
                </div>
                <div className="signup-radio-group">
                    <p className="signup-label">Souhaitez-vous être recontacté(e) ultérieurement ?</p>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="radio"
                            name="recontact"
                            value="oui"
                            checked={recontact === "oui"}
                            onChange={(e) => setRecontact(e.target.value)}
                            required
                        />
                        <span style={{ marginLeft: '0.5em' }}>Oui</span>
                    </label>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="radio"
                            name="recontact"
                            value="non"
                            checked={recontact === "non"}
                            onChange={(e) => setRecontact(e.target.value)}
                        />
                        <span style={{ marginLeft: '0.5em' }}>Non</span>
                    </label>
                </div>
                <select
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                    required
                    className="signup-select"
                >
                    <option value="" disabled>Niveau d’études actuel</option>
                    <option value="Lycée">Lycée</option>
                    <option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                    <option value="Classe Préparatoire">Classe Préparatoire</option>
                    <option value="Master">Master</option>
                    <option value="Doctorat">Doctorat</option>
                    <option value="Autre">Autre</option>
                </select>
                <div className="signup-checkbox-group">
                    <p className="signup-label">Quel type de ressource vous intéresse le plus ?</p>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="checkbox"
                            value="Modèles 3D interactifs"
                            checked={resources.includes("Modèles 3D interactifs")}
                            onChange={() => handleResourceChange("Modèles 3D interactifs")}
                        />
                        <span style={{ marginLeft: '0.5em' }}>Modèles 3D interactifs</span>
                    </label>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="checkbox"
                            value="Animations pédagogiques"
                            checked={resources.includes("Animations pédagogiques")}
                            onChange={() => handleResourceChange("Animations pédagogiques")}
                        />
                        <span style={{ marginLeft: '0.5em' }}>Animations pédagogiques</span>
                    </label>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="checkbox"
                            value="IA pour répondre à mes questions"
                            checked={resources.includes("IA pour répondre à mes questions")}
                            onChange={() => handleResourceChange("IA pour répondre à mes questions")}
                        />
                        <span style={{ marginLeft: '0.5em' }}>IA pour répondre à mes questions</span>
                    </label>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="checkbox"
                            value="Ressources textuelles ou théoriques"
                            checked={resources.includes("Ressources textuelles ou théoriques")}
                            onChange={() => handleResourceChange("Ressources textuelles ou théoriques")}
                        />
                        <span style={{ marginLeft: '0.5em' }}>Ressources textuelles ou théoriques</span>
                    </label>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="checkbox"
                            value="Travaux pratiques virtuels"
                            checked={resources.includes("Travaux pratiques virtuels")}
                            onChange={() => handleResourceChange("Travaux pratiques virtuels")}
                        />
                        <span style={{ marginLeft: '0.5em' }}>Travaux pratiques virtuels</span>
                    </label>
                    <label style={{ marginBottom: '0.5em' }}>
                        <input
                            type="checkbox"
                            value="Autre"
                            checked={resources.includes("Autre")}
                            onChange={() => handleResourceChange("Autre")}
                        />
                        <span style={{ marginLeft: '0.5em' }}>Autre</span>
                    </label>
                </div>
                <textarea
                    placeholder="Avez-vous une suggestion ou une attente spécifique vis-à-vis d’Alfheim IA ?"
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    className="signup-textarea"
                    rows="4"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="signup-button"
                >
                    {loading ? "Inscription en cours..." : "S'inscrire"}
                </button>
            </form>
            {message && <p className="signup-message">{message}</p>}
        </div>
    );
};

export default Signup;
