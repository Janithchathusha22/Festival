import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-amber-800 text-amber-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">අවුරුදු පුරාණය</h3>
            <p className="mb-4">Celebrating the rich traditions of Sinhala and Tamil New Year in Sri Lanka.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/festival-culture" className="hover:text-white transition-colors">
                  Festival & Culture
                </Link>
              </li>
              <li>
                <Link href="/nekath" className="hover:text-white transition-colors">
                  Nekath (Auspicious Times)
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-white transition-colors">
                  Aurudu Krida (New Year Games)
                </Link>
              </li>
              <li>
                <Link href="/sweets" className="hover:text-white transition-colors">
                  Avurudu Kevili (New Year Sweets)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="mb-2">info@aurudupuranaya.com</p>
            <p className="mb-4">Colombo, Sri Lanka</p>
            <p className="text-sm mt-8">
              © {new Date().getFullYear()} Aurudu Puranaya. All rights reserved.
              <br />
              <span className="mt-2 block">Developed by Janith Chathusha</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
