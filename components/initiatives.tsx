"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function Initiatives() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const isMobile = useMobile()

  // Fonction pour gérer la lecture/pause de la vidéo
  const toggleVideo = () => {
    if (!videoRef.current) return

    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      // Animation d'entrée pour les éléments de la grille
      if (gridRef.current) {
        const gridItems = gridRef.current.querySelectorAll(".bento-item")

        gridItems.forEach((item, index) => {
          gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          })
        })
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  // Fonction pour télécharger le flyer
  const handleDownloadFlyer = () => {
    // Ici, vous devrez remplacer par le vrai lien vers le PDF
    const link = document.createElement("a")
    link.href = "/scan-puce-selfprinted-v5.pdf" // Remplacer par le vrai chemin du PDF
    link.download = "la-puce-est-elle-inutile-si-flyer.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="initiatives" ref={sectionRef} className="section bg-black">
      <div className="max-w-6xl mx-auto z-10 px-4">
        <h2 className="text-3xl md:text-5xl mb-6 text-center text-white fade-in text-balance">
          Les démarches au nom de Sweety
        </h2>
        <h3 className="text-xl md:text-2xl mb-12 text-center text-blue-300 fade-in text-balance">
          Initiatives et communautés
        </h3>

        {/* Bannière Zigpo & Mimoso */}
        <div className="w-full mb-12 overflow-hidden rounded-xl">
          <Image
            src="/images/zigpo-mimoso.png"
            alt="Avec Zigpo & Mimoso je continue sans faille"
            width={1200}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Texte d'introduction */}
        <div className="mb-12 text-lg text-balance">
          <p className="fade-in text-center">
            Depuis la disparition de ma Sweety, malgré la douleur qui m'accompagne chaque jour, je continue sans faille
            ma vie. Elle est parfois pénible et douloureuse, mais tout de même embrassée par la chaleur et l'amour de
            mes deux autres chats, Zigpo et Mimoso, qui m'apportent du réconfort dans cette épreuve. Avec eux, je
            continue sans faille.
          </p>
          <p className="mt-4 fade-in text-center">J'ai lancé ou rejoint plusieurs initiatives:</p>
        </div>

        {/* Bento Grid Layout */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Élément 7 - FeliSweet */}
          <div className="bento-item md:col-span-3 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] group">
            <div className="relative h-auto min-h-[500px] md:min-h-[350px]">
              <Image
                src="/images/flsw-revisit-25.jpg"
                alt="FeliSweet"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 p-6 flex flex-col justify-end">
                <div className="relative z-10 flex-grow bento-item-content">
                  <h3 className="text-xl text-white mb-2 text-center">Revisite de mon site web FeliSweet.com</h3>
                  {isMobile ? (
                    <p className="mb-4 text-gray-300 text-center">
                      Pour 2025, j'intègre davantage d'informations sur la recherche des chats perdus sur mon site de
                      comportementaliste félin. Sweety reste l'âme de l'entreprise, pour toujours.
                    </p>
                  ) : (
                    <p className="mb-4 text-gray-300 text-center">
                      Pour l'année 2025, j'intègre davantage d'informations sur la recherche des chats perdus et
                      l'importance de l'identification sur mon site professionnel de comportementaliste félin. Cette
                      refonte incorpore dans l'univers de FeliSweet l'empreinte de Sweety, qui était à l'origine de la
                      création de l'entreprise, et qui est l'âme de l'entreprise, pour toujours.
                    </p>
                  )}
                </div>
                <div className="text-center">
                  <Link
                    href="https://felisweet.com/"
                    target="_blank"
                    className="relative z-10 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors rounded-xl"
                  >
                    Visiter <ExternalLink className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Texte de conclusion */}
        <div className="text-lg text-center max-w-3xl mx-auto mb-8 text-balance">
          <p className="fade-in italic text-gray-300">
            Ces initiatives, bien qu'elles aident de nombreuses personnes, sont aussi ma façon de continuer à chercher
            Sweety et de donner un sens à son absence.
          </p>
        </div>
      </div>
    </section>
  )
}
