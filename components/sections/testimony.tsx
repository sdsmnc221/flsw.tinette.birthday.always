"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import CenteredCarousel from "@/components/centered-carousel"
import SimpleTextReveal from "@/components/simple-text-reveal"

export default function Testimony() {
  const journalRef = useRef<HTMLDivElement>(null)
  const scenariosRef = useRef<HTMLUListElement>(null)
  const afterScenariosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Journal page turn effect
    if (journalRef.current) {
      gsap.from(journalRef.current, {
        rotationY: -30,
        opacity: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: journalRef.current,
          start: "top 70%",
        },
      })
    }

    // Scenarios appear one by one
    if (scenariosRef.current && afterScenariosRef.current) {
      const scenarios = scenariosRef.current.querySelectorAll("li")

      // D'abord, cacher le contenu qui doit apparaître après les scénarios
      gsap.set(afterScenariosRef.current, { opacity: 0, y: 20 })

      // Animer chaque scénario un par un
      scenarios.forEach((scenario, index) => {
        gsap.from(scenario, {
          x: -50,
          opacity: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: scenario,
            start: "top 90%",
          },
          delay: index * 0.2,
        })
      })

      // Animer le contenu après les scénarios, mais seulement une fois que tous les scénarios sont affichés
      // Calculer le délai total basé sur le nombre de scénarios
      const totalScenariosDelay = scenarios.length * 0.2 + 0.5 // 0.2s par scénario + 0.5s pour la dernière animation

      gsap.to(afterScenariosRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: scenariosRef.current,
          start: "top 70%",
        },
        delay: totalScenariosDelay,
      })
    }
  }, [])

  const carouselImages = [
    { src: "/images/ce-que-vit-1.png", alt: "Ce que vit une personne à la recherche de son chat - Illustration" },
    { src: "/images/ce-que-vit-2.jpeg", alt: "Ce que vit une personne à la recherche de son chat - Deuil impossible" },
    { src: "/images/ce-que-vit-3.png", alt: "Ce que vit une personne à la recherche de son chat - Scénarios imaginés" },
    { src: "/images/ce-que-vit-4.jpeg", alt: "Ce que vit une personne à la recherche de son chat - Incompréhension" },
    { src: "/images/ce-que-vit-5.jpeg", alt: "Ce que vit une personne à la recherche de son chat - Annonces" },
    { src: "/images/ce-que-vit-6.png", alt: "Ce que vit une personne à la recherche de son chat - Vétérinaires" },
    { src: "/images/ce-que-vit-7.png", alt: "Ce que vit une personne à la recherche de son chat - Collage" },
  ]

  return (
    <section id="testimony" className="section bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white fade-in text-balance">
          Ce que vit une personne à la recherche de sa chatte
        </h2>

        {/* Carousel similaire à celui de la section "Pas d'Preuve, Pas d'Adieu" */}
        <CenteredCarousel images={carouselImages} accentColor="#b4293c" />

        <div className="space-y-6 mt-12 text-balance">
          <SimpleTextReveal>
            <div className="mb-8">
              <p className="text-left md:text-center mb-4">
                Je dois toujours me répéter car les gens ne lisent pas, et comprennent en disant qu'il faut faire telle
                chose, qu'on trouve ceci et cela et que tout ce qui se disait était fait (et bien plus encore).
              </p>
              <p className="text-left md:text-center mb-4">
                Je me rends compte que beaucoup de vétérinaires ne vérifient pas si la chatte est pucée à la première
                visite car ils ne veulent pas perdre de temps.
              </p>
              <p className="text-left md:text-center mb-4">
                Je vois beaucoup d'annonces qui donnent de l'espoir : "chatte retrouvée après 5 mois", "chat retrouvé
                après 9 ans", etc.
              </p>
            </div>
            <p className="text-[#b4293c] font-semibold text-left md:text-center">
              Je vois énormément d'annonces de chats et chiens perdus (plus de 100 par jour). Je vois énormément
              d'annonces d'animaux en détresse, en fin de vie et à la rue dans un très mauvais état. Je vois beaucoup
              d'annonces de chats écrasés. Je vois énormément d'annonces d'animaux abandonnés dans des conditions
              horribles.
            </p>
          </SimpleTextReveal>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-[#b4293c] text-center">Je m'imagine plein de scénarios :</h3>
            <div className="bg-gray-800 border border-[#ff3131] rounded-xl p-6 shadow-md mb-6 scenarios-container mx-auto">
              <ul ref={scenariosRef} className="list-disc pl-6 space-y-2 text-balance">
                <li className="text-left">Ma chatte s'est fait manger par un renard</li>
                <li className="text-left">Elle s'est fait écraser et les gens l'ont mise à la poubelle</li>
                <li className="text-left">Elle s'est fait voler pour être mangée ou pour sa fourrure</li>
                <li className="text-left">Elle s'est fait prendre dans un piège à renard et a fini morte</li>
                <li className="text-left">Elle est morte affamée et déshydratée dans une maison car enfermée</li>
                <li className="text-left">
                  Elle est chez une personne qui pense qu'elle a été abandonnée ou errante car ils ne connaissent pas
                  les puces électroniques
                </li>
                <li className="text-left">
                  Elle est montée dans une voiture, est partie des km et est sortie de la voiture en courant donc ne
                  peut être rattrapée par le conducteur
                </li>
              </ul>
            </div>
          </div>

          {/* Contenu qui doit apparaître après les scénarios */}
          <div ref={afterScenariosRef} className="mt-8 text-balance">
            <p className="text-left md:text-center">
              J'ai perdu une partie de mon entourage car ils ne comprennent pas ma situation, ce que je ressens.
              J'entends les gens me dire d'arrêter de chercher car elle est certainement morte. J'entends les gens dire
              qu'elle a dû partir pour aller mourir dans son coin. J'entends les gens dire qu'elle a dû partir car elle
              n'était pas bien chez moi.
            </p>
            <p className="mt-4 text-left md:text-center">
              La vie est en pause car seul le chat disparu est dans l'esprit de la personne. Ne peut dire au revoir, et
              ne peut faire son deuil, vis donc toutes les étapes du deuil en même temps sans fin.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
