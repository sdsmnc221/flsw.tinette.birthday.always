"use client"

import { useEffect, useState } from "react"

export default function PawPrints() {
  const [pawPrints, setPawPrints] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only create paw prints occasionally
      if (Math.random() > 0.05) return

      const newPawPrint = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }

      setPawPrints((prev) => [...prev, newPawPrint])

      // Remove paw print after animation
      setTimeout(() => {
        setPawPrints((prev) => prev.filter((paw) => paw.id !== newPawPrint.id))
      }, 2000)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      {pawPrints.map((paw) => (
        <div
          key={paw.id}
          className="paw-print"
          style={{
            left: `${paw.x}px`,
            top: `${paw.y}px`,
            animation: "fadeOut 2s forwards",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fadeOut {
          0% { opacity: 0; transform: scale(0.5); }
          20% { opacity: 0.8; transform: scale(1); }
          80% { opacity: 0.8; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  )
}
