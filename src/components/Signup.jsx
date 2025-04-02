// src/Signup.jsx
import React, { useState, useEffect } from "react";
import { ref, push, query, orderByChild, equalTo, get } from "firebase/database";
import { database } from "@/firebase";
import "@/assets/css/Signup.css";  // Importation du fichier CSS

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [institution, setInstitution] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Vérifie dès le chargement si l'utilisateur est déjà inscrit (via cookie)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Vérifie si l'email est déjà présent dans la base de données
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
            setMessage("Erreur lors de la vérification. Réessaye plus tard.");
            setLoading(false);
            return;
        }

        // Prépare l'objet d'inscription avec un timestamp
        const newSubscription = {
            name,
            email,
            role,
            institution,
            timestamp: Date.now(),
        };

        try {
            await push(ref(database, "newsletter_subscriptions"), newSubscription);
            setMessage("Inscription réussie !");
            setName("");
            setEmail("");
            setRole("");
            setInstitution("");

            // Enregistre dans les cookies que l'utilisateur est inscrit (valable 1 an)
            document.cookie = "subscribed=true; max-age=31536000; path=/";
            setIsSubscribed(true);
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            setMessage("Erreur lors de l'inscription. Réessaye plus tard.");
        }
        setLoading(false);
    };

    // Si l'utilisateur est déjà inscrit, affiche le logo de validation
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
            <h2 className="signup-title">Inscrivez-vous à notre Newsletter</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="signup-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="signup-input"
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="signup-select"
                >
                    <option value="" disabled>Je suis...</option>
                    <option value="eleve">Élève</option>
                    <option value="professeur">Professeur</option>
                    <option value="chercheur">Chercheur</option>
                    <option value="Investisseur">Investisseur</option>
                </select>
                <input
                    type="text"
                    placeholder="Établissement / Institution (optionnel)"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="signup-input"
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
