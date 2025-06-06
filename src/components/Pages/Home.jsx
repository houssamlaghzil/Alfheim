/**
 * @file Home.jsx
 * @description Page d'accueil de l'application Alfheim IA.
 * Affiche un modèle 3D interactif dont la taille s'adapte dynamiquement à la fenêtre.
 * Le contrôle 3D se fait via OrbitControls, uniformément sur mobile et PC.
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Hero3D from "@/components/Hero3D";
import Signup from "@/components/Signup";
import { Link } from "react-router-dom";
import { Box, Users, BarChart2, DollarSign } from "lucide-react";

// Import de l'image de background pour l'effet parallaxe
import parallaxBG from "../../assets/img/Arrière-plan.png";

const Home = () => {
    const { toast } = useToast();
    const [canvasHeight, setCanvasHeight] = useState(500);

    // Écoute et ajustement lors du redimensionnement
    useEffect(() => {
        const handleResize = () => {
            // On définit la hauteur du Canvas en fonction de la hauteur de la fenêtre.
            const newHeight = window.innerWidth < 768 ? window.innerHeight * 0.5 : window.innerHeight * 0.75;
            setCanvasHeight(newHeight);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Ajustement de la caméra en fonction de la plateforme (valeurs identiques pour mobile et PC ici)
    const cameraProps = { position: [0, 0, 5], fov: 75 };

    const handleGetStarted = () => {
        toast({
            title: "Bienvenue chez Alfheim !",
            description: "Nous vous contacterons bientôt pour démarrer votre expérience immersive.",
        });
    };

    return (
        <main>
            <div className="container grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)] py-20 bg-gradient-to-b from-background to-muted">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <h1 className="text-5xl font-bold leading-tight gradient-text">La science à portée de clic</h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300">
                        Alfheim IA réinvente l'enseignement scientifique avec une approche 100% numérique, mêlant modèles 3D et expériences collaboratives accessibles partout.
                    </p>
                    <div className="space-x-4">
                        <Link to="/demo">
                            <Button
                                onClick={handleGetStarted}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
                            >
                                Démarrer la démo
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button
                                variant="outline"
                                className="border-blue-600 text-blue-600 hover:bg-blue-600/10 px-8 py-3 rounded-lg text-lg"
                            >
                                En savoir plus
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="relative canvas-container"
                    style={{ height: canvasHeight }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Canvas camera={cameraProps} style={{ width: "100%", height: "100%" }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Hero3D />
                        <OrbitControls enableZoom={false} autoRotate />
                    </Canvas>
                </motion.div>
            </div>

            {/* Section Aperçu des fonctionnalités avec fond en parallaxe */}
            <section
                className="relative py-20 bg-fixed bg-center bg-cover"
                style={{ backgroundImage: `url(${parallaxBG})` }}
            >
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-8"
                    >
                        <h2 className="text-4xl font-bold">Fonctionnalités clés</h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur text-center space-y-3">
                                <Box className="mx-auto w-8 h-8" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">3D & VR</h3>
                                <p className="text-gray-700 dark:text-gray-300">Visualisez les phénomènes les plus complexes en réalité virtuelle.</p>
                            </div>
                            <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur text-center space-y-3">
                                <Users className="mx-auto w-8 h-8" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Collaboratif</h3>
                                <p className="text-gray-700 dark:text-gray-300">Travaillez à plusieurs en temps réel sur des expériences partagées.</p>
                            </div>
                            <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur text-center space-y-3">
                                <BarChart2 className="mx-auto w-8 h-8" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Analytics</h3>
                                <p className="text-gray-700 dark:text-gray-300">Suivez la progression de vos étudiants et identifiez leurs besoins.</p>
                            </div>
                            <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur text-center space-y-3">
                                <DollarSign className="mx-auto w-8 h-8" />
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tarifs Campus</h3>
                                <p className="text-gray-700 dark:text-gray-300">Des formules flexibles et abordables pour toutes les universités.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section Nos avantages avec fond en parallaxe */}
            <section
                className="relative py-20 bg-fixed bg-center bg-cover"
                style={{ backgroundImage: `url(${parallaxBG})` }}
            >
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-8"
                    >
                        <h2 className="text-4xl font-bold">Pourquoi choisir Alfheim&nbsp;IA&nbsp;?</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Immersion totale</h3>
                                <p className="text-gray-700 dark:text-gray-300">Chaque cours devient une expérience pratique et visuelle.</p>
                            </div>
                            <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Pédagogie sur mesure</h3>
                                <p className="text-gray-700 dark:text-gray-300">Notre IA adapte les contenus au niveau de chaque étudiant.</p>
                            </div>
                            <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Savoir validé</h3>
                                <p className="text-gray-700 dark:text-gray-300">Les ressources sont élaborées avec des chercheurs pour garantir leur exactitude.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 text-center">
                <h2 className="text-4xl font-bold mb-6">Rejoignez la bêta dès maintenant</h2>
                <Signup />
            </section>
            <Toaster />
        </main>
    );
};

export default Home;
