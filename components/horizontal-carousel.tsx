"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"

interface HorizontalCarouselProps {
  images: { src: string; alt: string }[]
}

export default function HorizontalCarousel({ images }: HorizontalCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [slideWidth, setSlideWidth] = useState(0)
  const [trackWidth, setTrackWidth] = useState(0)
  const [wrapperWidth, setWrapperWidth] = useState(0)
  const [progress, setProgress] = useState(0)

  // Initialiser GSAP et Draggable
  useEffect(() => {
    gsap.registerPlugin(Draggable)

    const updateDimensions = () => {
      if (trackRef.current && wrapperRef.current) {
        const slideElements = trackRef.current.querySelectorAll(".carousel-slide")
        const newSlideWidth = slideElements[0]?.getBoundingClientRect().width || 0
        const newTrackWidth = trackRef.current.scrollWidth
        const newWrapperWidth = wrapperRef.current.clientWidth

        setSlideWidth(newSlideWidth)
        setTrackWidth(newTrackWidth)
        setWrapperWidth(newWrapperWidth)
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Initialiser Draggable
    if (trackRef.current) {
      const maxX = 0
      const minX = -(trackWidth - wrapperWidth)

      const draggable = Draggable.create(trackRef.current, {
        type: "x",
        bounds: { minX, maxX },
        inertia: true,
        onDragStart: () => setIsDragging(true),
        onDragEnd: () => {
          setIsDragging(false)

          // Snap to closest slide
          if (trackRef.current) {
            const currentX = gsap.getProperty(trackRef.current, "x") as number
            const closestSlideIndex = Math.round(Math.abs(currentX) / slideWidth)
            goToSlide(closestSlideIndex)
          }
        },
        onDrag: () => {
          if (trackRef.current) {
            const currentX = gsap.getProperty(trackRef.current, "x") as number
            const maxScroll = trackWidth - wrapperWidth
            const newProgress = Math.max(0, Math.min(1, Math.abs(currentX) / maxScroll))
            setProgress(newProgress)

            // Update active index based on position
            const newIndex = Math.round(Math.abs(currentX) / slideWidth)
            if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
              setActiveIndex(newIndex)
            }
          }
        },
      })[0]

      return () => {
        draggable.kill()
        window.removeEventListener("resize", updateDimensions)
      }
    }

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [images.length, trackWidth, wrapperWidth, slideWidth, activeIndex])

  // Fonction pour aller à une diapositive spécifique
  const goToSlide = (index: number) => {
    if (index < 0 || index >= images.length || !trackRef.current) return

    const targetX = -index * slideWidth

    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.8,
      ease: "power3.out",
      onUpdate: () => {
        if (trackRef.current) {
          const currentX = gsap.getProperty(trackRef.current, "x") as number
          const maxScroll = trackWidth - wrapperWidth
          const newProgress = Math.max(0, Math.min(1, Math.abs(currentX) / maxScroll))
          setProgress(newProgress)
        }
      },
      onComplete: () => {
        setActiveIndex(index)
      },
    })
  }

  // Fonctions de navigation
  const goToNext = () => {
    goToSlide(Math.min(activeIndex + 1, images.length - 1))
  }

  const goToPrevious = () => {
    goToSlide(Math.max(activeIndex - 1, 0))
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Barre de progression */}
      <div className="w-full h-1 bg-gray-800 mb-4">
        <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress * 100}%` }}></div>
      </div>

      {/* Wrapper du carousel */}
      <div ref={wrapperRef} className="relative overflow-hidden" style={{ touchAction: "none" }}>
        {/* Track du carousel */}
        <div ref={trackRef} className="flex cursor-grab active:cursor-grabbing" style={{ touchAction: "none" }}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide flex-shrink-0 p-2 transition-opacity duration-300 ${
                Math.abs(index - activeIndex) > 2 ? "opacity-40" : "opacity-100"
              }`}
              style={{ width: "80vw", maxWidth: "800px" }}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-lg font-semibold">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={goToPrevious}
          disabled={activeIndex === 0}
          className={`p-3 rounded-full ${
            activeIndex === 0 ? "bg-gray-700 text-gray-500" : "bg-blue-600 text-white hover:bg-blue-700"
          } transition-colors`}
          aria-label="Image précédente"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-2">
          {images.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-blue-500 w-6" : "bg-gray-500"
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={activeIndex === images.length - 1}
          className={`p-3 rounded-full ${
            activeIndex === images.length - 1 ? "bg-gray-700 text-gray-500" : "bg-blue-600 text-white hover:bg-blue-700"
          } transition-colors`}
          aria-label="Image suivante"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
