"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import type * as THREE from "three"

export default function SunModel() {
  const sunRef = useRef<THREE.Mesh>(null)
  const coronaRef = useRef<THREE.Mesh>(null)
  const raysRef = useRef<THREE.Group>(null)

  // GSAP animation setup
  useGSAP(() => {
    if (sunRef.current) {
      // Pulsating animation
      gsap.to(sunRef.current.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })
    }

    if (coronaRef.current) {
      // Corona rotation
      gsap.to(coronaRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none",
      })
    }

    if (raysRef.current) {
      // Rays rotation
      gsap.to(raysRef.current.rotation, {
        z: Math.PI * 2,
        duration: 30,
        repeat: -1,
        ease: "none",
      })
    }
  }, [])

  // Continuous rotation
  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group>
      {/* Main sun sphere */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FD7813"
          emissiveIntensity={0.8}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Inner glow */}
      <mesh scale={0.95}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#FFCC33"
          emissive="#FF9933"
          emissiveIntensity={1}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Sun texture details */}
      <mesh scale={1.01} rotation={[0, Math.PI / 4, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FD7813"
          emissiveIntensity={0.5}
          roughness={1}
          metalness={0}
          wireframe={true}
          transparent={true}
          opacity={0.2}
        />
      </mesh>

      {/* Sun corona/rays */}
      <mesh ref={coronaRef} scale={1.3}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FD7813"
          emissiveIntensity={0.8}
          transparent={true}
          opacity={0.6}
        />
      </mesh>

      {/* Additional corona rings at different angles */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.4}>
        <torusGeometry args={[1, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FD7813"
          emissiveIntensity={0.8}
          transparent={true}
          opacity={0.4}
        />
      </mesh>

      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={1.2}>
        <torusGeometry args={[1, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FD7813"
          emissiveIntensity={0.8}
          transparent={true}
          opacity={0.5}
        />
      </mesh>

      {/* Traditional sun rays */}
      <group ref={raysRef}>
        {[...Array(16)].map((_, i) => (
          <mesh
            key={i}
            position={[Math.cos((i * Math.PI) / 8) * 1.5, Math.sin((i * Math.PI) / 8) * 1.5, 0]}
            rotation={[0, 0, (i * Math.PI) / 8]}
            scale={[0.6, 0.08, 0.08]}
          >
            <boxGeometry />
            <meshStandardMaterial
              color="#FFCC33"
              emissive="#FF9933"
              emissiveIntensity={1}
              transparent={true}
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Traditional decorative elements - small spheres at ray tips */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`sphere-${i}`} position={[Math.cos((i * Math.PI) / 4) * 1.8, Math.sin((i * Math.PI) / 4) * 1.8, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#FFCC33" emissive="#FF9933" emissiveIntensity={1} />
        </mesh>
      ))}

      {/* Point light inside the sun */}
      <pointLight color="#FDB813" intensity={2} distance={10} />
    </group>
  )
}
