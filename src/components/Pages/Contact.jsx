/**
 * @file Contact.jsx
 * @description Page de contact modernisée pour Alfheim IA.
 * Fond blanc épuré, capsules interactives avec coins légèrement arrondis par défaut
 * qui s'arrondissent davantage au survol, et un design responsive et professionnel.
 */

import React from "react";
import { motion } from "framer-motion";
import Signup from "@/components/Signup";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

// Variants pour l'animation au survol (coins s'arrondissant et légère mise à l'échelle)
const cardVariants = {
    hover: {
        scale: 1.03,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
        borderRadius: "1rem", // Coins plus arrondis au survol (~16px)
        transition: { duration: 0.3 },
    },
};

const Contact = () => {
    return (
        <div className="min-h-screen bg-background text-foreground py-16">
            <div className="container mx-auto px-4">
                {/* Titre animé */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-extrabold text-center mb-16 tracking-wide"
                >
                    Contactez-nous
                </motion.h1>

                {/* Capsules Contact & Partenariat */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Capsule Contact */}
                    <motion.div
                        className="bg-gray-50 dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors"
                        variants={cardVariants}
                        whileHover="hover"
                        initial={{ opacity: 0, x: -50, borderRadius: "0.5rem" }}  // coins ~8px
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Une question ou une demande ?</h2>
                        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                            Pour une démonstration, une idée à partager ou toute collaboration, notre équipe est disponible 24/7.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            Remplissez le formulaire ou contactez-nous directement par email.
                        </p>
                    </motion.div>

                    {/* Capsule Partenariat / Investissement */}
                    <motion.div
                        className="bg-gray-50 dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors"
                        variants={cardVariants}
                        whileHover="hover"
                        initial={{ opacity: 0, x: 50, borderRadius: "0.5rem" }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Partenariat / Investissement</h2>
                        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                            Soutenez la révolution de l'apprentissage scientifique en devenant partenaire ou investisseur.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            Contactez-nous directement par mail à :{" "}
                            <a
                                href="mailto:contact@alfheim-ai.com"
                                className="text-blue-500 hover:text-blue-600 transition-colors underline"
                            >
                                contact@alfheim-ai.com
                            </a>
                        </p>
                    </motion.div>
                </div>

                {/* Coordonnées et réseaux sociaux */}
                <motion.div
                    className="mt-16 bg-gray-50 dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 shadow-sm text-center transition-colors"
                    variants={cardVariants}
                    whileHover="hover"
                    initial={{ opacity: 0, y: 20, borderRadius: "0.5rem" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="text-2xl font-bold mb-4">Nos Coordonnées</h3>
                    <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">contact@alfheim-ai.com</p>
                    <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">b.araujo@alfheim-ai.com</p>
                    <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">+33 7 69 13 60 50</p>
                    {/* Icônes réseaux sociaux */}
                    <div className="flex justify-center space-x-6">
                        <a
                            href="#"
                            className="text-blue-500 hover:text-blue-600 text-2xl transition-colors"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="text-blue-500 hover:text-blue-600 text-2xl transition-colors"
                            aria-label="Twitter"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="text-blue-500 hover:text-blue-600 text-2xl transition-colors"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="#"
                            className="text-blue-500 hover:text-blue-600 text-2xl transition-colors"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </motion.div>

                {/* Formulaire d'inscription */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Signup />
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
