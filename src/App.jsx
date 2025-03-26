import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Hero3D from "@/components/Hero3D";
import Navbar from "@/components/Navbar";
import ScrollVideoSection from "@/components/ScrollVideoSection.jsx";

function App() {
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "Bienvenue chez Alfheim !",
      description: "Nous vous contacterons bientôt pour commencer votre voyage d'apprentissage.",
    });
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
        <Navbar />

        <main className="">
          <div className="container grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
            >
              <h1 className="text-5xl font-bold leading-tight">
                Découvrez une nouvelle façon d'apprendre les sciences
              </h1>
              <p className="text-xl text-gray-700">
                Transformer et simplifier l’apprentissage des sciences à travers une plateforme immersive,
                interactive et personnalisée grâce à des modèles 3D, animations et une intelligence
                artificielle adaptative.
              </p>
              <div className="space-x-4">
                <Button
                    onClick={handleGetStarted}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
                >
                  Commencer maintenant
                </Button>
                <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600/10 px-8 py-3 rounded-lg text-lg"
                >
                  En savoir plus
                </Button>
              </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="h-[600px] relative"
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Hero3D />
                <OrbitControls enableZoom={false} autoRotate />
              </Canvas>
            </motion.div>
          </div>

          <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-8"
            >
              <h2 className="text-4xl font-bold">Nos avantages</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 rounded-xl bg-white/80 backdrop-blur">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Apprentissage immersif</h3>
                  <p className="text-gray-700">
                    Plongez dans un univers 3D interactif pour mieux comprendre les concepts scientifiques.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-white/80 backdrop-blur">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">IA adaptative</h3>
                  <p className="text-gray-700">
                    Un parcours personnalisé qui s'adapte à votre rythme et votre style d'apprentissage.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-white/80 backdrop-blur">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Contenu de qualité</h3>
                  <p className="text-gray-700">
                    Des ressources pédagogiques créées par des experts et constamment mises à jour.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Section vidéo contrôlée par le scroll */}
          <ScrollVideoSection />
        </main>

        <Toaster />
      </div>
  );
}

export default App;
