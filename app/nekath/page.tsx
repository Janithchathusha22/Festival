"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { zodiacSigns } from "@/lib/zodiac-data"
import { Loader2 } from "lucide-react"

// Define the type for auspicious times
interface AuspiciousTime {
  activity: string;
  sinhalaName: string;
  time: string;
  description: string;
}

export default function NekathPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [birthDate, setBirthDate] = useState<string>("")
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null)
  const [auspiciousTimes, setAuspiciousTimes] = useState<AuspiciousTime[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch auspicious times data
  useEffect(() => {
    const fetchAuspiciousTimes = async () => {
      setLoading(true)
      try {
        // In a real app, you would fetch from an actual API
        // For now, we'll simulate an API call with a timeout
        setTimeout(() => {
          const mockApiData: AuspiciousTime[] = [
            {
              activity: "New Year Begins",
              sinhalaName: "අලුත් අවුරුදු උදාව",
              time: "April 14, 2025 at 2:43 PM",
              description: "The auspicious time when the sun moves from Pisces to Aries, marking the beginning of the Sinhala and Tamil New Year."
            },
            {
              activity: "Fire Lighting",
              sinhalaName: "ලිප් ගිනි තැබීම",
              time: "April 14, 2025 at 6:17 PM",
              description: "The auspicious time to light the hearth for the first time in the New Year, symbolizing prosperity and abundance."
            },
            {
              activity: "Cooking First Meal",
              sinhalaName: "අලුත් සහල් උයන්න",
              time: "April 14, 2025 at 7:05 PM",
              description: "The auspicious time to cook the first meal of the New Year, typically milk rice (kiribath)."
            },
            {
              activity: "First Meal",
              sinhalaName: "ආහාර අනුභවය",
              time: "April 15, 2025 at 7:40 AM",
              description: "The auspicious time to eat the first meal of the New Year, usually facing a specific direction determined by astrologers."
            },
            {
              activity: "Work Commencement",
              sinhalaName: "වැඩ ඇල්ලීම",
              time: "April 15, 2025 at 8:12 AM",
              description: "The auspicious time to begin work for the New Year, symbolizing prosperity in one's profession or business."
            },
            {
              activity: "Anointing Oil",
              sinhalaName: "හිසතෙල් ගෑම",
              time: "April 16, 2025 at 10:35 AM",
              description: "The auspicious time for the oil-anointing ceremony, which is believed to promote good health throughout the year."
            },
            {
              activity: "First Transaction",
              sinhalaName: "ගනුදෙනු කිරීම",
              time: "April 15, 2025 at 11:20 AM",
              description: "The auspicious time to engage in the first monetary transaction of the New Year, believed to bring financial prosperity."
            },
            {
              activity: "Leaving for Work",
              sinhalaName: "පිටත්ව යාම",
              time: "April 15, 2025 at 9:30 AM",
              description: "The auspicious time to leave home for work or travel in the New Year."
            },
            {
              activity: "Planting Trees",
              sinhalaName: "ගස් සිටුවීම",
              time: "April 15, 2025 at 3:15 PM",
              description: "The auspicious time to plant trees or begin agricultural activities in the New Year."
            },
            {
              activity: "Exchange of Gifts",
              sinhalaName: "තෑගි හුවමාරුව",
              time: "April 15, 2025 at 4:45 PM",
              description: "The auspicious time to exchange gifts with family members and loved ones."
            }
          ];
          
          setAuspiciousTimes(mockApiData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching auspicious times:", error);
        setLoading(false);
      }
    };

    fetchAuspiciousTimes();
  }, []);

  // Get zodiac sign based on birth date
  const getZodiacSign = (dateString: string) => {
    if (!dateString) return null

    try {
      const date = new Date(dateString)
      const month = date.getMonth() + 1 // JavaScript months are 0-indexed
      const day = date.getDate()

      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"
      if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"
      if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"
      if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"
      if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
      if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
      if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"
      if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio"
      if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius"
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn"
      if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius"
      if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces"

      return null
    } catch (error) {
      return null
    }
  }

  const handleBirthDateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sign = getZodiacSign(birthDate)
    setSelectedZodiac(sign)
  }

  return (
    <div className="bg-amber-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-800 text-center mb-8">Nekath (Auspicious Times)</h1>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
          In Sri Lankan culture, auspicious times (Nekath) are considered important for beginning new activities.
          Explore the auspicious times for New Year rituals and discover your zodiac sign.
        </p>

        <Tabs defaultValue="auspicious-times" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-amber-100">
            <TabsTrigger
              value="auspicious-times"
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              Auspicious Times
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
              Nekath Calendar
            </TabsTrigger>
            <TabsTrigger value="zodiac" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
              Zodiac Signs
            </TabsTrigger>
          </TabsList>

          {/* Auspicious Times Tab */}
          <TabsContent value="auspicious-times" className="mt-6">
            <Card className="bg-white border-amber-200">
              <CardHeader className="bg-amber-100 border-b border-amber-200">
                <CardTitle className="text-2xl text-amber-800">New Year Auspicious Times (නැකත්)</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                    <span className="ml-2 text-amber-800">Loading auspicious times...</span>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-6">
                      {auspiciousTimes.map((item) => (
                        <div key={item.activity} className="flex flex-col p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="flex items-start">
                            <div className="w-3 h-3 rounded-full bg-amber-600 mt-2 mr-3"></div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <h3 className="font-bold text-amber-800 text-lg">{item.activity}</h3>
                                <p className="text-amber-700 font-medium">{item.time}</p>
                              </div>
                              <h4 className="text-amber-600 font-medium mt-1">{item.sinhalaName}</h4>
                              <p className="text-gray-700 mt-2">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-amber-100 rounded-lg">
                      <h3 className="font-bold text-amber-800 mb-2">About Nekath Times (නැකත් වේලාවන් ගැන)</h3>
                      <p className="text-gray-700">
                        Nekath times are determined by astrologers based on planetary positions and are considered
                        auspicious moments to begin important activities. Following these times is believed to bring
                        prosperity and good fortune for the coming year.
                      </p>
                      <p className="text-gray-700 mt-2">
                        The Sinhala and Tamil New Year marks the sun's transit from Pisces to Aries. The specific times for 
                        various activities are calculated by astrologers based on astronomical observations and ancient traditions.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="mt-6">
            <Card className="bg-white border-amber-200">
              <CardHeader className="bg-amber-100 border-b border-amber-200">
                <CardTitle className="text-2xl text-amber-800">Nekath Calendar</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border border-amber-200"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-800 mb-4">
                      {date
                        ? date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                        : "Select a date"}
                    </h3>

                    {date && (
                      <div className="space-y-4">
                        <div className="p-4 bg-amber-50 rounded-lg">
                          <h4 className="font-bold text-amber-700 mb-2">Auspicious Activities</h4>
                          <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            <li>Travel: 10:30 AM - 12:15 PM</li>
                            <li>Business Meetings: 2:45 PM - 4:30 PM</li>
                            <li>Signing Contracts: 9:15 AM - 10:45 AM</li>
                            <li>Medical Treatments: 8:00 AM - 9:30 AM</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-lg">
                          <h4 className="font-bold text-amber-700 mb-2">Inauspicious Times</h4>
                          <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            <li>Rahu Kala: 1:30 PM - 3:00 PM</li>
                            <li>Yama Ganda: 10:30 AM - 12:00 PM</li>
                            <li>Guli Kala: 7:30 AM - 9:00 AM</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Zodiac Tab */}
          <TabsContent value="zodiac" className="mt-6">
            <Card className="bg-white border-amber-200">
              <CardHeader className="bg-amber-100 border-b border-amber-200">
                <CardTitle className="text-2xl text-amber-800">Zodiac Signs</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-amber-800 mb-4">Find Your Zodiac Sign</h3>
                    <form onSubmit={handleBirthDateSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="birthdate">Enter your birth date:</Label>
                        <Input
                          id="birthdate"
                          type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="border-amber-300 focus:border-amber-500"
                          required
                        />
                      </div>
                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                        Find My Sign
                      </Button>
                    </form>

                    {selectedZodiac && (
                      <div className="mt-6 p-4 bg-amber-100 rounded-lg">
                        <h4 className="font-bold text-amber-800 mb-2">Your Zodiac Sign</h4>
                        <p className="text-lg text-amber-700">{selectedZodiac}</p>
                        <p className="mt-2 text-gray-700">
                          {zodiacSigns.find((sign) => sign.name === selectedZodiac)?.description ||
                            "Information about your zodiac sign will appear here."}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-amber-800 mb-4">Zodiac Signs</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {zodiacSigns.map((sign) => (
                        <Button
                          key={sign.name}
                          variant="outline"
                          className={`border-amber-300 hover:bg-amber-100 ${
                            selectedZodiac === sign.name ? "bg-amber-200 border-amber-500" : ""
                          }`}
                          onClick={() => setSelectedZodiac(sign.name)}
                        >
                          {sign.name}
                        </Button>
                      ))}
                    </div>

                    {selectedZodiac && (
                      <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                        <h4 className="font-bold text-amber-800 mb-2">
                          {selectedZodiac} ({zodiacSigns.find((sign) => sign.name === selectedZodiac)?.sinhalaName})
                        </h4>
                        <p className="text-gray-700 mb-2">
                          <strong>Dates:</strong> {zodiacSigns.find((sign) => sign.name === selectedZodiac)?.dates}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Element:</strong> {zodiacSigns.find((sign) => sign.name === selectedZodiac)?.element}
                        </p>
                        <p className="text-gray-700">
                          <strong>Lucky Color:</strong>{" "}
                          {zodiacSigns.find((sign) => sign.name === selectedZodiac)?.luckyColor}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
