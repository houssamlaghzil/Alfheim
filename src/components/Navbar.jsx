import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
      <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm transition-all"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo et liens de navigation */}
            <div className="flex items-center space-x-8">
              <a href="/" className="text-2xl font-bold text-blue-600 tracking-wide">
                ALFHEIM
              </a>
              <div className="hidden md:flex space-x-6">
                <a
                    href="#about"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  En savoir plus
                </a>
                <a
                    href="#contact"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Se connecter
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>
  );
}

export default Navbar;
