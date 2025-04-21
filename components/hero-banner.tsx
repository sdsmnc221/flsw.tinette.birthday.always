import Image from "next/image"

interface HeroBannerProps {
  title: string
  subtitle?: string
  imageSrc: string
}

export default function HeroBanner({ title, subtitle, imageSrc }: HeroBannerProps) {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
      {/* Image d'arrière-plan */}
      <div className="absolute inset-0">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Contenu du hero */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 shadow-text">{title}</h2>
        {subtitle && <p className="text-xl md:text-2xl text-white max-w-3xl shadow-text">{subtitle}</p>}
      </div>
    </div>
  )
}
