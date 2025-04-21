"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"

interface ModernCarouselProps {
  images: { src: string; alt: string }[]
  autoPlay?: boolean
  interval?: number
}

export default function ModernCarousel({ images, autoPlay = true, interval = 5000 }: ModernCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Fonction pour aller à l'image suivante
  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Fonction pour aller à l'image précédente
  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Fonction pour aller à une image spécifique
  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
  }

  // Effet pour l'autoplay
  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(goToNext, interval)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [autoPlay, interval])

  // Effet pour les animations
  useEffect(() => {
    if (!carouselRef.current) return

    const cards = carouselRef.current.querySelectorAll(".carousel-card")

    // Réinitialiser l'animation
    gsap.set(cards, {
      opacity: 0,
      scale: 0.8,
      y: 20,
      rotationX: -5,
      rotationY: 5,
      transformPerspective: 1000,
    })

    // Animer les cartes
    gsap.to(cards, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => setIsAnimating(false),
    })
  }, [currentIndex])

  // Calculer les indices des images à afficher (actuelle + précédente + suivante)
  const visibleIndices = [
    (currentIndex - 1 + images.length) % images.length,
    currentIndex,
    (currentIndex + 1) % images.length,
    (currentIndex + 2) % images.length,
  ]

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden py-12">
      {/* Conteneur principal du carousel */}
      <div ref={carouselRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
        {visibleIndices.map((index, i) => (
          <div
            key={`card-${index}`}
            className={`carousel-card relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl transition-all duration-500 cursor-pointer ${
              index === currentIndex ? "md:col-span-2 md:row-span-2 z-10" : ""
            }`}
            onClick={() => goToSlide(index)}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-300 z-10"></div>
            <Image
              src={images[index].src || "/placeholder.svg"}
              alt={images[index].alt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-lg font-semibold">{images[index].alt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <button
        onClick={goToPrevious}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-20"
        aria-label="Image précédente"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-20"
        aria-label="Image suivante"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicateurs */}
      <div className="flex justify-center mt-6 space-x-2">
        {images.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
