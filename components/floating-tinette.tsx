"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMobile } from "@/hooks/use-mobile"

export default function FloatingTinette() {
  const tinetteRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    // Ne pas exécuter l'animation sur mobile
    if (typeof window === "undefined" || !tinetteRef.current || isMobile) return

    // Enregistrer le plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Nettoyer les animations existantes
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.id?.includes("tinette")) {
        trigger.kill()
      }
    })

    // Définir l'état initial - visible dès le chargement, centrée sur le titre
    gsap.set(tinetteRef.current, {
      opacity: 1,
      scale: 1.5, // Plus grande au début
      x: "50vw", // Centrée horizontalement
      y: "40vh", // Alignée avec le titre
      rotation: 0,
      zIndex: 100,
    })

    // Créer une timeline pour l'animation de Tinette
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        // markers: true, // Décommenter pour le débogage
      },
    })

    // 1. Position initiale - Introduction (centrée sur le titre)
    tl.to(
      tinetteRef.current,
      {
        x: "50vw", // Centrée horizontalement
        y: "40vh", // Alignée avec le titre
        scale: 1.5, // Plus grande
        rotation: 0,
        opacity: 1,
        zIndex: 100,
        duration: 0.1,
      },
      0,
    )

    // 2. Réduction de taille lors du scroll
    tl.to(
      tinetteRef.current,
      {
        scale: 0.8, // Réduction de taille
        duration: 0.2,
      },
      0.1,
    )

    // 3. Position à la section Story (à gauche du bloc texte)
    tl.to(
      tinetteRef.current,
      {
        x: "25vw", // À gauche du bloc texte
        y: "60vh",
        rotation: -5,
        opacity: 1,
        zIndex: 100,
        duration: 0.1,
      },
      0.2,
    )

    // 4. Disparition temporaire
    tl.to(
      tinetteRef.current,
      {
        opacity: 0,
        duration: 0.05,
      },
      0.3,
    )

    // 5. Réapparition à Philosophy (à côté du mot "espoir", ferré à droite)
    tl.to(
      tinetteRef.current,
      {
        x: "90vw", // Complètement à droite, à côté de "espoir"
        y: "18vh", // Aligné avec "il n'y a pas d'adieu. Je garde espoir"
        rotation: 5,
        opacity: 1,
        zIndex: 100,
        duration: 0.05,
      },
      0.35,
    )

    // 6. Disparition temporaire
    tl.to(
      tinetteRef.current,
      {
        opacity: 0,
        duration: 0.05,
      },
      0.4,
    )

    // 7. Disparition complète pendant la section Initiatives
    tl.to(
      tinetteRef.current,
      {
        opacity: 0,
        duration: 0.2,
      },
      0.45,
    )

    // 8. Réapparition centrée entre "Ces initiatives..." et "Commémoration - 18 ans"
    tl.to(
      tinetteRef.current,
      {
        x: "50vw", // Centrée horizontalement
        y: "50vh", // Centrée verticalement
        rotation: 0,
        opacity: 1,
        zIndex: 100,
        scale: 1,
        duration: 0.1,
      },
      0.7, // Position plus tardive dans le scroll pour apparaître entre les deux sections
    )

    // Ajouter un léger effet de flottement
    gsap.to(tinetteRef.current, {
      y: "+=10",
      rotation: "+=2",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Créer des déclencheurs spécifiques pour les sections

    // Déclencheur pour la section Philosophy
    ScrollTrigger.create({
      trigger: "#philosophy",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.to(tinetteRef.current, {
          x: "90vw", // Ferré à droite
          y: "18vh", // Aligné avec "il n'y a pas d'adieu. Je garde espoir"
          opacity: 1,
          duration: 0.5,
        })
      },
      onLeaveBack: () => {
        gsap.to(tinetteRef.current, {
          x: "25vw", // Retour à la position précédente
          y: "60vh",
          opacity: 1,
          duration: 0.5,
        })
      },
    })

    // Déclencheur pour la section Initiatives (cacher Tinette)
    ScrollTrigger.create({
      trigger: "#initiatives",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.to(tinetteRef.current, {
          opacity: 0,
          duration: 0.5,
        })
      },
      onLeaveBack: () => {
        gsap.to(tinetteRef.current, {
          opacity: 1,
          duration: 0.5,
        })
      },
    })

    // Déclencheur pour l'espace entre Initiatives et Commémoration
    ScrollTrigger.create({
      trigger: "#commemoration",
      start: "top-=200 center",
      end: "top center",
      onEnter: () => {
        gsap.to(tinetteRef.current, {
          x: "50vw", // Centrée horizontalement
          y: "50vh", // Centrée verticalement
          opacity: 1,
          duration: 0.5,
        })
      },
      onLeave: () => {
        gsap.to(tinetteRef.current, {
          opacity: 0,
          duration: 0.5,
        })
      },
      onEnterBack: () => {
        gsap.to(tinetteRef.current, {
          opacity: 1,
          duration: 0.5,
        })
      },
      onLeaveBack: () => {
        gsap.to(tinetteRef.current, {
          opacity: 0,
          duration: 0.5,
        })
      },
    })

    return () => {
      // Nettoyer les animations
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id?.includes("tinette")) {
          trigger.kill()
        }
      })
    }
  }, [isMobile])

  // Ne pas rendre le composant sur mobile
  if (isMobile) return null

  return (
    <div
      ref={tinetteRef}
      className="fixed pointer-events-none"
      style={{
        width: "200px", // Taille d'origine
        height: "auto",
        zIndex: 100,
        opacity: 1,
        transform: "translate(-50%, -50%)", // Centrer l'élément
        mixBlendMode: "screen", // Effet de fusion pour ne pas cacher le texte
      }}
    >
      <Image src="/images/tinette.png" alt="Tinette" width={200} height={240} className="object-contain" priority />
    </div>
  )
}
