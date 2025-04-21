"use client"

import { useState, useEffect } from "react"
import { Phone, Facebook, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContactShare() {
  const [canShare, setCanShare] = useState(false)

  // Vérifier si l'API Web Share est disponible
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.share) {
      setCanShare(true)
    }
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "À la recherche de ma Sweety (Tinette)",
          text: "Aidez-moi à retrouver Sweety, ma chatte disparue depuis le 28 juin 2024.",
          url: window.location.href,
        })
      } catch (error) {
        console.error("Erreur lors du partage:", error)
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => alert("Lien copié dans le presse-papier"))
          .catch((err) => console.error("Erreur lors de la copie:", err))
      }
    }
  }

  return (
    <section id="contact-share" className="section bg-black">
      <div className="max-w-5xl mx-auto z-10 px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-white fade-in">
          Appel à l'action et contact
        </h2>

        <div className="bg-black bg-opacity-70 p-8 rounded-xl shadow-lg mb-12 fade-in">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-8 text-white">PARTAGEZ EN MASSE.</h3>
            <p className="text-2xl mb-4 text-gray-300">Parlez-en à votre vétérinaire.</p>
            <p className="text-2xl mb-8 text-gray-300">Sensibilisez votre entourage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Téléphone */}
            <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center hover:bg-gray-800 transition-colors">
              <div className="w-24 h-24 mb-4 flex items-center justify-center">
                <Phone className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold mb-2 text-blue-400">Téléphone</h4>
              <a
                href="tel:0676561587"
                className="text-white text-xl hover:text-blue-300 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> 06 76 56 15 87
              </a>
            </div>

            {/* Facebook */}
            <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center hover:bg-gray-800 transition-colors">
              <div className="w-24 h-24 mb-4 flex items-center justify-center">
                <Facebook className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold mb-2 text-blue-400">Facebook</h4>
              <Link
                href="https://www.facebook.com/Felisweetcatsittingcomportementfelin"
                target="_blank"
                className="text-white hover:text-blue-300 transition-colors flex items-center gap-2 text-center"
              >
                FeliSweet Comportementaliste <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            {/* Partager */}
            <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center hover:bg-gray-800 transition-colors">
              <div className="w-24 h-24 mb-4 flex items-center justify-center">
                <Share2 className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold mb-2 text-blue-400">Partager</h4>
              <Button onClick={handleShare} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                {canShare ? "Partager cette page" : "Copier le lien"}
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center fade-in">
          <p className="text-xl text-gray-300 mb-4">
            Si vous apercevez ma Sweety ou une chatte qui lui ressemble, veuillez me contacter immédiatement.
          </p>
          <p className="text-lg text-gray-400 mb-4">
            Ramenez le chat au vétérinaire ou faites venir un possesseur de lecteur de puce. Ouvrez l'œil...
          </p>
          <p className="text-lg text-blue-300 italic">Si elle reste encore en vie... il faut qu'on se retrouve.</p>
        </div>
      </div>
    </section>
  )
}
