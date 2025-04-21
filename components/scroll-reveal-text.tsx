"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ScrollRevealText({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      const container = containerRef.current
      if (!container) return

      // Sélectionner tous les paragraphes
      const paragraphs = container.querySelectorAll("p")

      paragraphs.forEach((paragraph, index) => {
        // Diviser le texte en mots
        const text = paragraph.innerHTML
        const words = text.split(" ")

        // Remplacer le contenu par des spans pour chaque mot
        paragraph.innerHTML = words.map((word) => `<span class="word-reveal">${word}</span>`).join(" ")

        // Animer chaque mot
        const spans = paragraph.querySelectorAll(".word-reveal")

        gsap.from(spans, {
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.5,
          scrollTrigger: {
            trigger: paragraph,
            start: "top 80%",
          },
        })
      })

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }
  }, [children])

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto py-16 px-4">
      {children}
    </div>
  )
}
