export function Gallery() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-gray-800 mb-16">Our Journey</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-amber-200 to-yellow-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
            >
              <span className="text-white/70 text-sm">Photo {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
