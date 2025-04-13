"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface FirecrackerAnimationProps {
  onComplete: () => void
}

const FirecrackerAnimation = ({ onComplete }: FirecrackerAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    // Play firecracker sound
    const audio = new Audio()
    audio.src = "/firecracker-sound.mp3" // This would be a real sound file in production
    audio.volume = 0.5
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Create fireworks
    const createFirework = (x: number, y: number, color: string) => {
      const firework = document.createElement("div")
      firework.className = "absolute rounded-full"
      firework.style.width = "4px"
      firework.style.height = "4px"
      firework.style.backgroundColor = color
      firework.style.left = `${x}px`
      firework.style.top = `${y}px`
      container.appendChild(firework)

      // Animate particles
      const angle = Math.random() * Math.PI * 2
      const distance = 50 + Math.random() * 100
      const destX = x + Math.cos(angle) * distance
      const destY = y + Math.sin(angle) * distance

      gsap.to(firework, {
        left: destX,
        top: destY,
        opacity: 0,
        duration: 0.8 + Math.random() * 0.6,
        ease: "power2.out",
        onComplete: () => {
          container.removeChild(firework)
        },
      })
    }

    // Create multiple fireworks at random positions
    const createFireworks = () => {
      const colors = ["#FF4500", "#FFD700", "#FF6347", "#FFA500", "#FF8C00"]
      const x = Math.random() * width
      const y = height - 100 - Math.random() * 300

      const color = colors[Math.floor(Math.random() * colors.length)]

      // Create multiple particles for each firework
      for (let i = 0; i < 30; i++) {
        createFirework(x, y, color)
      }
    }

    // Create fireworks at intervals
    const interval = setInterval(createFireworks, 300)

    // Stop after 5 seconds
    setTimeout(() => {
      clearInterval(interval)
      audio.pause()

      // Wait for animations to finish
      setTimeout(() => {
        onComplete()
      }, 1000)
    }, 5000)

    return () => {
      clearInterval(interval)
      audio.pause()
    }
  }, [onComplete])

  return <div ref={containerRef} className="fixed inset-0 z-50 pointer-events-none" aria-hidden="true" />
}

export default FirecrackerAnimation
