'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'

export default function ProductModal({ product, onClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const { currentLanguage } = useLanguage()
  const { addToCart } = useCart()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    setTimeout(() => setIsVisible(true), 10)

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  if (!product) return null

  const productName = product.translations?.[currentLanguage]?.name || product.name || ''
  const productDescription = product.translations?.[currentLanguage]?.description || product.description || ''

  const translations = {
    tr: {
      outOfStock: 'Stokta Yok',
      price: 'Fiyat',
      info: 'Bilgi',
      infoText: 'Tüm ürünlerimiz taze malzemelerle günlük olarak hazırlanmaktadır.',
      addToCart: 'Sepete Ekle',
      addedToCart: '✅ Ürün sepete eklendi!'
    },
    en: {
      outOfStock: 'Out of Stock',
      price: 'Price',
      info: 'Information',
      infoText: 'All our products are prepared daily with fresh ingredients.',
      addToCart: 'Add to Cart',
      addedToCart: '✅ Product added to cart!'
    },
    ar: {
      outOfStock: 'إنتهى من المخزن',
      price: 'السعر',
      info: 'معلومات',
      infoText: 'يتم تحضير جميع منتجاتنا يوميًا بمكونات طازجة.',
      addToCart: 'أضف إلى السلة',
      addedToCart: '✅ تمت إضافة المنتج إلى السلة!'
    }
  }

  const t = translations[currentLanguage] || translations.tr

  const handleAddToCart = () => {
    addToCart(product, 1)
    alert(t.addedToCart)
  }

  return (
    <div
      className={`fixed inset-0 bg-coffee-900/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-95 opacity-0 rotate-1'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-80 md:h-[32rem] w-full bg-gradient-to-br from-latte/50 to-coffee-100/50 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={productName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-coffee-200/20 blur-3xl"></div>
              <div className="relative text-9xl opacity-30">🍽️</div>
            </div>
          )}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/80 via-coffee-900/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-mint/10 via-transparent to-coffee-500/10"></div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl hover:bg-white hover:scale-110 hover:rotate-90 transition-all duration-300 group z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-coffee-700 group-hover:text-coffee-900 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {!product.available && (
            <div className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl backdrop-blur-sm z-10">
              {t.outOfStock}
            </div>
          )}

          {/* Product name overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl mb-3">
              {productName}
            </h2>
            <div className="flex items-center gap-3">
              <div className="h-1 w-16 bg-gradient-to-r from-mint to-transparent rounded-full"></div>
              <div className="h-1 w-8 bg-mint/50 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto max-h-[calc(90vh-32rem)] bg-white">
          {/* Description */}
          <p className="text-charcoal/80 text-lg md:text-xl mb-10 leading-relaxed font-light">
            {productDescription}
          </p>

          {/* Price section */}
          <div className="pt-8 border-t-2 border-sand-200">
            <div>
              <p className="text-charcoal/60 text-sm font-light mb-2">{t.price}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl md:text-7xl font-light text-sand-700 tracking-tight">
                  {product.price}
                </span>
                <span className="text-3xl font-light text-sand-600">₺</span>
              </div>
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-8 p-6 bg-sand-50 rounded-2xl border border-sand-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">☕</span>
              </div>
              <div>
                <h4 className="font-light text-charcoal mb-1">{t.info}</h4>
                <p className="text-charcoal/70 text-sm leading-relaxed font-light">
                  {t.infoText}
                </p>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          {product.available && (
            <div className="mt-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-sage-600 to-sage-700 text-white px-8 py-4 rounded-2xl hover:from-sage-700 hover:to-sage-800 font-light text-lg tracking-wide transition-all duration-300 shadow-lg shadow-sage-600/20 flex items-center justify-center gap-2"
              >
                <span className="text-xl">🛒</span>
                {t.addToCart}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
