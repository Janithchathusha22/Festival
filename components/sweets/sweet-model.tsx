"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls } from "@react-three/drei"
import KokkisModel from "@/components/sweets/kokkis-model"

interface SweetModelProps {
  sweetId: string
}

const SweetModel = ({ sweetId }: SweetModelProps) => {
  return (
    <Suspense
      fallback={<div className="h-full w-full bg-amber-100 flex items-center justify-center">Loading 3D model...</div>}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          {sweetId === "kokkis" && <KokkisModel />}
          {/* Add other models here based on sweetId */}
        </PresentationControls>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </Suspense>
  )
}

export default SweetModel
