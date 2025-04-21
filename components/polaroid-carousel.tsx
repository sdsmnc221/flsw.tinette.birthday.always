"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PolaroidCarouselProps {
  images: { src: string; alt: string }[]
}

export default function PolaroidCarousel({ images }: PolaroidCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Fonction pour aller à l'image suivante
  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Fonction pour aller à l'image précédente
  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Calculer les indices des images à afficher (actuelle + précédente + suivante)
  const prevIndex = (currentIndex - 1 + images.length) % images.length
  const nextIndex = (currentIndex + 1) % images.length

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-center">
        {/* Image précédente (plus petite, à gauche) */}
        <div
          className={`hidden md:block relative w-48 h-48 mr-4 transition-all duration-500 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-white p-2 shadow-md rounded-md transform rotate-[-3deg]">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={images[prevIndex].src || "/placeholder.svg"}
                alt={images[prevIndex].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Image principale (au centre) */}
        <div
          className={`relative transition-all duration-500 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <div className="relative w-full max-w-2xl aspect-square rounded-lg overflow-hidden bg-blue-400 p-3">
            <div className="relative w-full h-full rounded-md overflow-hidden">
              <Image
                src={images[currentIndex].src || "/placeholder.svg"}
                alt={images[currentIndex].alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Image suivante (plus petite, à droite) */}
        <div
          className={`hidden md:block relative w-48 h-48 ml-4 transition-all duration-500 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-white p-2 shadow-md rounded-md transform rotate-[3deg]">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={images[nextIndex].src || "/placeholder.svg"}
                alt={images[nextIndex].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-center mt-8 space-x-4">
        <Button
          onClick={goToPrevious}
          disabled={isAnimating}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase px-6 py-2 rounded-md"
        >
          Précédent
        </Button>
        <Button
          onClick={goToNext}
          disabled={isAnimating}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase px-6 py-2 rounded-md"
        >
          Suivant
        </Button>
      </div>
    </div>
  )
}
