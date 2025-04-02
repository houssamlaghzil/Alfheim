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
                <h1 className="text-4xl font-bold text-center mb-4">Prendre contact</h1>
                <p className="text-center text-lg mb-8">
                    Pour plus d’informations, vous pouvez nous contacter à l’adresse suivante : <a href="mailto:contact@alfheim-ai.com" className="text-blue-600 underline">contact@alfheim-ai.com</a>
                </p>
                <Signup />
            </div>
        </div>
    );
};

export default Contact;
