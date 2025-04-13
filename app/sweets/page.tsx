"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Search, Share2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import dynamic from 'next/dynamic'

const SweetModel = dynamic(() => import('@/components/sweets/sweet-model'), {
  ssr: false,
  loading: () => <div className="h-80 bg-amber-100 animate-pulse rounded-lg" />
})

// Traditional sweets data
// At the top of the file, add this import
import kokisImage from "../kokis.png"

// Add this import near the top of the file
import keumImage from "../keum4.jpg"

// Add this import with the other image imports
import kiribathImage from "../kiribath.jpg"

// Add this import with other image imports
import aluwaImage from "../aluwa2.jpg"

// Add this import with other image imports
import mungKavumImage from "../mukeum.jpg"
// Update asmi image import
import asmiImage from "../asmi9.jpg"

const traditionalSweets = [
  {
    id: "kokkis",
    name: "Kokkis",
    sinhalaName: "කොකිස්",
    description: "A crispy, deep-fried sweet made from rice flour and coconut milk, shaped using a special mold.",
    ingredients: [
      "2 cups rice flour",
      "1 cup coconut milk",
      "1/2 cup sugar",
      "1/4 teaspoon salt",
      "Oil for deep frying",
    ],
    instructions: [
      "Mix rice flour, sugar, and salt in a bowl.",
      "Gradually add coconut milk while stirring to form a thick batter.",
      "Heat oil in a deep pan.",
      "Dip the kokkis mold in the hot oil, then in the batter, and back into the hot oil.",
      "Fry until golden brown and crispy.",
      "Remove from oil and drain on paper towels.",
      "Allow to cool before serving.",
    ],
    image: kokisImage,
    has3D: true,
  },
  {
    id: "kavum",
    name: "Kavum",
    sinhalaName: "කැවුම්",
    description: "A traditional oil cake made from rice flour, treacle, and coconut milk, with a distinctive shape.",
    ingredients: [
      "2 cups rice flour",
      "1 cup coconut milk",
      "1 cup treacle or jaggery",
      "1/4 teaspoon salt",
      "Oil for deep frying",
    ],
    instructions: [
      "Mix rice flour and salt in a bowl.",
      "Heat treacle until it becomes liquid, then mix with coconut milk.",
      "Pour the liquid mixture into the flour and mix well to form a thick batter.",
      "Heat oil in a deep pan.",
      "Drop spoonfuls of batter into the hot oil and fry until golden brown.",
      "Remove from oil and drain on paper towels.",
      "Allow to cool before serving.",
    ],
    image: keumImage,
    has3D: false,
  },
  {
    id: "kiribath",
    name: "Kiribath",
    sinhalaName: "කිරිබත්",
    description:
      "Milk rice is a traditional Sri Lankan dish made with rice cooked in coconut milk, often served during special occasions.",
    ingredients: ["2 cups white rice", "2 cups coconut milk", "1 cup water", "1 teaspoon salt"],
    instructions: [
      "Wash rice thoroughly and drain.",
      "Add water and salt, and cook rice until water is absorbed.",
      "Add coconut milk and stir well.",
      "Cook on low heat until the coconut milk is absorbed and the rice is creamy.",
      "Transfer to a flat dish and flatten the surface.",
      "Allow to cool slightly, then cut into diamond-shaped pieces.",
      "Serve with lunu miris (onion sambol) or jaggery.",
    ],
    image: kiribathImage,
    has3D: false,
  },
  {
    id: "aluwa",
    name: "Aluwa",
    sinhalaName: "අලුවා",
    description: "A sweet, dense confection made from rice flour, cashews, and jaggery or treacle.",
    ingredients: [
      "2 cups rice flour",
      "1 cup jaggery or treacle",
      "1/2 cup chopped cashews",
      "1/4 cup ghee",
      "1/4 teaspoon cardamom powder",
    ],
    instructions: [
      "Roast rice flour in a pan until it turns light brown and gives off a nutty aroma.",
      "Melt jaggery with 1/4 cup water to make a thick syrup.",
      "Mix the roasted rice flour with the jaggery syrup, ghee, cashews, and cardamom.",
      "Transfer the mixture to a greased tray and flatten it evenly.",
      "Allow it to cool and set for a few hours.",
      "Cut into squares or diamond shapes before serving.",
    ],
    image: aluwaImage,
    has3D: false,
  },
  {
    id: "mung-kavum",
    name: "Mung Kavum",
    sinhalaName: "මුං කැවුම්",
    description: "A sweet made from mung beans, rice flour, and jaggery, with a distinctive shape and texture.",
    ingredients: [
      "1 cup mung beans",
      "1 cup rice flour",
      "1 cup jaggery",
      "1/2 cup coconut milk",
      "1/4 teaspoon salt",
      "Oil for deep frying",
    ],
    instructions: [
      "Soak mung beans for 4-6 hours, then drain and grind to a paste.",
      "Mix rice flour, salt, and mung bean paste in a bowl.",
      "Heat jaggery until liquid, then mix with coconut milk.",
      "Add the liquid mixture to the flour mixture and form a dough.",
      "Shape into small balls and flatten slightly.",
      "Deep fry until golden brown.",
      "Remove from oil and drain on paper towels.",
    ],
    image: mungKavumImage,
    has3D: false,
  },
  {
    id: "asmi",
    name: "Asmi",
    sinhalaName: "අස්මි",
    description: "A sweet made from rice flour, coconut, and jaggery, with a distinctive texture and flavor.",
    ingredients: [
      "2 cups rice flour",
      "1 cup grated coconut",
      "1 cup jaggery",
      "1/4 teaspoon salt",
      "1/4 teaspoon cardamom powder",
    ],
    instructions: [
      "Roast rice flour until it turns light brown.",
      "Melt jaggery with 1/4 cup water to make a syrup.",
      "Mix roasted rice flour, grated coconut, jaggery syrup, salt, and cardamom.",
      "Form the mixture into small balls.",
      "Allow to cool and set before serving.",
    ],
    image: asmiImage,
    has3D: false,
  },
]

