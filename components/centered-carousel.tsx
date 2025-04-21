"use client"

import { useRef, useState } from "react"
import Image from "next/image"

interface CenteredCarouselProps {
  images: { src: string; alt: string }[]
  accentColor?: string
}

export default function CenteredCarousel({ images, accentColor = "#c38b55" }: CenteredCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Gérer le clic sur une image
  const handleImageClick = (index: number) => {
    if (index === selectedIndex) return
    setSelectedIndex(index)
  }

  // Déterminer la taille et la position de chaque image en fonction de sa position relative à l'image sélectionnée
  const getImageProps = (index: number) => {
    const total = images.length
    // Calculer la distance la plus courte entre l'index actuel et l'index sélectionné
    let distance = Math.min(
      Math.abs(index - selectedIndex),
      Math.abs(index - selectedIndex + total),
      Math.abs(index - selectedIndex - total),
    )

    // Limiter la distance à 2 pour ne pas avoir trop d'images
    distance = Math.min(distance, 2)

    // Déterminer si l'image est à gauche ou à droite de l'image sélectionnée
    const isLeft =
      (index < selectedIndex && selectedIndex - index <= total / 2) ||
      (index > selectedIndex && index - selectedIndex > total / 2)

    // Définir la taille en fonction de la distance
    let width = 300
    if (distance === 1) width = 240
    if (distance === 2) width = 180

    // Définir la position en fonction de la distance et de la direction
    let left = 50 // Centre par défaut
    if (distance === 1) left = isLeft ? 30 : 70
    if (distance === 2) left = isLeft ? 15 : 85

    // Définir le z-index en fonction de la distance
    const zIndex = 30 - distance * 10

    return { width, left, zIndex, distance }
  }

  return (
    <div ref={carouselRef} className="relative h-[400px] md:h-[500px] w-full overflow-hidden my-12">
      {/* Rendu de toutes les images */}
      {images.map((image, index) => {
        const { width, left, zIndex, distance } = getImageProps(index)

        // Ne rendre que les images visibles (distance <= 2)
        if (distance > 2) return null

        return (
          <div
            key={index}
            className="carousel-item absolute top-1/2 transform -translate-y-1/2"
            style={{
              left: `${left}%`,
              transform: `translateX(-50%) translateY(-50%)`,
              zIndex,
              width: `${width}px`,
              transition: "all 0.5s ease-in-out",
            }}
            onClick={() => handleImageClick(index)}
          >
            <div
              className="relative aspect-square w-full shadow-lg rounded-lg overflow-hidden cursor-pointer"
              style={{ transition: "all 0.5s ease-in-out" }}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                sizes={`${width}px`}
                className="object-cover"
                priority={index === selectedIndex}
              />
            </div>
          </div>
        )
      })}

      {/* Indicateurs de position (points) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "w-6" : "bg-white/50"
            }`}
            style={{ backgroundColor: index === selectedIndex ? accentColor : undefined }}
            onClick={() => handleImageClick(index)}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
