"use client"

export default function SweetModel({ sweetId }: { sweetId: string }) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-amber-100 rounded-lg">
      <p className="text-amber-800 text-center p-4">
        3D model for {sweetId} is currently being prepared.
        <br />
        Check back soon!
      </p>
    </div>
  )
}
