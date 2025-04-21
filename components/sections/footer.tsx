import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        <div className="text-left">
          <Link
            href="https://felisweet.com/"
            target="_blank"
            className="text-white hover:text-blue-300 transition-colors"
          >
            Accueil FeliSweet.com
          </Link>
        </div>

        <div className="text-center md:text-right flex flex-col gap-2">
          <div className="text-white">2025 © FeliSweet</div>
          <div className="text-xs text-gray-400 max-w-md">
            Une initiative dédiée à ma Sweety et les communautés dont moi-même, Marie-Bénédicte SIRUGUET, suis membre :{" "}
            <Link
              href="https://www.facebook.com/groups/1150141552872164"
              target="_blank"
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              Chat NOIR et BLANC, perdu trouvé retrouvé
            </Link>
            {" - "}
            <Link
              href="https://www.facebook.com/groups/1078122210620320"
              target="_blank"
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              Réseau Lecteur de Puce France
            </Link>
          </div>
          <div className="text-sm text-gray-400">
            En collaboration avec:{" "}
            <Link
              href="https://antr.tech/"
              target="_blank"
              className="text-blue-300 hover:text-blue-200 transition-colors inline-flex items-center"
            >
              AnTR <ExternalLink className="ml-1 w-3 h-3" />
            </Link>
          </div>
          <div className="text-[8px] text-gray-600 mt-4">
            <a href="https://lordicon.com/" target="_blank" rel="noopener noreferrer">
              Icons by Lordicon.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
