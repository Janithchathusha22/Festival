"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { gsap } from "gsap"

// Define pot types and their probabilities
const POT_TYPES = [
  { type: "grand", label: "Grand Prize!", points: 100, probability: 0.1 },
  { type: "medium", label: "Medium Prize!", points: 50, probability: 0.2 },
  { type: "small", label: "Small Prize!", points: 25, probability: 0.3 },
  { type: "empty", label: "Empty Pot", points: 0, probability: 0.4 },
]

interface Pot {
  id: number
  type: string
  label: string
  points: number
  broken: boolean
}

const PotBreakingGame = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [pots, setPots] = useState<Pot[]>([])
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [maxAttempts, setMaxAttempts] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [message, setMessage] = useState("")
  const [level, setLevel] = useState(1)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize the game
  const startGame = () => {
    // Determine number of pots based on level
    const numPots = 6 + (level - 1) * 3

    // Create pots with random types based on probabilities
    const newPots: Pot[] = []
    for (let i = 0; i < numPots; i++) {
      const random = Math.random()
      let cumulativeProbability = 0
      let selectedType = POT_TYPES[POT_TYPES.length - 1] // Default to last type (empty)

      for (const potType of POT_TYPES) {
        cumulativeProbability += potType.probability
        if (random <= cumulativeProbability) {
          selectedType = potType
          break
        }
      }

      newPots.push({
        id: i,
        type: selectedType.type,
        label: selectedType.label,
        points: selectedType.points,
        broken: false,
      })
    }

    // Shuffle the pots
    const shuffledPots = [...newPots].sort(() => Math.random() - 0.5)

    setPots(shuffledPots)
    setScore(0)
    setAttempts(0)
    setMaxAttempts(3)
    setGameOver(false)
    setMessage("Select a pot to break!")
    setGameStarted(true)
  }

  // Play sound effect
  const playSound = (soundType: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const audio = new Audio()

    switch (soundType) {
      case "break":
        audio.src = "/pot-break.mp3" // This would be a real sound file in production
        break
      case "win":
        audio.src = "/win-sound.mp3" // This would be a real sound file in production
        break
      case "empty":
        audio.src = "/empty-sound.mp3" // This would be a real sound file in production
        break
      case "gameover":
        audio.src = "/game-over.mp3" // This would be a real sound file in production
        break
      default:
        return
    }

    audio.volume = 0.5
    audio.play().catch((e) => console.log("Audio play failed:", e))
    audioRef.current = audio
  }

  // Handle pot click
  const handlePotClick = (potId: number) => {
    if (gameOver) return

    // Find the selected pot
    const selectedPotIndex = pots.findIndex((pot) => pot.id === potId)
    if (selectedPotIndex === -1 || pots[selectedPotIndex].broken) return

    // Update attempts
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    // Create a copy of pots and mark the selected one as broken
    const newPots = [...pots]
    newPots[selectedPotIndex].broken = true
    setPots(newPots)

    // Get the selected pot
    const selectedPot = newPots[selectedPotIndex]

    // Animate the pot breaking
    const potElement = document.getElementById(`pot-${potId}`)
    if (potElement) {
      gsap.to(potElement, {
        scale: 1.2,
        opacity: 0.7,
        duration: 0.2,
        onComplete: () => {
          gsap.to(potElement, {
            scale: 0,
            opacity: 0,
            rotation: Math.random() > 0.5 ? 45 : -45,
            duration: 0.3,
          })
        },
      })
    }

    // Update score and message based on pot type
    if (selectedPot.points > 0) {
      const newScore = score + selectedPot.points
      setScore(newScore)
      setMessage(`You found ${selectedPot.label} +${selectedPot.points} points!`)
      playSound(selectedPot.points >= 50 ? "win" : "break")

      // Show confetti animation for prizes
      if (selectedPot.points >= 50) {
        showConfetti()
      }
    } else {
      setMessage("Empty pot! Try again.")
      playSound("empty")
    }

    // Check if game is over
    if (newAttempts >= maxAttempts) {
      setGameOver(true)
      setMessage(`Game Over! Your final score: ${score + (selectedPot.points > 0 ? selectedPot.points : 0)}`)
      playSound("gameover")
    }
  }

  // Show confetti animation
  const showConfetti = () => {
    if (!gameAreaRef.current) return

    const gameArea = gameAreaRef.current
    const gameRect = gameArea.getBoundingClientRect()

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div")
      confetti.className = "absolute w-2 h-2 rounded-full"
      confetti.style.backgroundColor = ["#FF4500", "#FFD700", "#FF6347", "#FFA500", "#FF8C00", "#4CAF50", "#2196F3"][
        Math.floor(Math.random() * 7)
      ]
      confetti.style.left = `${Math.random() * gameRect.width}px`
      confetti.style.top = `${Math.random() * gameRect.height}px`
      gameArea.appendChild(confetti)

      gsap.to(confetti, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        duration: 1 + Math.random(),
        ease: "power2.out",
        onComplete: () => {
          gameArea.removeChild(confetti)
        },
      })
    }
  }

  // Move to next level
  const nextLevel = () => {
    setLevel(level + 1)
    startGame()
  }

  return (
    <div className="flex flex-col items-center">
      {showRules ? (
        <div className="mb-8 w-full max-w-3xl">
          <Alert className="bg-amber-100 border-amber-300">
            <AlertCircle className="h-4 w-4 text-amber-800" />
            <AlertTitle className="text-amber-800">How to Play Kana Mutti Bideema (Pot Breaking)</AlertTitle>
            <AlertDescription className="text-gray-700">
              <ol className="list-decimal pl-5 space-y-2 mt-2">
                <li>In this game, you need to break clay pots to find prizes.</li>
                <li>Click on a pot to break it and see what's inside.</li>
                <li>Some pots contain prizes (small, medium, or grand) while others are empty.</li>
                <li>You have a limited number of attempts per level.</li>
                <li>Try to score as many points as possible!</li>
                <li>Complete a level to move to the next one with more pots and challenges.</li>
              </ol>
            </AlertDescription>
          </Alert>
          <Button onClick={() => setShowRules(false)} className="mt-4 bg-amber-600 hover:bg-amber-700">
            Hide Rules
          </Button>
        </div>
      ) : (
        <Button onClick={() => setShowRules(true)} className="mb-8 bg-amber-600 hover:bg-amber-700">
          Show Rules
        </Button>
      )}

      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-amber-800">{gameStarted ? message : "Ready to play?"}</h3>
        {gameStarted && (
          <div className="flex justify-center gap-8 mt-2">
            <div className="px-4 py-2 rounded-md bg-amber-100">Level: {level}</div>
            <div className="px-4 py-2 rounded-md bg-amber-100">Score: {score}</div>
            <div className="px-4 py-2 rounded-md bg-amber-100">
              Attempts: {attempts}/{maxAttempts}
            </div>
          </div>
        )}
      </div>

      <div ref={gameAreaRef} className="relative w-full max-w-4xl bg-amber-100 rounded-xl p-6 shadow-md min-h-[400px]">
        {gameStarted ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
            {pots.map((pot) => (
              <div
                key={pot.id}
                id={`pot-${pot.id}`}
                className={`relative cursor-pointer transition-transform hover:scale-105 ${
                  pot.broken ? "opacity-0" : "opacity-100"
                }`}
                onClick={() => handlePotClick(pot.id)}
              >
                <div className="w-20 h-24 mx-auto">
                  <div className="w-16 h-16 bg-amber-700 rounded-b-full mx-auto"></div>
                  <div className="w-20 h-4 bg-amber-800 rounded-full -mt-2 mx-auto"></div>
                </div>
                {pot.broken && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className={`text-sm font-bold ${pot.points > 0 ? "text-amber-600" : "text-gray-600"}`}>
                      {pot.label}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">Kana Mutti Bideema</h3>
              <p className="text-amber-700 mb-6">Break the clay pots to find prizes!</p>
              <Button onClick={startGame} className="bg-amber-600 hover:bg-amber-700">
                Start Game
              </Button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
            <Card className="w-80 bg-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-amber-800 mb-2">Game Over!</h3>
                <p className="text-gray-700 mb-4">
                  You scored {score} points at Level {level}!
                </p>
                <div className="flex flex-col space-y-3">
                  <Button onClick={startGame} className="bg-amber-600 hover:bg-amber-700 w-full">
                    Play Again (Same Level)
                  </Button>
                  <Button onClick={nextLevel} className="bg-amber-700 hover:bg-amber-800 w-full">
                    Next Level
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-700 mb-4">Click on the pots to break them and discover what's inside!</p>
        {!gameStarted && (
          <Button onClick={startGame} className="bg-amber-600 hover:bg-amber-700">
            Start Game
          </Button>
        )}
      </div>
    </div>
  )
}

export default PotBreakingGame
