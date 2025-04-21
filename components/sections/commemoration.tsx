"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Commemoration() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create sparkle effect
    if (containerRef.current) {
      const container = containerRef.current
      const createSparkle = () => {
        const sparkle = document.createElement("div")
        sparkle.classList.add("sparkle")

        // Random position
        const x = Math.random() * container.offsetWidth
        const y = Math.random() * container.offsetHeight

        sparkle.style.left = `${x}px`
        sparkle.style.top = `${y}px`

        container.appendChild(sparkle)

        // Remove after animation
        setTimeout(() => {
          sparkle.remove()
        }, 2000)
      }

      // Create sparkles periodically
      const interval = setInterval(createSparkle, 300)

      // Floating text effect
      const textElements = container.querySelectorAll("p")
      textElements.forEach((text) => {
        gsap.to(text, {
          y: "10px",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })

      return () => {
        clearInterval(interval)
      }
    }
  }, [])

  return (
    <section id="commemoration" className="section bg-black">
      <div ref={containerRef} className="max-w-4xl mx-auto text-center relative overflow-hidden p-8 rounded-lg z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white relative z-10 fade-in">Commémoration - 18 ans</h2>

        <div className="space-y-6 relative z-10">
          <p className="text-lg fade-in">
            En ce 24 avril 2025, ma Sweety aurait eu 18 ans. Cette date symbolique est l'occasion pour moi de célébrer
            les années de bonheur partagées et de réaffirmer mon engagement dans sa recherche et dans l'aide que
            j'apporte à d'autres propriétaires vivant la même situation.
          </p>

          <p className="text-lg fade-in">
            Chaque ronronnement de Sweety résonne encore dans mon cœur. Sa disparition a créé un vide en moi, mais aussi
            une force - celle qui me pousse à développer des initiatives pour aider les personnes à la recherche de
            leurs compagnons félins.
          </p>

          <p className="text-xl italic text-blue-300 mt-8 fade-in">
            Douce Sweety, mon cœur s'inquiète pour toi. À ton âge, loin de ta maison, tu dois avoir peur. Mais garde
            espoir, car je t'aime et je te cherche. Reviens vite auprès de moi, retrouve ta chaleur.
          </p>
        </div>
      </div>
    </section>
  )
}
