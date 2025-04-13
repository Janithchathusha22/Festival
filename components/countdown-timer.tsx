'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [mounted, setMounted] = useState(false)

  // Next New Year is April 14th of the next year
  const getNextNewYear = () => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const newYearDate = new Date(currentYear, 3, 14) // April is month 3 (0-indexed)

    // If we've already passed this year's New Year, set for next year
    if (now > newYearDate) {
      newYearDate.setFullYear(currentYear + 1)
    }

    return newYearDate
  }

  const calculateTimeLeft = () => {
    const difference = getNextNewYear().getTime() - new Date().getTime()

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl md:text-2xl font-semibold text-amber-800 mb-4">Countdown to Next New Year</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {timeUnits.map((unit) => (
          <Card key={unit.label} className="bg-amber-100 border-amber-300 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-800">
                {unit.value.toString().padStart(2, "0")}
              </div>
              <div className="text-sm md:text-base text-amber-700">{unit.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CountdownTimer