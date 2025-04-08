/**
 * @file About.jsx
 * @description Page "En savoir plus" pour Alfheim IA.
 * Présente la mission, les valeurs et la technologie de la plateforme dans un style épuré et scientifique.
 */

import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 py-10">
            <div className="container mx-auto px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-8"
                >
                    En savoir plus sur Alfheim IA
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg mb-12 text-center"
                >
                    Alfheim AI incarne une vision moderne de l’éducation scientifique : immersive, intelligente, accessible.
                    Nous unissons technologie et pédagogie pour réinventer l’apprentissage.
                </motion.p>
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-100 rounded-lg p-6"
                    >
                        <div className="h-48 bg-gray-300 rounded mb-4 flex items-center justify-center">
                            <span className="text-gray-700">Image Illustrative</span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Notre Mission</h2>
                        <p className="text-gray-700">
                            Alfheim AI incarne une vision moderne de l’éducation scientifique : immersive, intelligente, accessible.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-100 rounded-lg p-6"
                    >
                        <div className="h-48 bg-gray-300 rounded mb-4 flex items-center justify-center">
                            <span className="text-gray-700">Image Illustrative</span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Nos Valeurs</h2>
                        <p className="text-gray-700">
                            Nous unissons technologie et pédagogie pour offrir une approche innovante de l’apprentissage scientifique.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
