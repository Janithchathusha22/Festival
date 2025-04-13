"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import CountdownTimer from "@/components/countdown-timer"
import FirecrackerAnimation from "@/components/firecracker-animation"
import SunScene from "@/components/sun-scene"
// Add this import at the top
import newYearImage from './gm.jpg'
// Add these imports at the top with other imports
import nekathImage from './a.jpg'
import kridaImage from './krida.jpg'
import sweetsImage from './kemabima.jpg'

export default function Home() {
  const [showFireworks, setShowFireworks] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current.querySelectorAll(".animate-item"), {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      })
    }
  }, [])

  return (
    <div className="relative">
      {showFireworks && <FirecrackerAnimation onComplete={() => setShowFireworks(false)} />}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-amber-50 to-yellow-100 py-16 md:py-24" ref={headerRef}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="animate-item text-4xl md:text-6xl font-bold text-amber-800 mb-6">
            අවුරුදු පුරාණය
            <span className="block text-3xl md:text-5xl mt-2 text-amber-700">Aurudu Puranaya</span>
          </h1>
          <p className="animate-item text-xl md:text-2xl text-amber-700 mb-8 max-w-3xl mx-auto">
            Celebrating the vibrant traditions of Sinhala and Tamil New Year in Sri Lanka
          </p>

          <div className="animate-item mb-12">
            <CountdownTimer />
          </div>

          <Button
            className="animate-item bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full text-lg"
            onClick={() => setShowFireworks(true)}
          >
            Light Firecrackers! 🧨
          </Button>
        </div>
      </div>

      {/* 3D Sun Model Section */}
      <section className="py-12 bg-gradient-to-b from-yellow-100 to-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-8">The Traditional Sun of New Year</h2>
          <p className="text-lg text-center text-amber-700 mb-8 max-w-3xl mx-auto">
            In Sri Lankan tradition, the sun holds special significance during the New Year. Its movement from Pisces to
            Aries marks the beginning of the Sinhala and Tamil New Year, symbolizing renewal and prosperity.
          </p>
          <div className="max-w-2xl mx-auto bg-gradient-to-b from-amber-50/50 to-amber-100/50 p-4 rounded-lg">
            <SunScene />
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-800 mb-6">The Significance of Sinhala & Tamil New Year</h2>
              <p className="text-lg text-gray-700 mb-4">
                The Sinhala and Tamil New Year, known as Aluth Avurudda in Sinhala and Puthandu in Tamil, is one of the
                most important cultural celebrations in Sri Lanka, marking the end of the harvest season and the
                beginning of the solar new year.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This festival, celebrated by both Sinhala and Tamil communities, brings families together for
                traditional rituals, games, and feasts that have been passed down through generations.
              </p>
              <Link href="/festival-culture">
                <Button className="bg-amber-600 hover:bg-amber-700">Learn More About the Festival</Button>
              </Link>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/gm.jpg" 
                alt="Sri Lankan New Year Celebration"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">Explore New Year Traditions</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-48 relative mb-4 rounded-md overflow-hidden">
                  <Image 
                    src={nekathImage}
                    alt="Nekath Times" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">Nekath (Auspicious Times)</h3>
                <p className="text-gray-700 mb-4">
                  Discover the auspicious times for New Year rituals and their significance in Sri Lankan culture.
                </p>
                <Link href="/nekath">
                  <Button variant="outline" className="w-full border-amber-600 text-amber-700 hover:bg-amber-50">
                    View Nekath Calendar
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-48 relative mb-4 rounded-md overflow-hidden">
                  <Image
                    src={kridaImage}
                    alt="Traditional Games"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">Aurudu Krida (New Year Games)</h3>
                <p className="text-gray-700 mb-4">
                  Play interactive traditional games like Olinda Keliya and Kana Mutti Bideema.
                </p>
                <Link href="/games">
                  <Button variant="outline" className="w-full border-amber-600 text-amber-700 hover:bg-amber-50">
                    Play Traditional Games
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-48 relative mb-4 rounded-md overflow-hidden">
                  <Image
                    src={sweetsImage}
                    alt="Traditional Sweets"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">Avurudu Kevili (New Year Sweets)</h3>
                <p className="text-gray-700 mb-4">
                  Explore traditional Sri Lankan sweets and dishes prepared for the New Year celebrations.
                </p>
                <Link href="/sweets">
                  <Button variant="outline" className="w-full border-amber-600 text-amber-700 hover:bg-amber-50">
                    Discover Traditional Recipes
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
