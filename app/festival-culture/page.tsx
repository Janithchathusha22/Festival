"use client"

import { useEffect, useRef } from "react"
// Remove Image import
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Update imports to include more icons
import { Calendar, Gift, Home, Sun, Moon, Star, Music, Heart, Book, Users, Flame, Utensils, Droplets as Oil, PartyPopper, Sparkle as Sparkles, Paintbrush } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FestivalCulture() {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll(".timeline-item")

      gsap.from(timelineItems, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      })
    }
  }, [])

  return (
    <div className="bg-amber-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-amber-800 to-amber-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 to-amber-800/70" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <Calendar className="w-16 h-16 text-white mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Festival & Culture</h1>
          <p className="text-xl text-amber-100 max-w-2xl">
            Discover the rich traditions and cultural significance of the Sinhala and Tamil New Year celebrations in Sri
            Lanka.
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Sun className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-amber-800 mb-6">The New Year Festival</h2>
            <p className="text-lg text-gray-700">
              The Sinhala and Tamil New Year, celebrated in mid-April, marks the end of the harvest season and the
              beginning of the solar new year. It's a time when families come together to observe traditional customs,
              play games, and share festive meals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Replace Image with icon */}
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl bg-amber-100 flex items-center justify-center">
              <PartyPopper className="w-32 h-32 text-amber-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-amber-800 mb-4">A Time of Renewal</h3>
              <p className="text-gray-700 mb-4">
                The New Year represents a fresh beginning, with rituals designed to bring prosperity and good fortune.
                Families clean their homes, wear new clothes, and prepare traditional foods to welcome the new year with
                positivity.
              </p>
              <p className="text-gray-700">
                Both Sinhala and Tamil communities celebrate this important cultural event, though with some variations
                in customs and traditions. The festival strengthens family bonds and community ties, as people visit
                relatives and exchange gifts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-amber-100" ref={timelineRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">New Year Rituals Timeline</h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-500 hidden md:block"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {/* Cleaning the House */}
              <div className="timeline-item flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-amber-800">Cleaning the House</h3>
                  <p className="text-gray-700">
                    Before the New Year, homes are thoroughly cleaned to remove any negativity from the previous year.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto shadow-lg">
                    <Home className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
              </div>

              {/* Lighting the Hearth */}
              <div className="timeline-item flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto shadow-lg">
                    <Flame className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-amber-800">Lighting the Hearth</h3>
                  <p className="text-gray-700">
                    The auspicious time to light the hearth and prepare milk rice, marking the beginning of cooking for
                    the New Year.
                  </p>
                </div>
              </div>

              {/* First Meal */}
              <div className="timeline-item flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-amber-800">First Meal of the Year</h3>
                  <p className="text-gray-700">
                    Family members gather to share the first meal of the New Year, typically milk rice and traditional
                    sweets.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto shadow-lg">
                    <Utensils className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
              </div>

              {/* Anointing Oil */}
              <div className="timeline-item flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto shadow-lg">
                    <Oil className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-amber-800">Anointing Oil</h3>
                  <p className="text-gray-700">
                    An elder anoints the heads of family members with herbal oil to bring good health and prosperity.
                  </p>
                </div>
              </div>

              {/* Exchanging Gifts */}
              <div className="timeline-item flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-amber-800">Exchanging Gifts</h3>
                  <p className="text-gray-700">
                    Family members exchange gifts and money to symbolize prosperity and generosity in the coming year.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto shadow-lg">
                    <Gift className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Significance Tabs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">Cultural Significance</h2>

          <Tabs defaultValue="sinhala" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-amber-100">
              <TabsTrigger value="sinhala" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                Sinhala Traditions
              </TabsTrigger>
              <TabsTrigger value="tamil" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                Tamil Traditions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sinhala" className="mt-6 bg-amber-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">Sinhala New Year (Aluth Avurudda)</h3>
              <p className="text-gray-700 mb-4">
                The Sinhala New Year celebrates the sun's movement from Pisces to Aries, marking the end of the harvest
                season. It's a time for family reunions, traditional games, and feasting on special dishes like kokis,
                kavum, and kiribath.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card className="bg-white">
                  <CardContent className="p-4 flex flex-col items-center">
                    <Utensils className="w-16 h-16 text-amber-600 my-4" />
                    <h4 className="font-bold text-amber-800 mb-2 text-center">Key Rituals</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Lighting the hearth at auspicious time</li>
                      <li>Boiling milk in a new earthen pot</li>
                      <li>Preparing kiribath (milk rice)</li>
                      <li>Ganu-denu (first financial transaction)</li>
                      <li>Visiting elders and temples</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-4 flex flex-col items-center">
                    <Users className="w-16 h-16 text-amber-600 my-4" />
                    <h4 className="font-bold text-amber-800 mb-2 text-center">Traditional Games</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Olinda Keliya (olinda board game)</li>
                      <li>Kana Mutti Bideema (pot breaking)</li>
                      <li>Kamba Adeema (tug of war)</li>
                      <li>Lissana Gaha Nageema (climbing greased pole)</li>
                      <li>Onchili Pedeema (swinging)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="tamil" className="mt-6 bg-amber-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">Tamil New Year (Puthandu)</h3>
              <p className="text-gray-700 mb-4">
                Tamil New Year, also known as Puthandu, marks the first day of the Tamil solar calendar. Families
                prepare a tray with fruits, flowers, and other auspicious items to symbolize prosperity and happiness
                for the coming year.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card className="bg-white">
                  <CardContent className="p-4 flex flex-col items-center">
                    <Sparkles className="w-16 h-16 text-amber-600 my-4" />
                    <h4 className="font-bold text-amber-800 mb-2 text-center">Key Rituals</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Kanni (viewing auspicious items first thing in the morning)</li>
                      <li>Preparing Maanga Pachadi (a special dish with six flavors)</li>
                      <li>Wearing new clothes</li>
                      <li>Visiting temples</li>
                      <li>Family gatherings and feasts</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-4 flex flex-col items-center">
                    <Paintbrush className="w-16 h-16 text-amber-600 my-4" />
                    <h4 className="font-bold text-amber-800 mb-2 text-center">Traditional Customs</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Drawing kolam (decorative patterns) at the entrance</li>
                      <li>Reading Panchanga (almanac) for the new year</li>
                      <li>Exchanging gifts and sweets</li>
                      <li>Seeking blessings from elders</li>
                      <li>Cultural performances and music</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Photo Gallery - replaced with icon cards */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">Celebrations Across Sri Lanka</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sinhala & Tamil New Year Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col items-center">
              <Calendar className="w-16 h-16 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-amber-800 text-center mb-3">Sinhala & Tamil New Year</h3>
              <p className="text-gray-700 text-center">Annual cultural celebration marking the solar new year</p>
            </div>

            {/* Vesak Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col items-center">
              <Star className="w-16 h-16 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-amber-800 text-center mb-3">Vesak Celebrations</h3>
              <p className="text-gray-700 text-center">Buddhist festival celebrating the birth, enlightenment, and passing of Buddha</p>
            </div>

            {/* Esala Perahera Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col items-center">
              <Users className="w-16 h-16 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-amber-800 text-center mb-3">Esala Perahera</h3>
              <p className="text-gray-700 text-center">Grand cultural pageant in Kandy featuring traditional dancers and elephants</p>
            </div>

            {/* Independence Day Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col items-center">
              <Sun className="w-16 h-16 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-amber-800 text-center mb-3">Independence Day</h3>
              <p className="text-gray-700 text-center">National celebration of Sri Lanka's independence</p>
            </div>

            {/* Christmas Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col items-center">
              <Gift className="w-16 h-16 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-amber-800 text-center mb-3">Christmas Celebrations</h3>
              <p className="text-gray-700 text-center">Christian festival celebrated with unique Sri Lankan traditions</p>
            </div>

            {/* Deepavali Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col items-center">
              <Moon className="w-16 h-16 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold text-amber-800 text-center mb-3">Deepavali Celebrations</h3>
              <p className="text-gray-700 text-center">Hindu festival of lights celebrated with oil lamps and sweets</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}