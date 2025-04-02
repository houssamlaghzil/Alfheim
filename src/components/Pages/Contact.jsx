/**
 * @file Contact.jsx
 * @description Page de contact pour Alfheim IA.
 * Affiche le formulaire d'inscription complet pour prendre contact.
 */

import React from "react";
import Signup from "@/components/Signup";

const Contact = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Prendre contact</h1>
                <Signup />
            </div>
        </div>
    );
};

export default Contact;
