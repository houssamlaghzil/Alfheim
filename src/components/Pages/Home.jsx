/**
 * @file Home.jsx
 * @description Page d'accueil de l'application Alfheim IA.
 * Affiche un modèle 3D interactif dont la taille s'adapte dynamiquement à la fenêtre.
 * Le contrôle 3D se fait via OrbitControls, uniformément sur mobile et PC.
 */

import React, {useState, useEffect} from 'react';
import {motion} from "framer-motion";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {Toaster} from "@/components/ui/toaster";
import Hero3D from "@/components/Hero3D";
import Signup from "@/components/Signup";
import { Link } from "react-router-dom";


const Home = () => {
    const {toast} = useToast();
    const [canvasHeight, setCanvasHeight] = useState(500);

    // Écoute et ajustement lors du redimensionnement
    useEffect(() => {
        const handleResize = () => {
            // On définit la hauteur du Canvas en fonction de la hauteur de la fenêtre.
            const newHeight = window.innerWidth < 768 ? window.innerHeight * 0.5 : window.innerHeight * 0.75;
            setCanvasHeight(newHeight);
            console.log("[Resize] new canvasHeight:", newHeight);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Ajustement de la caméra en fonction de la plateforme (valeurs identiques pour mobile et PC ici)
    const cameraProps = {position: [0, 0, 5], fov: 75};

    const handleGetStarted = () => {
        toast({
            title: "Bienvenue chez Alfheim !",
            description: "Nous vous contacterons bientôt pour démarrer votre expérience immersive.",
        });
    };

    return (
        <main>
            <div className="container grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
                <motion.div
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.8}}
                    className="space-y-6"
                >
                    <h1 className="text-5xl font-bold leading-tight">
                        Alfheim
                    </h1>
                    <p className="text-xl text-gray-700">
                        Transformez et simplifiez l’apprentissage des sciences grâce à une plateforme immersive,
                        interactive et personnalisée, pensée pour les établissements, étudiants et passionnés.
                    </p>
                    <div className="space-x-4">
                        <Link to="/demo">
                            <Button
                                onClick={handleGetStarted}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
                            >

                                Commencer maintenant
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
                    style={{height: canvasHeight}}
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.8}}
                >
                    <Canvas camera={cameraProps} style={{width: "100%", height: "100%"}}>
                        <ambientLight intensity={0.5}/>
                        <pointLight position={[10, 10, 10]}/>
                        <Hero3D/>
                        <OrbitControls enableZoom={false} autoRotate/>
                    </Canvas>
                </motion.div>
            </div>

            <section className="py-20">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="text-center space-y-8"
                >
                    <h2 className="text-4xl font-bold">Nos avantages</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-xl bg-white/80 backdrop-blur">
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Apprentissage immersif</h3>
                            <p className="text-gray-700">
                                Plongez dans un univers 3D interactif pour une compréhension concrète des concepts
                                scientifiques.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-white/80 backdrop-blur">
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">IA adaptative</h3>
                            <p className="text-gray-700">
                                Un accompagnement personnalisé qui s'ajuste à vos besoins et à votre rythme
                                d'apprentissage.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-white/80 backdrop-blur">
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Contenu de qualité</h3>
                            <p className="text-gray-700">
                                Des ressources scientifiques rigoureuses, mises à jour en continu, pour un apprentissage
                                approfondi.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>
            <Signup/>
            <Toaster/>
        </main>
    );
};

export default Home;
