"use client";

import { Suspense } from "react";
import { PresentationControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const SunModel = dynamic(() => import("@/components/sun-model"), { ssr: false });

export default function SunScene() {
  return (
    <div className="h-[400px] w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <PresentationControls
            global
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            rotation={[0, 0, 0]}
            speed={1.5}
            snap={true} // Ensure snap is a boolean
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <SunModel />
          </PresentationControls>
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}