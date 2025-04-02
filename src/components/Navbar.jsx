/**
 * @file Navbar.jsx
 * @description Barre de navigation principale pour Alfheim IA.
 * Affiche un header complet sur grand écran et un burger menu sur mobile.
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm transition-all"
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 tracking-wide">
              ALFHEIM
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              En savoir plus
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
              Se connecter
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              S'inscrire
            </Button>
          </div>
          <div className="md:hidden">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                  </svg>
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
            <div className="md:hidden bg-white/90 backdrop-blur-sm border-t border-gray-200">
              <div className="px-4 py-2 flex flex-col space-y-2">
                <Link
                    to="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  En savoir plus
                </Link>
                <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
                <Button
                    variant="ghost"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:text-blue-600"
                >
                  Se connecter
                </Button>
                <Button onClick={() => setIsMenuOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  S'inscrire
                </Button>
              </div>
            </div>
        )}
      </motion.nav>
  );
};

export default Navbar;
