"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface HorizontalScrollGalleryProps {
  images: { src: string; alt: string }[]
}

export default function HorizontalScrollGallery({ images }: HorizontalScrollGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Enregistrer les plugins GSAP
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const track = trackRef.current

      if (!section || !track) return

      // Créer l'animation de défilement horizontal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${section.offsetWidth}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
      })

      return () => {
        // Nettoyer les instances de ScrollTrigger
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }
  }, [])

  return (
    <div ref={sectionRef} className="w-full h-screen overflow-hidden bg-black">
      <div ref={trackRef} className="flex items-center h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[80vw] max-w-[500px] h-[80vh] max-h-[500px] mx-4 flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-[300px] max-h-[300px] rounded-lg overflow-hidden">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 300px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
