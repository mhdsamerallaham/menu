'use client'

import { useState } from 'react'
import Image from 'next/image'
import ProductModal from './ProductModal'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'

export default function ProductCard({ product, gridClass }) {
  const [showModal, setShowModal] = useState(false)
  const { currentLanguage } = useLanguage()
  const { addToCart } = useCart()

  const productName = product.translations?.[currentLanguage]?.name || product.name || ''
  const productDescription = product.translations?.[currentLanguage]?.description || product.description || ''

  const translations = {
    tr: {
      details: 'Detayları Gör',
      addToCart: 'Sepete Ekle',
      outOfStock: 'Stokta Yok',
      addedToCart: '✅ Ürün sepete eklendi!'
    },
    en: {
      details: 'View Details',
      addToCart: 'Add to Cart',
      outOfStock: 'Out of Stock',
      addedToCart: '✅ Product added to cart!'
    },
    ar: {
      details: 'عرض التفاصيل',
      addToCart: 'أضف إلى السلة',
      outOfStock: 'إنتهى من المخزن',
      addedToCart: '✅ تمت إضافة المنتج إلى السلة!'
    }
  }

  const t = translations[currentLanguage] || translations.tr

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product, 1)
    alert(t.addedToCart)
  }

  return (
    <>
      <div
        className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl soft-shadow minimal-border cursor-pointer ${gridClass}`}
        onClick={() => setShowModal(true)}
      >
      {/* Image container - fills available space */}
      <div className="relative h-full w-full overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={productName}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-sand-100">
            <div className="text-8xl opacity-10">🍽️</div>
          </div>
        )}

        {/* Subtle gradient overlay on bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"></div>

        {/* Stock badge */}
        {!product.available && (
          <div className="absolute top-4 right-4 bg-charcoal text-pearl px-3 py-1.5 rounded-full text-xs font-light tracking-wide">
            {t.outOfStock}
          </div>
        )}

        {/* Content overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {/* Product name */}
          <h3 className="font-light text-2xl mb-1.5 tracking-wide">
            {productName}
          </h3>

          {/* Description - only show on larger cards */}
          <p className="text-white/80 text-sm mb-3 line-clamp-2 font-light hidden md:block">
            {productDescription}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-light tracking-tight">
              {product.price}
            </span>
            <span className="text-lg font-light opacity-90">₺</span>
          </div>
        </div>

        {/* Minimal accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-sage-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Action Buttons - appears on hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <button
            className="bg-white/95 backdrop-blur-sm text-charcoal px-8 py-4 rounded-2xl font-light text-lg tracking-wide shadow-2xl hover:scale-110 transition-all duration-300 pointer-events-auto border-2 border-sage-400"
            onClick={(e) => {
              e.stopPropagation()
              setShowModal(true)
            }}
          >
            {t.details}
          </button>

          {product.available && (
            <button
              className="bg-sage-600/95 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-light text-lg tracking-wide shadow-2xl hover:scale-110 hover:bg-sage-700 transition-all duration-300 pointer-events-auto border-2 border-sage-700"
              onClick={handleAddToCart}
            >
              🛒 {t.addToCart}
            </button>
          )}
        </div>
      </div>
    </div>

    {/* Modal */}
    {showModal && (
      <ProductModal product={product} onClose={() => setShowModal(false)} />
    )}
    </>
  )
}
