"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

const KokkisModel = () => {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  // A simplified 3D model of Kokkis (traditional Sri Lankan sweet)
  return (
    <group>
      {/* Main body of the kokkis */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        <torusGeometry args={[1.5, 0.4, 16, 50]} />
        <meshStandardMaterial color="#D4A76A" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Decorative patterns */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[1.5 * Math.cos((i * Math.PI) / 4), 1.5 * Math.sin((i * Math.PI) / 4), 0]}
          rotation={[0, 0, (i * Math.PI) / 4]}
          scale={[0.2, 0.6, 0.1]}
          castShadow
        >
          <boxGeometry />
          <meshStandardMaterial color="#C69456" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

export default KokkisModel
