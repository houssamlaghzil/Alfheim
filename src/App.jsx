/**
 * @file App.jsx
 * @description Point d'entrée principal de l'application.
 * Configure le routeur pour naviguer entre Home, About et Contact.
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/components/Pages/Home.jsx';
import About from '@/components/Pages/About.jsx';
import Contact from '@/components/Pages/Contact.jsx';

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
}

export default App;
