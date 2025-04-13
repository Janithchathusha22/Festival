"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "./language-switcher"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Festival & Culture", href: "/festival-culture" },
    { name: "Nekath", href: "/nekath" },
    { name: "Aurudu Krida", href: "/games" },
    { name: "Avurudu Kevili", href: "/sweets" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-100 to-yellow-100 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-amber-800">අවුරුදු පුරාණය</span>
            <span className="text-lg font-medium text-amber-700">Aurudu Puranaya</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-amber-900 hover:text-amber-600 transition-colors font-medium",
                  pathname === item.href && "text-amber-600 font-bold",
                )}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Navigation Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden text-amber-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-amber-50 py-4 px-6 shadow-inner">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-amber-900 hover:text-amber-600 transition-colors font-medium py-2",
                  pathname === item.href && "text-amber-600 font-bold",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