export default function SweetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSweet, setSelectedSweet] = useState(traditionalSweets[0])
  const [view, setView] = useState<"gallery" | "detail">("gallery")

  const filteredSweets = traditionalSweets.filter(
    (sweet) =>
      sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sweet.sinhalaName.includes(searchTerm) ||
      sweet.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSweetSelect = (sweet: (typeof traditionalSweets)[0]) => {
    setSelectedSweet(sweet)
    setView("detail")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${selectedSweet.name} (${selectedSweet.sinhalaName}) - Avurudu Kevili`,
          text: `Check out this traditional Sri Lankan sweet: ${selectedSweet.name}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      alert(`Share this recipe: ${window.location.href}`)
    }
  }

  return (
    <div className="bg-amber-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-800 text-center mb-4">Avurudu Kevili (New Year Sweets)</h1>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Explore traditional Sri Lankan sweets and dishes prepared for the New Year celebrations. These recipes have
          been passed down through generations and are an essential part of the festivities.
        </p>

        {view === "gallery" ? (
          <>
            <div className="mb-8 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search for sweets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-amber-300 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSweets.map((sweet) => (
                <Card
                  key={sweet.id}
                  className="bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleSweetSelect(sweet)}
                >
                  <div className="h-48 relative">
                    <Image
                      src={sweet.image || "/placeholder.svg"}
                      alt={sweet.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-amber-800 mb-1">{sweet.name}</h3>
                    <h4 className="text-lg text-amber-700 mb-2">{sweet.sinhalaName}</h4>
                    <p className="text-gray-700 line-clamp-3">{sweet.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              className="mb-6 border-amber-600 text-amber-700 hover:bg-amber-50"
              onClick={() => setView("gallery")}
            >
              ← Back to Gallery
            </Button>

            <Card className="bg-white border-amber-200">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {selectedSweet.has3D ? (
                    <div className="h-80 relative">
                      <SweetModel sweetId={selectedSweet.id} />
                    </div>
                  ) : (
                    <div className="h-80 relative">
                      <Image
                        src={selectedSweet.image || "/placeholder.svg"}
                        alt={selectedSweet.name}
                        fill
                        className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                      />
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-amber-800 mb-1">{selectedSweet.name}</h2>
                      <h3 className="text-xl text-amber-700 mb-4">{selectedSweet.sinhalaName}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleShare}
                      className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                    >
                      <Share2 size={20} />
                    </Button>
                  </div>
                  <p className="text-gray-700 mb-6">{selectedSweet.description}</p>

                  <Tabs defaultValue="ingredients">
                    <TabsList className="grid w-full grid-cols-2 bg-amber-100">
                      <TabsTrigger
                        value="ingredients"
                        className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                      >
                        Ingredients
                      </TabsTrigger>
                      <TabsTrigger
                        value="instructions"
                        className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                      >
                        Instructions
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="ingredients" className="mt-4">
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedSweet.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-gray-700">
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="instructions" className="mt-4">
                      <ol className="list-decimal pl-5 space-y-2">
                        {selectedSweet.instructions.map((step, index) => (
                          <li key={index} className="text-gray-700">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
