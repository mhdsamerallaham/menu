'use client'

import { useState } from 'react'
import Image from 'next/image'
import ProductModal from './ProductModal'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'

export default function ModernMenuView({ products }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {products.map((product) => (
        <ModernProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ModernProductCard({ product }) {
  const [showModal, setShowModal] = useState(false)
  const { currentLanguage, settings } = useLanguage()
  const { addToCart } = useCart()

  // Color mapping for add to cart button
  const colorClasses = {
    sage: {
      bg: 'bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800',
      shadow: 'shadow-sage-600/20 hover:shadow-sage-600/30'
    },
    sand: {
      bg: 'bg-gradient-to-r from-sand-600 to-sand-700 hover:from-sand-700 hover:to-sand-800',
      shadow: 'shadow-sand-600/20 hover:shadow-sand-600/30'
    },
    charcoal: {
      bg: 'bg-gradient-to-r from-charcoal to-charcoal/90 hover:from-charcoal/90 hover:to-charcoal',
      shadow: 'shadow-charcoal/20 hover:shadow-charcoal/30'
    },
    red: {
      bg: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
      shadow: 'shadow-red-600/20 hover:shadow-red-600/30'
    },
    blue: {
      bg: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
      shadow: 'shadow-blue-600/20 hover:shadow-blue-600/30'
    },
    green: {
      bg: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
      shadow: 'shadow-green-600/20 hover:shadow-green-600/30'
    }
  }

  const buttonColor = colorClasses[settings?.addToCartButtonColor] || colorClasses.sage

  const productName = product.translations?.[currentLanguage]?.name || product.name || ''
  const productDescription = product.translations?.[currentLanguage]?.description || product.description || ''

  const translations = {
    tr: {
      addToCart: 'Sepete Ekle',
      outOfStock: 'Stokta Yok',
      addedToCart: '✅ Ürün sepete eklendi!'
    },
    en: {
      addToCart: 'Add to Cart',
      outOfStock: 'Out of Stock',
      addedToCart: '✅ Product added to cart!'
    },
    ar: {
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
        className="group relative bg-gradient-to-br from-white via-sage-50/30 to-sand-50/30 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 border border-sage-200/30 backdrop-blur-sm hover:-translate-y-1"
        onClick={() => setShowModal(true)}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sage-400/0 via-sage-400/5 to-sand-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={productName}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sand-100 to-sage-100">
              <div className="text-7xl opacity-10">🍽️</div>
            </div>
          )}

          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"></div>

          {/* Stock badge */}
          {!product.available && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-charcoal to-charcoal/90 text-white px-3 py-1.5 rounded-xl text-xs font-light shadow-lg backdrop-blur-sm">
              {t.outOfStock}
            </div>
          )}

          {/* Price overlay on image */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg border border-sage-200/30">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-light text-charcoal">
                {product.price}
              </span>
              <span className="text-sm font-light text-charcoal/60">₺</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-5">
          <h3 className="font-light text-lg mb-2 text-charcoal tracking-tight line-clamp-2 min-h-[3.5rem]">
            {productName}
          </h3>

          {/* Description - hidden on mobile */}
          <p className="text-charcoal/60 text-sm mb-4 line-clamp-2 font-light hidden lg:block min-h-[2.5rem]">
            {productDescription}
          </p>

          {/* Add to Cart Button */}
          {product.available && (
            <button
              onClick={handleAddToCart}
              className={`w-full ${buttonColor.bg} text-white py-3 rounded-xl font-light text-sm transition-all duration-300 shadow-lg ${buttonColor.shadow} hover:shadow-xl flex items-center justify-center gap-2`}
            >
              <span>🛒</span>
              <span>{t.addToCart}</span>
            </button>
          )}
        </div>

        {/* Decorative accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sage-400 via-sand-400 to-sage-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Modal */}
      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
