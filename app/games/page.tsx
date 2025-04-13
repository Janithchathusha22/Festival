"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import OlindaGame from "@/components/games/olinda-game"
import PotBreakingGame from "@/components/games/pot-breaking-game"

export default function GamesPage() {
  return (
    <div className="bg-amber-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-800 text-center mb-4">Aurudu Krida (New Year Games)</h1>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Traditional games are an essential part of Sri Lankan New Year celebrations. Try your hand at these
          interactive versions of classic Avurudu games!
        </p>

        <Tabs defaultValue="olinda" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-amber-100">
            <TabsTrigger value="olinda" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
              Olinda Keliya
            </TabsTrigger>
            <TabsTrigger
              value="pot-breaking"
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              Kana Mutti Bideema
            </TabsTrigger>
          </TabsList>

          <TabsContent value="olinda" className="mt-6">
            <Card className="bg-white border-amber-200">
              <CardHeader className="bg-amber-100 border-b border-amber-200">
                <CardTitle className="text-2xl text-amber-800">Olinda Keliya (Board Game)</CardTitle>
                <CardDescription>
                  A traditional Sri Lankan board game similar to Mancala, played during New Year celebrations.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <OlindaGame />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pot-breaking" className="mt-6">
            <Card className="bg-white border-amber-200">
              <CardHeader className="bg-amber-100 border-b border-amber-200">
                <CardTitle className="text-2xl text-amber-800">Kana Mutti Bideema (Pot Breaking)</CardTitle>
                <CardDescription>A fun game where blindfolded players try to break a clay pot.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <PotBreakingGame />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
