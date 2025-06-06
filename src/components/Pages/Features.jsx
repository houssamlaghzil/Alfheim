import React from 'react'
import { Rocket, Wifi, Users, Tv, Package } from 'lucide-react'

const features = [
  {
    icon: <Rocket size={32} />,
    title: 'Labs 3D immersifs',
    desc: 'Manipulez des expériences scientifiques en réalité virtuelle directement depuis votre navigateur.'
  },
  {
    icon: <Wifi size={32} />,
    title: 'Accès global',
    desc: 'Notre portail fonctionne même avec des connexions limitées grâce au mode hors ligne progressif.'
  },
  {
    icon: <Users size={32} />,
    title: 'Collaboration en temps réel',
    desc: 'Invitez vos camarades de classe dans des sessions partagées pour travailler ensemble sur les mêmes simulations.'
  },
  {
    icon: <Tv size={32} />,
    title: 'Tableau de bord analytique',
    desc: 'Suivez la progression de vos étudiants et mesurez l\'engagement grâce à des graphiques détaillés.'
  },
  {
    icon: <Package size={32} />,
    title: 'Intégrations LMS',
    desc: 'Connectez Alfheim IA à Moodle ou Blackboard pour une expérience transparente.'
  }
]

export default function Features() {
  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container mx-auto space-y-12 px-6">
        <h1 className="text-5xl font-bold text-center mb-12">Fonctionnalités premium</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((f, i) => (
        <div key={i} className="p-6 rounded-xl bg-card shadow-sm space-y-4 text-center">
          <div className="flex justify-center text-primary">{f.icon}</div>
          <h3 className="text-2xl font-semibold">{f.title}</h3>
          <p className="text-muted-foreground">{f.desc}</p>
        </div>
      ))}
      </div>
      <div className="text-center pt-12 space-x-4">
        <a href="/labs/vr" className="underline text-primary">Essayer la VR</a>
        <a href="/labs/collab" className="underline text-primary">Mode collaboratif</a>
        <a href="/analytics" className="underline text-primary">Voir l'analytics</a>
      </div>
    </div>
  </div>
)
}
