"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface SimpleTextRevealProps {
  children: React.ReactNode
}

export default function SimpleTextReveal({ children }: SimpleTextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textElement = textRef.current
    if (!textElement) return

    // Observer pour détecter quand les paragraphes sont visibles
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("text-reveal-visible")
            // Une fois que l'élément est visible, on arrête de l'observer
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }, // Déclencher quand 20% de l'élément est visible
    )

    // Observer chaque paragraphe
    const paragraphs = textElement.querySelectorAll("p")
    paragraphs.forEach((paragraph) => {
      paragraph.classList.add("text-reveal")
      observer.observe(paragraph)
    })

    return () => {
      // Nettoyer l'observer
      paragraphs.forEach((paragraph) => {
        observer.unobserve(paragraph)
      })
    }
  }, [])

  return (
    <div ref={textRef} className="max-w-3xl mx-auto py-16 px-4">
      {children}
    </div>
  )
}
