/**
 * @file App.jsx
 * @description Point d'entrée principal de l'application.
 * Configure le routeur pour naviguer entre Home, About, Contact et les pages de démonstration.
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer.jsx';
import Home from '@/components/Pages/Home.jsx';
import About from '@/components/Pages/About.jsx';
import Contact from '@/components/Pages/Contact.jsx';
import DemoSelection from "@/components/Pages/DemoSelection.jsx";
import { DemoConception } from "@/components/Pages/demos/DemoConception.jsx";
import { DemoInformation } from "@/components/Pages/demos/DemoInformation.jsx";

function App() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/demo" element={<DemoSelection />} />
                <Route path="/demo/information" element={<DemoInformation />} />
                <Route path="/demo/conception" element={<DemoConception />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
