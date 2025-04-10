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
                    En savoir plus sur Alfheim AI
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg mb-12 text-center"
                >
                    Alfheim AI révolutionne l'apprentissage des sciences en rendant visibles et interactifs des concepts longtemps restés abstraits.
                    Grâce à l'innovation technologique, nous offrons une nouvelle manière d'apprendre : plus intuitive, plus engageante, plus personnelle.
                    Explorez, expérimentez, comprenez.
                    À travers nos travaux pratiques virtuels réalistes, chaque notion théorique devient une expérience concrète.
                    Que vous soyez étudiant, enseignant, établissement ou simplement curieux, Alfheim AI ouvre les portes d'une science vivante, accessible à tous, partout dans le monde.
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
                        Rendre l'apprentissage scientifique plus immersif, plus personnalisé et plus accessible grâce aux technologies interactives et collaboratives.
                        Chez Alfheim AI nous croyons que chaque étudiant mérite de voir, toucher et comprendre la science de manière intuitive, quels que soient son niveau ou son environnement.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-100 rounded-lg p-6"
                    >
                        <h2 className="text-2xl font-semibold mb-2">Pourquoi ALFHEIM AI ?</h2>
                        <p className="text-gray-700 mb-4">
                            Aujourd'hui, l'enseignement scientifique rencontre de nombreux défis :
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-6">
                            <li>Concepts abstraits difficiles à visualiser : molécules, processus biochimiques complexes, structures invisibles à l'œil nu.</li>
                            <li>Inégalités d’accès aux ressources numériques avancées, freinant l'équité pédagogique.</li>
                            <li>Travaux pratiques absents ou limités dans de nombreux établissements.</li>
                            <li>Manque de personnalisation pour accompagner chaque élève selon son niveau et ses besoins.</li>
                            <li>Peu d'outils d'apprentissage autonome, limitant la progression individuelle.</li>
                            <li>Approche souvent trop théorique, peu interactive et peu engageante pour les nouvelles générations.</li>
                        </ul>
                        <p className="text-gray-700 mb-4">
                            ALFHEIM AI répond à ces enjeux en proposant une plateforme unifiée, intelligente et accessible :
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>✅ Accès élargi via navigateur — compatible sur tous les supports (ordinateurs, tablettes, smartphones).</li>
                            <li>✅ IA pédagogique adaptative pour un accompagnement personnalisé et évolutif.</li>
                            <li>✅ Contenus scientifiques rigoureux, créés, validés et mis à jour en collaboration avec des enseignants, chercheurs et laboratoires.</li>
                            <li>✅ Multimodalité pédagogique : textes, modèles 3D interactifs, vidéos explicatives, animations immersives.</li>
                            <li>✅ Travaux pratiques virtuels réalistes, accessibles directement en ligne.</li>
                            <li>✅ Modules immersifs en réalité virtuelle (VR) pour plonger au cœur des expériences scientifiques.</li>
                            <li>✅ Intégration simplifiée dans les environnements éducatifs existants (ENT, Moodle, SCORM).</li>
                        </ul>
                        <p className="text-gray-700 font-semibold mb-2">
                            Notre ambition va plus loin :
                        </p>

                        <p className="text-gray-700 mb-2">
                            Nous voulons rendre la science vivante, intuitive et accessible à tous, aujourd'hui comme demain.
                        </p>

                        <p className="text-gray-700 mb-6">
                            ALFHEIM AI est conçu pour accompagner l'évolution de l'enseignement scientifique, en alliant rigueur académique, innovation technologique et plaisir d'apprendre.
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
                        <h2 className="text-2xl font-semibold mb-2">Modèles 3D interactifs</h2>
                        <p className="text-gray-700">
                        Visualisez, explorez et comprenez les structures et phénomènes scientifiques complexes à travers des modèles 3D immersifs et interactifs.
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
                        <h2 className="text-2xl font-semibold mb-2">Animations dynamiques</h2>
                        <p className="text-gray-700">
                        Observez les processus scientifiques en action grâce à des animations visuelles et interactives, pour une compréhension intuitive en quelques secondes.
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
                        <h2 className="text-2xl font-semibold mb-2">Travaux pratiques immersifs</h2>
                        <p className="text-gray-700">
                        Mettez en pratique vos connaissances en réalisant des expériences scientifiques réalistes directement depuis votre navigateur.
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
                        <h2 className="text-2xl font-semibold mb-2">IA pédagogique adaptative</h2>
                        <p className="text-gray-700">
                        Profitez d’une IA qui personnalise contenus, quiz et rappels selon votre niveau. Dotée de recherche intelligente et d’analyse de documents
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
                        <h2 className="text-2xl font-semibold mb-2">Suivi des progrès</h2>
                        <p className="text-gray-700">
                        Analysez et optimisez l'apprentissage : suivez l’évolution individuelle ou collective, identifiez les notions à renforcer, et adaptez les parcours pédagogiques en conséquence.
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
                        <h2 className="text-2xl font-semibold mb-2">Mode VR</h2>
                        <p className="text-gray-700">
                        Plongez en immersion totale au cœur des modèles et des expériences.
                        </p>
                    </motion.div>
                    {/* Nos Valeurs Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-100 rounded-lg p-6 mt-12"
                    >
                        <h2 className="text-2xl font-semibold text-center mb-6">Nos valeurs</h2>

                        <p className="text-gray-700 text-center mb-10">
                            Chez ALFHEIM AI, au-delà de l'innovation technologique, ce sont nos convictions profondes qui guident chacune de nos actions.  
                            Nous croyons en une éducation scientifique plus équitable, plus intuitive et plus engageante pour tous.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Accessibilité */}
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-center md:text-left">Accessibilité</h3>
                                <p className="text-gray-700 text-center md:text-left">
                                    La connaissance scientifique doit être un droit, pas un privilège.  
                                    Nous concevons des outils ouverts, disponibles sur tous les supports, pour réduire les inégalités d'accès à l'apprentissage de qualité.
                                </p>
                            </div>

                            {/* Pédagogie avant tout */}
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-center md:text-left">Pédagogie avant tout</h3>
                                <p className="text-gray-700 text-center md:text-left">
                                    La technologie n'est pas une fin en soi.  
                                    Nous plaçons l'efficacité pédagogique au centre de notre développement, en travaillant en étroite collaboration avec des enseignants, chercheurs et experts.
                                </p>
                            </div>

                            {/* Innovation responsable */}
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-center md:text-left">Innovation responsable</h3>
                                <p className="text-gray-700 text-center md:text-left">
                                    Nous utilisons les technologies de pointe (3D, IA, VR) pour enrichir l'apprentissage,  
                                    tout en garantissant une utilisation éthique, sécurisée et respectueuse de l'autonomie de l'élève.
                                </p>
                            </div>

                            {/* Apprentissage actif */}
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-center md:text-left">Apprentissage actif</h3>
                                <p className="text-gray-700 text-center md:text-left">
                                    Comprendre, c'est vivre l'expérience.  
                                    Nous encourageons l'expérimentation, l'interaction et l'exploration active, pour transformer chaque notion théorique en découverte personnelle.
                                </p>
                            </div>

                            {/* Co-création */}
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-center md:text-left">Co-création</h3>
                                <p className="text-gray-700 text-center md:text-left">
                                    ALFHEIM AI est construit avec les acteurs de l'éducation, pas à leur place.  
                                    Nous développons nos contenus et outils en partenariat avec des établissements, enseignants, chercheurs et laboratoires pour rester au plus proche des besoins réels.
                                </p>
                            </div>

                            {/* Évolution continue */}
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-center md:text-left">Évolution continue</h3>
                                <p className="text-gray-700 text-center md:text-left">
                                    Le monde scientifique évolue chaque jour et nous aussi.  
                                    Nos contenus sont régulièrement mis à jour, validés par nos partenaires académiques, et enrichis pour accompagner les avancées de la science et de la pédagogie.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default About;
