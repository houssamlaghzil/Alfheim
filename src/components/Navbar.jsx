/**
 * @file Navbar.jsx
 * @description Barre de navigation principale pour Alfheim IA.
 * Affiche un header complet sur grand écran et un burger menu sur mobile.
 * Un bouton "Démo" est ajouté pour rediriger vers la page des démonstrations.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/theme";
import logo from "../assets/logo/ALFHEIM AI SANS FOND.png";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    // Animation pour l'ouverture/fermeture du menu mobile
    const menuVariants = {
        closed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
        open: { height: "auto", opacity: 1, transition: { duration: 0.3 } }
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="sticky top-0 z-50 bg-gradient-to-br from-white/70 to-white/90 dark:from-gray-800/80 dark:to-gray-700/90 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-700"
        >
            <div className="container mx-auto px-6 py-2 flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                    <Link
                        to="/"
                        className="flex items-center transition-transform hover:scale-105"
                    >
                        {/* Logo responsive avec marges ajustables */}
                        <img
                            src={logo}
                            alt="Logo Alfheim IA"
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                        />
                    </Link>
                </div>
                <div className="hidden md:flex space-x-8 items-center">
                    <Link
                        to="/about"
                        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                        En savoir plus
                    </Link>
                    <Link
                        to="/contact"
                        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                        Contact
                    </Link>
                    <Link to="/demo">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-sm">
                            Essayer
                        </Button>
                    </Link>
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 8h16M4 16h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700"
                    >
                        <div className="px-6 py-4 flex flex-col space-y-4">
                            <Link
                                to="/about"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                            >
                                En savoir plus
                            </Link>
                            <Link
                                to="/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                            >
                                Contact
                            </Link>
                            <Link
                                to="/demo"
                                onClick={() => setIsMenuOpen(false)}
                                className="self-start"
                            >
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-sm">
                                    Essayer
                                </Button>
                            </Link>
                            <button
                                onClick={() => {
                                    toggleTheme();
                                    setIsMenuOpen(false);
                                }}
                                aria-label="Toggle theme"
                                className="self-start text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
