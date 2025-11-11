'use client'

import { useState } from 'react'
import Image from 'next/image'
import ProductModal from './ProductModal'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'

export default function MinimalMenuView({ products }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {products.map((product) => (
        <MinimalProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function MinimalProductCard({ product }) {
  const [showModal, setShowModal] = useState(false)
  const { currentLanguage, settings } = useLanguage()
  const { addToCart } = useCart()

  // Color mapping for add to cart button
  const colorClasses = {
    sage: 'bg-sage-600 hover:bg-sage-700',
    sand: 'bg-sand-600 hover:bg-sand-700',
    charcoal: 'bg-charcoal hover:bg-charcoal/90',
    red: 'bg-red-600 hover:bg-red-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700'
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
        className="group bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-charcoal/5"
        onClick={() => setShowModal(true)}
      >
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-sand-50">
          {product.image ? (
            <Image
              src={product.image}
              alt={productName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl opacity-10">🍽️</div>
            </div>
          )}

          {/* Stock badge */}
          {!product.available && (
            <div className="absolute top-2 right-2 bg-charcoal text-white px-2 py-1 rounded-lg text-xs font-light">
              {t.outOfStock}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-light text-base mb-2 text-charcoal line-clamp-2 min-h-[3rem]">
            {productName}
          </h3>

          {/* Description - hidden on mobile */}
          <p className="text-charcoal/60 text-xs mb-3 line-clamp-2 font-light hidden lg:block min-h-[2.5rem]">
            {productDescription}
          </p>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-light text-charcoal">
                {product.price}
              </span>
              <span className="text-sm font-light text-charcoal/60">₺</span>
            </div>

            {product.available && (
              <button
                onClick={handleAddToCart}
                className={`${buttonColor} text-white p-2 rounded-lg transition-colors duration-200 text-sm`}
                title={t.addToCart}
              >
                🛒
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
