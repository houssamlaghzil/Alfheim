/**
 * @file About.jsx
 * @description Page "En savoir plus" pour Alfheim AI.
 * Présente la mission, les valeurs et la technologie de la plateforme en combinant
 * un affichage en cartes dépliables (avec framer-motion) et l'ensemble des textes fournis.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
// Vous pouvez modifier ces imports d'images en fonction de vos assets.
import illustrationAI from "../../assets/img/IA Pedagogique.png";
import illustration3D from "../../assets/img/Image TP.png";
import illustrationanimation from "../../assets/img/Image TP acceuil.png";
import illustrationTP from "../../assets/img/Image TP.png";
import illustrationsuivi from "../../assets/img/Suivi des progrès.png";
import illustrationVR from "../../assets/img/Mode VR.png";
import vidéo3D from "../../assets/videos/Model 3D.mp4";
import vidéoAnimation from "../../assets/videos/Animation.mp4";

//
// Composant ExpandableCard
//
const ExpandableCard = ({ title, intro, children, image, video }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
        >
            {video ? (
                <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-48 object-cover rounded-xl mb-4"
                />
            ) : (
                image && (
                    <img
                        src={image}
                        alt="illustration"
                        className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                )
            )}
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{intro}</p>
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center text-blue-600 hover:underline mb-2"
            >
                {expanded ? "Réduire" : "En savoir plus"}{" "}
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 text-gray-700 dark:text-gray-300"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

//
// Page About combinant tous les éléments textuels de la version statique
//
const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                {/* En-tête et texte introductif */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-8"
                >
                    En savoir plus sur Alfheim AI
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg mb-12 text-center text-gray-700 dark:text-gray-300"
                >
                    Alfheim AI révolutionne l'apprentissage des sciences en rendant
                    visibles et interactifs des concepts longtemps restés abstraits. Grâce
                    à l'innovation technologique, nous offrons une nouvelle manière
                    d'apprendre : plus intuitive, plus engageante, plus personnelle.
                    Explorez, expérimentez, comprenez. À travers nos travaux pratiques
                    virtuels réalistes, chaque notion théorique devient une expérience
                    concrète. Que vous soyez étudiant, enseignant, établissement ou
                    simplement curieux, Alfheim AI ouvre les portes d'une science vivante,
                    accessible à tous, partout dans le monde.
                </motion.p>

                {/* Grille de cartes */}
                <div className="grid gap-8 md:grid-cols-2">
                    {/* 1. Notre Mission */}
                    <ExpandableCard
                        title="Notre Mission"
                        intro="Une science vivante et accessible grâce à la technologie."
                    >
                        <p>
                            Rendre l'apprentissage scientifique plus immersif, plus
                            personnalisé et plus accessible grâce aux technologies
                            interactives et collaboratives. Chez Alfheim AI nous croyons que
                            chaque étudiant mérite de voir, toucher et comprendre la science
                            de manière intuitive, quels que soient son niveau ou son
                            environnement.
                        </p>
                    </ExpandableCard>

                    {/* 2. Pourquoi ALFHEIM AI ? */}
                    <ExpandableCard
                        title="Pourquoi ALFHEIM AI ?"
                        intro="Nous répondons aux défis de l’enseignement scientifique."
                    >
                        <p className="mb-2">
                            Aujourd'hui, l'enseignement scientifique rencontre de nombreux
                            défis :
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>
                                Concepts abstraits difficiles à visualiser : molécules, processus
                                biochimiques complexes, structures invisibles à l'œil nu.
                            </li>
                            <li>
                                Inégalités d’accès aux ressources numériques avancées, freinant
                                l'équité pédagogique.
                            </li>
                            <li>
                                Travaux pratiques absents ou limités dans de nombreux établissements.
                            </li>
                            <li>
                                Manque de personnalisation pour accompagner chaque élève selon son
                                niveau et ses besoins.
                            </li>
                            <li>
                                Peu d'outils d'apprentissage autonome, limitant la progression
                                individuelle.
                            </li>
                            <li>
                                Approche souvent trop théorique, peu interactive et peu engageante
                                pour les nouvelles générations.
                            </li>
                        </ul>
                        <p className="mb-2">
                            ALFHEIM AI répond à ces enjeux en proposant une plateforme unifiée,
                            intelligente et accessible :
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>
                                ✅ Accès élargi via navigateur — compatible sur tous les supports
                                (ordinateurs, tablettes, smartphones).
                            </li>
                            <li>
                                ✅ IA pédagogique adaptative pour un accompagnement personnalisé et
                                évolutif.
                            </li>
                            <li>
                                ✅ Contenus scientifiques rigoureux, créés, validés et mis à jour en
                                collaboration avec des enseignants, chercheurs et laboratoires.
                            </li>
                            <li>
                                ✅ Multimodalité pédagogique : textes, modèles 3D interactifs, vidéos
                                explicatives, animations immersives.
                            </li>
                            <li>
                                ✅ Travaux pratiques virtuels réalistes, accessibles directement en
                                ligne.
                            </li>
                            <li>
                                ✅ Modules immersifs en réalité virtuelle (VR) pour plonger au cœur
                                des expériences scientifiques.
                            </li>
                            <li>
                                ✅ Intégration simplifiée dans les environnements éducatifs existants
                                (ENT, Moodle, SCORM).
                            </li>
                        </ul>
                        <p className="mb-2 font-semibold">Notre ambition va plus loin :</p>
                        <p className="mb-2">
                            Nous voulons rendre la science vivante, intuitive et accessible à
                            tous, aujourd'hui comme demain.
                        </p>
                        <p>
                            ALFHEIM AI est conçu pour accompagner l'évolution de l'enseignement
                            scientifique, en alliant rigueur académique, innovation technologique
                            et plaisir d'apprendre.
                        </p>
                    </ExpandableCard>

                    {/* 3. Modèles 3D interactifs */}
                    <ExpandableCard
                        title="Modèles 3D interactifs"
                        intro="Explorez la science en 3D comme jamais auparavant."
                        video={vidéo3D}
                    >
                        <p>
                            Visualisez, explorez et comprenez les structures et phénomènes
                            scientifiques complexes à travers des modèles 3D immersifs et
                            interactifs.
                        </p>
                    </ExpandableCard>

                    {/* 4. Animations dynamiques */}
                    <ExpandableCard
                        title="Animations dynamiques"
                        intro="Observez les processus scientifiques en mouvement."
                        video={vidéoAnimation}
                    >
                        <p>
                            Observez les processus scientifiques en action grâce à des
                            animations visuelles et interactives, pour une compréhension
                            intuitive en quelques secondes.
                        </p>
                    </ExpandableCard>

                    {/* 5. Travaux pratiques immersifs */}
                    <ExpandableCard
                        title="Travaux pratiques immersifs"
                        intro="Mettez en pratique vos connaissances avec une immersion totale."
                        image={illustrationTP}
                    >
                        <p>
                            Mettez en pratique vos connaissances en réalisant des expériences
                            scientifiques réalistes directement depuis votre navigateur.
                        </p>
                    </ExpandableCard>

                    {/* 6. IA pédagogique adaptative */}
                    <ExpandableCard
                        title="IA pédagogique adaptative"
                        intro="Une IA qui s'adapte à votre apprentissage."
                        image={illustrationAI}
                    >
                        <p>
                            Profitez d’une IA qui personnalise contenus, quiz et rappels selon
                            votre niveau. Dotée de recherche intelligente et d’analyse de
                            documents.
                        </p>
                    </ExpandableCard>

                    {/* 7. Suivi des progrès */}
                    <ExpandableCard
                        title="Suivi des progrès"
                        intro="Suivez votre évolution en temps réel."
                        image={illustrationsuivi}
                    >
                        <p>
                            Analysez et optimisez l'apprentissage : suivez l’évolution
                            individuelle ou collective, identifiez les notions à renforcer,
                            et adaptez les parcours pédagogiques en conséquence.
                        </p>
                    </ExpandableCard>

                    {/* 8. Mode VR */}
                    <ExpandableCard
                        title="Mode VR"
                        intro="Plongez en immersion totale en réalité virtuelle."
                        image={illustrationVR}
                    >
                        <p>
                            Plongez en immersion totale au cœur des modèles et des expériences.
                        </p>
                    </ExpandableCard>

                    {/* 9. Nos valeurs */}
                    <ExpandableCard title="Nos valeurs" intro="">
                        <p className="text-center mb-6 text-gray-700 dark:text-gray-300">
                            Chez ALFHEIM AI, au-delà de l'innovation technologique, ce sont nos
                            convictions profondes qui guident chacune de nos actions.
                            <br />
                            Nous croyons en une éducation scientifique plus équitable, plus
                            intuitive et plus engageante pour tous.
                        </p>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-center md:text-left text-gray-900 dark:text-gray-100">
                                    Accessibilité
                                </h3>
                                <p className="text-center md:text-left text-gray-700 dark:text-gray-300">
                                    La connaissance scientifique doit être un droit, pas un
                                    privilège. Nous concevons des outils ouverts, disponibles sur
                                    tous les supports, pour réduire les inégalités d'accès à
                                    l'apprentissage de qualité.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-center md:text-left text-gray-900 dark:text-gray-100">
                                    Pédagogie avant tout
                                </h3>
                                <p className="text-center md:text-left text-gray-700 dark:text-gray-300">
                                    La technologie n'est pas une fin en soi. Nous plaçons l'efficacité
                                    pédagogique au centre de notre développement, en travaillant en
                                    étroite collaboration avec des enseignants, chercheurs et experts.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-center md:text-left text-gray-900 dark:text-gray-100">
                                    Innovation responsable
                                </h3>
                                <p className="text-center md:text-left text-gray-700 dark:text-gray-300">
                                    Nous utilisons les technologies de pointe (3D, IA, VR) pour
                                    enrichir l'apprentissage, tout en garantissant une utilisation
                                    éthique, sécurisée et respectueuse de l'autonomie de l'élève.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-center md:text-left text-gray-900 dark:text-gray-100">
                                    Apprentissage actif
                                </h3>
                                <p className="text-center md:text-left text-gray-700 dark:text-gray-300">
                                    Comprendre, c'est vivre l'expérience. Nous encourageons
                                    l'expérimentation, l'interaction et l'exploration active, pour
                                    transformer chaque notion théorique en découverte personnelle.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-center md:text-left text-gray-900 dark:text-gray-100">
                                    Co-création
                                </h3>
                                <p className="text-center md:text-left text-gray-700 dark:text-gray-300">
                                    ALFHEIM AI est construit avec les acteurs de l'éducation, pas à
                                    leur place. Nous développons nos contenus et outils en partenariat
                                    avec des établissements, enseignants, chercheurs et laboratoires
                                    pour rester au plus proche des besoins réels.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-center md:text-left">
                                    Évolution continue
                                </h3>
                                <p className="text-center md:text-left">
                                    Le monde scientifique évolue chaque jour et nous aussi. Nos
                                    contenus sont régulièrement mis à jour, validés par nos partenaires
                                    académiques, et enrichis pour accompagner les avancées de la science
                                    et de la pédagogie.
                                </p>
                            </div>
                        </div>
                    </ExpandableCard>
                </div>
            </div>
        </div>
    );
};

export default About;
