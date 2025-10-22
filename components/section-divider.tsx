import Image from "next/image"

interface SectionDividerProps {
  className?: string
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`flex justify-center items-center py-2 ${className}`}>
      <div className="relative">
        <Image
          src="/images/ornament.png"
          alt="Decorative ornament"
          width={200}
          height={50}
          className=""
          priority
        />
      </div>
    </div>
  )
}