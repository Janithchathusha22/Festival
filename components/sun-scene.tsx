"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Stars } from "@react-three/drei"
import SunModel from "./sun-model"

export default function SunScene() {
  return (
    <div className="w-full h-80 md:h-96 relative">
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading Sun...</div>}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          {/* Simple gradient background instead of HDR environment */}
          <color attach="background" args={["#fef3c7"]} /> {/* Light amber color */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#ffedd5" />
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <SunModel />
          </PresentationControls>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </Suspense>
      <div className="absolute bottom-0 left-0 right-0 text-center text-amber-800 bg-amber-50/70 py-2 rounded-b-lg">
        ✨ Interact with the traditional sun by dragging to rotate ✨
      </div>
    </div>
  )
}
