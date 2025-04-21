import Image from "next/image"
import CenteredCarousel from "@/components/centered-carousel"
import SimpleTextReveal from "@/components/simple-text-reveal"

export default function Philosophy() {
  const carouselImages = [
    { src: "/images/pas-adieu-1.jpeg", alt: "Pas d'preuve, pas d'adieu - Image 1" },
    { src: "/images/pas-adieu-2.jpeg", alt: "Pas d'preuve, pas d'adieu - Image 2" },
    { src: "/images/pas-adieu-3.jpeg", alt: "Pas d'preuve, pas d'adieu - Image 3" },
    { src: "/images/pas-adieu-4.jpeg", alt: "Pas d'preuve, pas d'adieu - Image 4" },
    { src: "/images/pas-adieu-5.jpeg", alt: "Pas d'preuve, pas d'adieu - Image 5" },
  ]

  return (
    <section id="philosophy" className="section bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Hero avec bannière */}
        <div className="relative w-full h-[40vh] min-h-[300px] mb-12 overflow-hidden rounded-lg">
          <Image
            src="/images/pas-adieu-banner.jpeg"
            alt="Pas d'preuve, pas d'adieu"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-4 shadow-text">
              "Pas d'Preuve, Pas d'Adieu"
            </h2>
            <p className="text-xl md:text-2xl text-center text-[#f7d78b] shadow-text highlight-hope">Je garde espoir</p>
          </div>
        </div>

        {/* Carousel centré */}
        <CenteredCarousel images={carouselImages} />

        {/* Texte qui se révèle au défilement */}
        <SimpleTextReveal>
          <p className="mb-6 text-lg text-white text-center">
            N'oubliez pas : tant qu'il n'y a pas de <strong className="text-[#c38b55]">preuve</strong>, il n'y a pas d'
            <strong className="text-[#c38b55]">adieu</strong>.{" "}
            <span className="text-[#f7d78b] text-xl">Je garde espoir</span>.
          </p>
          <p className="mb-6 text-lg text-white text-center">
            Cette philosophie est née de mon expérience douloureuse mais pleine d'espoir que représente la recherche de
            Sweety. Elle me rappelle que sans preuve définitive, je dois continuer à espérer et à chercher ma compagne
            féline.
          </p>
          <p className="text-lg text-white text-center">
            La démarche "Pas d'Preuve, Pas d'Adieu" que j'ai initiée suite à la disparition de Sweety est devenue un{" "}
            <strong className="text-[#c38b55]">mouvement d'espoir</strong> pour moi-même, et pour mes communautés dont
            je fais partie. J'encourage à ne jamais abandonner tant qu'il n'y a pas de preuve définitive de ce qui est
            arrivé à l'animal.
          </p>
        </SimpleTextReveal>
      </div>
    </section>
  )
}
