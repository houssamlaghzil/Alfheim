/**
 * @file App.jsx
 * @description Point d'entrée principal de l'application.
 * Configure le routeur pour naviguer entre Home, About, Contact et les pages de démonstration.
 */

import React, { useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/components/Pages/Home.jsx';
import About from '@/components/Pages/About.jsx';
import Contact from '@/components/Pages/Contact.jsx';
import DemoSelection from "@/components/Pages/DemoSelection.jsx";
import { DemoConception } from "@/components/Pages/demos/DemoConception.jsx";
import { DemoInformation } from "@/components/Pages/demos/DemoInformation.jsx";
import { AnimatePresence, motion } from 'framer-motion';

function App() {
    const location = useLocation();

    // Liste de variantes d'animation possibles
    const animationVariantsList = [
        // Variante 1 : Transition par glissement horizontal avec rotation légère
        {
            initial: { opacity: 0, x: "-100vw", rotate: -10 },
            animate: { opacity: 1, x: 0, rotate: 0 },
            exit: { opacity: 0, x: "100vw", rotate: 10 },
            transition: { duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] }
        },
        // Variante 2 : Apparition par glissement vertical combiné à un léger effet de scale
        {
            initial: { opacity: 0, y: "100vh", scale: 0.8 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: "-50vh", scale: 1.1 },
            transition: { duration: 0.8, ease: "easeInOut" }
        },
        // Variante 3 : Révélation en douceur avec clipPath (animation de type "circular reveal")
        {
            initial: { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
            animate: { clipPath: "circle(150% at 50% 50%)", opacity: 1 },
            exit: { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
            transition: { duration: 0.8, ease: "easeInOut" }
        },
        // Variante 4 : Animation de flip 3D sur l'axe Y
        {
            initial: { opacity: 0, rotateY: 90 },
            animate: { opacity: 1, rotateY: 0 },
            exit: { opacity: 0, rotateY: -90 },
            transition: { duration: 0.6, ease: "easeInOut" }
        },
        // Variante 5 : Fondu avec légère augmentation de scale (effet "pop" moderne)
        {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 1.05 },
            transition: { duration: 0.7, ease: "easeInOut" }
        },
        // Variante 6 : Entrée avec effet ressort (spring) pour un mouvement dynamique
        {
            initial: { opacity: 0, y: -200 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 200 },
            transition: { type: "spring", stiffness: 120, damping: 20 }
        }
    ];



    // À chaque changement de location, une variante aléatoire est sélectionnée
    const randomVariant = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * animationVariantsList.length);
        return animationVariantsList[randomIndex];
    }, [location]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
            <Navbar />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <motion.div
                                initial={randomVariant.initial}
                                animate={randomVariant.animate}
                                exit={randomVariant.exit}
                                transition={{ duration: 0.5 }}
                            >
                                <Home />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <motion.div
                                initial={randomVariant.initial}
                                animate={randomVariant.animate}
                                exit={randomVariant.exit}
                                transition={{ duration: 0.5 }}
                            >
                                <About />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <motion.div
                                initial={randomVariant.initial}
                                animate={randomVariant.animate}
                                exit={randomVariant.exit}
                                transition={{ duration: 0.5 }}
                            >
                                <Contact />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/demo"
                        element={
                            <motion.div
                                initial={randomVariant.initial}
                                animate={randomVariant.animate}
                                exit={randomVariant.exit}
                                transition={{ duration: 0.5 }}
                            >
                                <DemoSelection />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/demo/information"
                        element={
                            <motion.div
                                initial={randomVariant.initial}
                                animate={randomVariant.animate}
                                exit={randomVariant.exit}
                                transition={{ duration: 0.5 }}
                            >
                                <DemoInformation />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/demo/conception"
                        element={
                            <motion.div
                                initial={randomVariant.initial}
                                animate={randomVariant.animate}
                                exit={randomVariant.exit}
                                transition={{ duration: 0.5 }}
                            >
                                <DemoConception />
                            </motion.div>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
