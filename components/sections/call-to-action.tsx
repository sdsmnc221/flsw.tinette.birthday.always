"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Twitter, Instagram, Share2 } from "lucide-react"

export default function CallToAction() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitMessage("Merci pour votre message. Nous vous contacterons dès que possible.")
    setIsSubmitting(false)
  }

  return (
    <section id="call-to-action" className="section bg-black">
      <div className="max-w-5xl mx-auto z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-white fade-in">
          Appel à l'action et contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="fade-in">
            <div className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Aidez-moi à retrouver Sweety</h3>

              <p className="mb-4">
                Si vous apercevez ma Sweety ou une chatte qui lui ressemble, veuillez me contacter immédiatement. Merci
                de regarder vos abris, maisons, garages - elle n'est pas du tout craintive.
              </p>

              <p className="text-xl font-bold mb-6">Partagez et prévenez-moi si vous la voyez. 06 76 56 15 87</p>

              <div className="flex space-x-4 mt-8">
                <a href="#" className="social-button" aria-label="Partager sur Facebook">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="social-button" aria-label="Partager sur Twitter">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="social-button" aria-label="Partager sur Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="social-button" aria-label="Partager">
                  <Share2 className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="fade-in">
            <form onSubmit={handleSubmit} className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Formulaire de contact</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block mb-1">
                      Nom
                    </label>
                    <Input
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="prenom" className="block mb-1">
                      Prénom
                    </label>
                    <Input
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="telephone" className="block mb-1">
                    Téléphone
                  </label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-1">
                    Message/Information
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-input min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                </Button>

                {submitMessage && <p className="text-green-400 text-center mt-4">{submitMessage}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
