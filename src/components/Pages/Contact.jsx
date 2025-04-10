/**
 * @file Contact.jsx
 * @description Page de contact pour Alfheim IA.
 * Affiche le formulaire d'inscription complet et une ligne de contact.
 */

import React from "react";
import Signup from "@/components/Signup";

const Contact = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-10">Contactez-nous</h1>

                <div className="max-w-3xl mx-auto space-y-10">

                    {/* Partie 1 : Contact classique */}
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-semibold">Une question, une demande de démonstration, ou envie de collaborer avec nous ?</h2>
                        <p className="text-gray-700">
                            Notre équipe est à votre écoute !
                        </p>
                    </div>

                    {/* Partie 2 : Devenir partenaire ou investisseur */}
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-semibold">Devenir partenaire ou investisseur</h2>
                        <p className="text-gray-700">
                            Envie de soutenir la révolution de l'apprentissage scientifique ?
                        </p>
                        <p className="text-gray-700">
                            Contactez-nous directement à l'adresse suivante :
                            <br />
                            <a href="mailto:contact@alfheim-ai.com" className="text-blue-600 underline">contact@alfheim-ai.com</a>
                        </p>
                    </div>

                    {/* Coordonnées */}
                    <div className="text-center space-y-2">
                        <p className="text-gray-700">Nos coordonnées :</p>
                        <p className="text-gray-700">contact@alfheim-ai.com</p>
                        <p className="text-gray-700">b.araujo@alfheim-ai.com</p>
                        <p className="text-gray-700">+33 7 69 13 60 50</p>
                        <p className="text-gray-700">Nos réseaux sociaux (avec logo)</p>
                    </div>

                </div>

                {/* Formulaire d'inscription */}
                <div className="mt-16">
                    <Signup />
                </div>
            </div>
        </div>
    );
};

export default Contact;
