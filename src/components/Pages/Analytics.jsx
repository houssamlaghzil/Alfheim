import React from 'react';

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8 space-y-6">
      <h1 className="text-4xl font-bold">Tableau de bord analytique</h1>
      <p className="max-w-xl text-center">Cette section présentera prochainement des statistiques détaillées sur l'utilisation des laboratoires 3D et la progression des étudiants.</p>
      <div className="w-full h-64 rounded-lg bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">Graphiques en préparation...</span>
      </div>
    </div>
  );
}
