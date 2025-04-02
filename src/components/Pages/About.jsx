// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';

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
                    En savoir plus sur Alfheim
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg mb-12 text-center"
                >
                    Découvrez notre approche innovante et scientifique pour transformer l'apprentissage grâce à des technologies de pointe.
                </motion.p>
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-100 rounded-lg p-6"
                    >
                        <div className="h-48 bg-gray-300 rounded mb-4 flex items-center justify-center">
                            <span className="text-gray-700">Image Placeholder</span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Notre Mission</h2>
                        <p className="text-gray-700">
                            Nous redéfinissons l'apprentissage en combinant technologie immersive, intelligence artificielle et pédagogie moderne pour offrir une expérience éducative unique.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-100 rounded-lg p-6"
                    >
                        <div className="h-48 bg-gray-300 rounded mb-4 flex items-center justify-center">
                            <span className="text-gray-700">Image Placeholder</span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Nos Valeurs</h2>
                        <p className="text-gray-700">
                            L'excellence, l'innovation et la collaboration sont au cœur de notre démarche scientifique pour garantir un contenu rigoureux et actualisé.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-100 rounded-lg p-6"
                    >
                        <div className="h-48 bg-gray-300 rounded mb-4 flex items-center justify-center">
                            <span className="text-gray-700">Image Placeholder</span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Technologie de Pointe</h2>
                        <p className="text-gray-700">
                            Nos outils innovants, incluant des modèles 3D interactifs et une IA adaptative, repoussent les limites de l'apprentissage traditionnel.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-100 rounded-lg p-6"
                    >
                        <div className="h-48 bg-gray-300 rounded mb-4 flex items-center justify-center">
                            <span className="text-gray-700">Image Placeholder</span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Engagement Scientifique</h2>
                        <p className="text-gray-700">
                            En partenariat avec des experts et institutions académiques, nous veillons à offrir un contenu précis, actuel et pertinent.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
