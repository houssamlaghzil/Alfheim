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
import Features from '@/components/Pages/Features.jsx';
import Pricing from '@/components/Pages/Pricing.jsx';
import DemoSelection from "@/components/Pages/DemoSelection.jsx";
import { DemoConception } from "@/components/Pages/demos/DemoConception.jsx";
import { DemoInformation } from "@/components/Pages/demos/DemoInformation.jsx";
import LabXR from '@/components/Pages/labs/LabXR.jsx';
import CollabLab from '@/components/Pages/labs/CollabLab.jsx';
import Analytics from '@/components/Pages/Analytics.jsx';

function App() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/demo" element={<DemoSelection />} />
                <Route path="/demo/information" element={<DemoInformation />} />
                <Route path="/demo/conception" element={<DemoConception />} />
                <Route path="/labs/vr" element={<LabXR />} />
                <Route path="/labs/collab" element={<CollabLab />} />
                <Route path="/analytics" element={<Analytics />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
