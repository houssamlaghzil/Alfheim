import React from 'react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Étudiants',
    price: '9€ / mois',
    features: ['Accès illimité aux simulations', 'Stockage cloud de projets', 'Support communautaire']
  },
  {
    name: 'Université',
    price: '99€ / mois',
    features: ['Tous les avantages Étudiants', 'Tableau de bord analytique', 'Intégrations LMS', 'Support prioritaire']
  },
  {
    name: 'Campus+ ',
    price: 'Contactez-nous',
    features: ['Fonctionnalités sur mesure', 'Déploiement dédié', 'Accompagnement premium']
  }
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container mx-auto space-y-12 px-6">
        <h1 className="text-5xl font-bold text-center mb-12">Nos formules</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className="p-6 rounded-xl bg-card shadow-sm flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 text-center">{plan.name}</h3>
              <p className="text-center text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="flex-1 space-y-2 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="text-muted-foreground">• {f}</li>
                ))}
              </ul>
              <Button className="w-full">Choisir</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
