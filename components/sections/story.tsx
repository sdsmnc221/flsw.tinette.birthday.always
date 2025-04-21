"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import SimpleTextReveal from "@/components/simple-text-reveal"

export default function Story() {
  // Fonction pour télécharger l'affiche (à remplacer par le vrai lien vers le PDF)
  const handleDownloadPoster = () => {
    // Ici, vous devrez remplacer par le vrai lien vers le PDF
    const link = document.createElement("a")
    link.href = "/affiche-sweety.pdf" // Remplacer par le vrai chemin du PDF
    link.download = "affiche-sweety.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="story" className="section bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Hero avec l'image feli-sans-sweet */}
        <div className="relative w-full mb-12 overflow-hidden">
          <Image
            src="/images/feli-sans-sweet.png"
            alt="L'année 2024 fut FELIsansSWEET"
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Titre sans animation, même style que le titre de Testimony */}
        <h2 className="text-3xl md:text-5xl mb-12 text-center text-white fade-in text-balance">
          Un 2024 <span className="uppercase">FELI</span>-sans-<span className="uppercase">SWEET</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <SimpleTextReveal>
            <p className="text-lg mb-6 text-left">
              Sweety, ma chatte noir et blanc, une véritable 'old lady' au caractère bien trempé et parfois grincheuse,
              mais profondément affectueuse à sa manière, a partagé 17 années de vie avec moi avant sa disparition.
            </p>

            <p className="text-lg mb-6 text-left">
              Sa présence me manque terriblement chaque jour. Son souvenir, toujours vif dans mon esprit, m'a poussée à
              lancer plusieurs initiatives - non seulement pour aider d'autres personnes vivant la même situation
              déchirante, mais aussi pour m'aider moi-même à traverser cette épreuve et à garder espoir de la retrouver
              un jour.
            </p>
          </SimpleTextReveal>

          <div className="fade-in">
            <div className="relative p-6 rounded-xl">
              {/* Titre en rouge sans ombre et sans gras */}
              <h2 className="text-5xl text-[#ff3131] text-center w-full mb-4 font-normal">Chat disparu</h2>

              {/* Conteneur pour les images avec plus d'espace entre elles */}
              <div className="relative w-full h-[400px] mb-8 md:mb-12">
                {/* Image 1 - Profil (en bas à gauche) */}
                <div
                  className="absolute shadow-lg rounded-xl overflow-hidden transform rotate-[-5deg] hover-image-effect"
                  style={{
                    width: "55%",
                    height: "auto",
                    left: "0%",
                    top: "15%",
                    zIndex: 10,
                    border: "4px solid white",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Image
                    src="/images/sweety-profile.jpeg"
                    alt="Sweety de profil"
                    width={300}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Image 2 - Face (en haut à droite) */}
                <div
                  className="absolute shadow-lg rounded-xl overflow-hidden transform rotate-[3deg] hover-image-effect"
                  style={{
                    width: "55%",
                    height: "auto",
                    right: "0%",
                    top: "0%",
                    zIndex: 11,
                    border: "4px solid white",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Image
                    src="/images/sweety-face.jpeg"
                    alt="Sweety de face"
                    width={300}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Image 3 - Dos (au milieu) */}
                <div
                  className="absolute shadow-lg rounded-xl overflow-hidden transform rotate-[8deg] hover-image-effect"
                  style={{
                    width: "45%",
                    height: "auto",
                    left: "28%",
                    top: "45%",
                    zIndex: 12,
                    border: "4px solid white",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Image
                    src="/images/sweety-back.jpeg"
                    alt="Sweety de dos"
                    width={200}
                    height={200}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Texte encadré en rouge en dessous des images */}
              <div className="bg-gray-800 border border-[#ff3131] rounded-xl p-4 shadow-md mb-6 relative z-20">
                <p className="text-sm text-white text-center">
                  Ma Sweety (chat noir & blanc) n'est pas rentrée depuis vendredi matin (28/06/2024). Merci de regarder
                  vos abris, maison, garage, elle n'est pas du tout craintive, elle est âgée de 17 ans, identifiée par
                  puce. Quartier rue d'Amérique, à Sainte-Geneviève-des-Bois. Partagez et prévenez moi si vous la voyez.
                </p>
              </div>

              {/* Boutons sur la même ligne */}
              <div className="flex justify-center gap-4">
                <Button
                  className="bg-[#ff3131] hover:bg-red-700 text-white py-2 px-4 rounded-xl shadow-lg"
                  onClick={() => document.getElementById("contact-share")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Contact
                </Button>

                <Button
                  onClick={handleDownloadPoster}
                  className="flex items-center gap-2 bg-[#ff3131] hover:bg-red-700 text-white py-2 px-4 rounded-xl shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Télécharger l'affiche
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
