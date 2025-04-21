export default function Introduction() {
  return (
    <section id="introduction" className="section bg-black">
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-0 bg-black"></div>

        <div className="z-10 max-w-4xl px-4 fade-in">
          <div className="relative">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
              À la recherche de ma Sweety (Tinette)
            </h1>
            {/* Espace réservé pour Tinette à droite du titre */}
            <div className="absolute right-0 top-0 h-full w-1/4"></div>
          </div>

          <h2 className="text-xl md:text-2xl mb-8 text-blue-300">
            Disparue le 28 juin 2024 - À jamais dans mon cœur - 18 ans le 24 avril 2025
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Une initiative de Marie-Bénédicte SIRUGUET, comportementaliste félin et fondatrice de FeliSweet. Cette page
            est dédiée à ma Sweety, ma chatte adorée qui fête ses 18 ans ce 24 avril 2025, où qu'elle soit. Disparue
            depuis le 28 juin 2024, je continue de la chercher activement et garde espoir chaque jour. Car je le sais
            profondément: tant qu'il n'y a pas de preuves, il n'y a pas d'adieu.
          </p>
        </div>
      </div>
    </section>
  )
}
