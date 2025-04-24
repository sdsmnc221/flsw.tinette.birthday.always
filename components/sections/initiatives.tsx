"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export default function Initiatives() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState<string | null>(null)
  const isMobile = useMobile()

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

  // Gérer le chargement de l'iframe
  const handleIframeLoad = () => {
    setIframeLoaded(true)
  }

  // Gérer les erreurs de l'iframe
  const handleIframeError = () => {
    setIframeError("Impossible de charger le contenu. Veuillez visiter le site directement.")
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
          {/* Élément 1 - Chat NOIR et BLANC */}
          <div className="bento-item md:col-span-2 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] group">
            <div className="relative h-80 md:h-96 w-full">
              <Image
                src="/images/chat-noir-et-blanctrouve-perdu.jpg"
                alt="Chat noir et blanc perdu trouvé retrouvé"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 p-6 flex flex-col justify-end">
                <div className="relative z-10 flex-grow">
                  <h3 className="text-xl text-white mb-2">Chat NOIR et BLANC perdu trouvé retrouvé (France)</h3>
                  <p className="mb-4 text-gray-300">
                    Une communauté dédiée à la recherche des chats noirs et blancs perdus, où j'ai pu partager mon
                    expérience et aider d'autres propriétaires.
                  </p>
                </div>
                <Link
                  href="https://www.facebook.com/groups/1150141552872164"
                  target="_blank"
                  className="relative z-10 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Visiter <ExternalLink className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Élément 2 - Chats perdus ou trouvés Sainte-Geneviève-des-Bois */}
          <div className="bento-item rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] group">
            <div className="relative h-80 md:h-96 w-full">
              <Image
                src="/images/chat-perdu-saintegen-limitrophe.jpg"
                alt="Chat perdu Sainte-Geneviève-des-Bois"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 p-6 flex flex-col justify-end">
                <div className="relative z-10 flex-grow">
                  <h3 className="text-xl text-white mb-2">Chats perdus ou trouvés Sainte-Geneviève-des-Bois</h3>
                  <p className="mb-4 text-gray-300">
                    Groupe local pour les chats perdus ou trouvés à Sainte-Geneviève-des-Bois et villes limitrophes.
                  </p>
                </div>
                <Link
                  href="https://www.facebook.com/groups/898318949013841"
                  target="_blank"
                  className="relative z-10 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Visiter <ExternalLink className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Élément 3 - Réseau Lecteur de Puce France */}
          <div className="bento-item rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] group">
            <div className="relative h-80 md:h-96 w-full">
              <Image
                src="/images/reseau-lecteur-puce.jpg"
                alt="Réseau Lecteur de Puce France"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 p-6 flex flex-col justify-end">
                <div className="relative z-10 flex-grow">
                  <h3 className="text-xl text-white mb-2">Réseau Lecteur de Puce France</h3>
                  <p className="mb-4 text-gray-300">
                    Communauté de personnes équipées pour lire les puces électroniques des animaux trouvés.
                  </p>
                </div>
                <Link
                  href="https://www.facebook.com/groups/1078122210620320"
                  target="_blank"
                  className="relative z-10 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors rounded-xl"
                >
                  Visiter <ExternalLink className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Élément 4 - Carte interactive du réseau lecteur de puce */}
          <div className="bento-item md:col-span-2 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] group">
            <div className="relative h-80 md:h-96 w-full">
              <Image
                src="/images/carte-lecteur.jpg"
                alt="Carte interactive du réseau lecteur de puce"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 p-6 flex flex-col justify-end">
                <div className="relative z-10 flex-grow">
                  <h3 className="text-xl text-white mb-2">Carte interactive du réseau lecteur de puce</h3>
                  <p className="mb-4 text-gray-300">
                    Collaboration avec AnTR pour créer une carte des lecteurs de puces disponibles, facilitant la
                    recherche d'aide pour les propriétaires d'animaux perdus.
                  </p>
                </div>
                <Link
                  href="https://scan-puce.antr.tech"
                  target="_blank"
                  className="relative z-10 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors rounded-xl"
                >
                  Visiter <ExternalLink className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Élément 5 - Campagne "La Puce est-elle inutile, si..." */}
          <div className="bento-item md:col-span-2 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] group">
            <div className="relative h-80 md:h-96 w-full">
              <Image
                src="/images/puce-flyer.jpg"
                alt="La Puce est-elle inutile, si..."
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 p-6 flex flex-col justify-end">
                <div className="relative z-10 flex-grow">
                  <h3 className="text-xl text-white mb-2">Campagne "La Puce est-elle inutile, si..."</h3>
                  <p className="mb-4 text-gray-300">
                    Une campagne de sensibilisation, en collaboration avec AnTR et la communauté Chat NOIR et BLANC,
                    visant à informer sur l'importance de l'identification des animaux.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleDownloadFlyer}
                    className="relative z-10 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 rounded-xl"
                    size="sm"
                  >
                    <Download className="w-4 h-4" /> Télécharger le flyer
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Élément 6 - Une puce inutile avec iframe Canva */}
          <div className="bento-item iframe-item md:col-span-1 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] group flex flex-col">
            {/* Div 1: Partie supérieure avec iframe Canva */}
            <div className="relative w-full aspect-video bg-black">
              {/* Image de couverture qui s'affiche avant le chargement de l'iframe */}
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <Image
                    src="/images/video-poster-5secondes.png"
                    alt="Une puce inutile"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="animate-pulse text-white text-center">
                      <p>Chargement du contenu...</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Conteneur pour l'iframe Canva */}
              <div className="relative w-full h-0 pt-[56.25%] pb-0 overflow-hidden rounded-lg">
                <iframe
                  ref={iframeRef}
                  loading="lazy"
                  className="absolute w-full h-full top-0 left-0 border-0 p-0 m-0"
                  src="https://www.canva.com/design/DAGVpc13pnI/RQ_vmzCl2DpkHZF0rAQ-jg/watch?embed"
                  allowFullScreen
                  allow="fullscreen"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                ></iframe>
              </div>

              {/* Message d'erreur */}
              {iframeError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <div className="text-red-400 text-center p-4">
                    <p>{iframeError}</p>
                    <Link
                      href="https://readymag.website/u1900695161/5091714/"
                      target="_blank"
                      className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Voir la vidéo en ligne <ExternalLink className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Div 2: Partie inférieure avec titre et CTA */}
            <div className="flex-grow bg-black p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl text-white mb-2">"Une puce inutile"</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Sur l'importance de scanner les puces électroniques, en collaboration avec AnTR.
                </p>
              </div>
              <Link
                href="https://readymag.website/u1900695161/5091714/"
                target="_blank"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                Visiter <ExternalLink className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Élément 7 - FeliSweet */}
          <div className="bento-item md:col-span-3 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] group">
            <div className="relative h-auto min-h-[500px] md:min-h-[350px] w-full">
              <Image
                src="/images/flsw-revisit-25.jpg"
                alt="FeliSweet"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80 p-6 flex flex-col justify-end">
                <div className="relative z-10 flex-grow bento-item-content">
                  <h3 className="text-xl text-white mb-2 text-left">Revisite de mon site web FeliSweet.com</h3>
                  {isMobile ? (
                    <p className="mb-4 text-gray-300 text-left">
                      Pour 2025, cette refonte de mon site web incorpore dans l'univers de FeliSweet l'empreinte de
                      Sweety, qui était à l'origine de la création de l'entreprise, et qui est l'âme de l'entreprise,
                      pour toujours.
                    </p>
                  ) : (
                    <p className="mb-4 text-gray-300 text-left">
                      Pour l'année 2025, cette refonte de mon site web incorpore dans l'univers de FeliSweet l'empreinte
                      de Sweety, qui était à l'origine de la création de l'entreprise, et qui est l'âme de l'entreprise,
                      pour toujours.
                    </p>
                  )}
                </div>
                <div className="text-left">
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
