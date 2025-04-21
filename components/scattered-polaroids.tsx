"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface ScatteredPolaroidsProps {
  images: { src: string; alt: string }[]
}

export default function ScatteredPolaroids({ images }: ScatteredPolaroidsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    // Fonction pour réinitialiser la position active
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveIndex(null)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  // Générer des positions et rotations aléatoires pour chaque polaroid
  const getRandomPosition = (index: number) => {
    // Utiliser l'index pour générer des positions semi-aléatoires mais cohérentes
    const seed = index * 137.5 + 0.5
    const xPercent = (seed % 80) - 40 // -40% à +40% de la largeur
    const yPercent = ((seed * 1.5) % 60) - 30 // -30% à +30% de la hauteur
    const rotation = ((seed * 2) % 40) - 20 // -20deg à +20deg

    return {
      xPercent,
      yPercent,
      rotation,
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-[600px] md:h-[800px] overflow-hidden my-12">
      {images.map((image, index) => {
        const { xPercent, yPercent, rotation } = getRandomPosition(index)
        const isActive = activeIndex === index

        return (
          <div
            key={index}
            className={`absolute polaroid-card cursor-pointer transition-all duration-500 ${
              isActive ? "z-50 scale-[1.5]" : "hover:z-40 hover:scale-110"
            } ${activeIndex !== null && !isActive ? "opacity-40" : "opacity-100"}`}
            style={{
              left: `calc(50% + ${xPercent}%)`,
              top: `calc(50% + ${yPercent}%)`,
              transform: `translate(-50%, -50%) rotate(${isActive ? 0 : rotation}deg)`,
              transformOrigin: "center center",
              transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
            onClick={() => setActiveIndex(isActive ? null : index)}
          >
            <div className="bg-white p-3 shadow-lg rounded-sm">
              <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 150px, 200px"
                />
              </div>
              <div className="pt-2 pb-1 text-center">
                <p className="text-black text-sm truncate">{image.alt}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
