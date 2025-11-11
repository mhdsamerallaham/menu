'use client'

import ProductCard from './ProductCard'

export default function ClassicMenuView({ products }) {
  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-6 auto-rows-[280px]">
      {products.map((product, index) => {
        // Bento grid pattern - different sizes for visual interest
        const patterns = [
          'col-span-12 md:col-span-6 lg:col-span-4 row-span-1', // normal
          'col-span-12 md:col-span-6 lg:col-span-8 row-span-1', // wide
          'col-span-12 md:col-span-6 lg:col-span-4 row-span-2', // tall
          'col-span-12 md:col-span-6 lg:col-span-4 row-span-1', // normal
          'col-span-12 md:col-span-12 lg:col-span-8 row-span-1', // extra wide
          'col-span-12 md:col-span-6 lg:col-span-4 row-span-1', // normal
        ]

        const gridClass = patterns[index % patterns.length]

        return (
          <ProductCard
            key={product.id}
            product={product}
            gridClass={gridClass}
          />
        )
      })}
    </div>
  )
}
