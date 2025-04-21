"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import FloatingTinette from "@/components/floating-tinette"
import Introduction from "@/components/sections/introduction"
import Story from "@/components/sections/story"
import Philosophy from "@/components/sections/philosophy"
import Testimony from "@/components/sections/testimony"
import Initiatives from "@/components/sections/initiatives"
import Commemoration from "@/components/sections/commemoration"
import Footer from "@/components/sections/footer"
import PawPrints from "@/components/paw-prints"
import ContactShare from "@/components/sections/contact-share"

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger)

      // Create section references
      const sections = document.querySelectorAll(".section")
      sectionsRef.current = Array.from(sections) as HTMLDivElement[]

      // Initialize ScrollTrigger for each section
      sectionsRef.current.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setActiveSection(index)
          },
          onEnterBack: () => {
            setActiveSection(index)
          },
          markers: false,
        })
      })

      // Initialize fade-in animations
      const fadeElements = document.querySelectorAll(".fade-in")
      fadeElements.forEach((element) => {
        ScrollTrigger.create({
          trigger: element,
          start: "top 80%",
          onEnter: () => element.classList.add("visible"),
          once: true,
        })
      })

      // Initialize timeline animations
      const timelineItems = document.querySelectorAll(".timeline-item")
      timelineItems.forEach((item, index) => {
        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          delay: index * 0.2,
        })
      })

      return () => {
        // Clean up ScrollTrigger instances
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  return (
    <main ref={containerRef} className="relative">
      <FloatingTinette />
      <PawPrints />

      <Introduction />
      <Story />
      <Philosophy />
      <Testimony />
      <Initiatives />
      <Commemoration />
      <ContactShare />
      <Footer />
    </main>
  )
}
