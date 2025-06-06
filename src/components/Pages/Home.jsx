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
            <div className="container grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)] py-20 bg-gradient-to-br from-purple-600/10 via-background to-background">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <h1 className="text-6xl font-extrabold leading-tight">Alfheim&nbsp;IA</h1>
                    <p className="text-2xl text-muted-foreground">La plateforme scientifique tout-en-un pour vos cours et vos recherches.</p>
                    <div className="space-x-4">
                        <Link to="/pricing">
                            <Button onClick={handleGetStarted} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg">
                                Découvrir les offres
                            </Button>
                        </Link>
                        <Link to="/features">
                            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600/10 px-8 py-3 rounded-lg text-lg">
                                Fonctionnalités
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

            {/* Aperçu rapide des fonctionnalités */}
            <section className="py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl font-bold">Quelques points forts</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-xl bg-card shadow-sm space-y-3">
                            <Box className="mx-auto w-8 h-8" />
                            <h3 className="text-xl font-semibold">3D & VR</h3>
                            <p className="text-muted-foreground">Des expériences immersives et interactives.</p>
                        </div>
                        <div className="p-6 rounded-xl bg-card shadow-sm space-y-3">
                            <Users className="mx-auto w-8 h-8" />
                            <h3 className="text-xl font-semibold">Collaboration</h3>
                            <p className="text-muted-foreground">Travaillez ensemble en direct.</p>
                        </div>
                        <div className="p-6 rounded-xl bg-card shadow-sm space-y-3">
                            <BarChart2 className="mx-auto w-8 h-8" />
                            <h3 className="text-xl font-semibold">Analytics</h3>
                            <p className="text-muted-foreground">Suivi complet des performances.</p>
                        </div>
                    </div>
                    <Link to="/features">
                        <Button className="mt-4">Voir toutes les fonctionnalités</Button>
                    </Link>
                </motion.div>
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
