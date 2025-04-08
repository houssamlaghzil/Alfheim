/**
 * @file DemoSelection.jsx
 * @description Page de sélection des démonstrations de technologie.
 * Propose le choix entre Demo 1 : Interaction, Demo 2 : Information dans l'espace et Demo 3 : Conception réalité.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const DemoSelection = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-8">Choisissez votre démonstration</h1>
            <div className="flex flex-col gap-4 w-full max-w-md">
                <Link to="/demo/information">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Demo 1 : Information dans l'espace
                    </Button>
                </Link>
                <Link to="/demo/conception">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Demo 2 : Conception réalité
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default DemoSelection
