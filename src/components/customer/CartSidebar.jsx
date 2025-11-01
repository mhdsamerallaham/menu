'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CartSidebar({ isOpen, onClose }) {
  const router = useRouter()
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const { currentLanguage, settings } = useLanguage()

  const translations = {
    tr: {
      cart: 'Sepet',
      empty: 'Sepetiniz boş',
      total: 'Toplam',
      clear: 'Sepeti Temizle',
      order: 'WhatsApp ile Sipariş Ver',
      quantity: 'Adet',
      remove: 'Kaldır',
      emptyCartAlert: 'Sepetiniz boş!',
      clearCartConfirm: 'Sepeti temizlemek istediğinizden emin misiniz?'
    },
    en: {
      cart: 'Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      clear: 'Clear Cart',
      order: 'Order via WhatsApp',
      quantity: 'Qty',
      remove: 'Remove',
      emptyCartAlert: 'Your cart is empty!',
      clearCartConfirm: 'Are you sure you want to clear the cart?'
    },
    ar: {
      cart: 'سلة',
      empty: 'سلتك فارغة',
      total: 'المجموع',
      clear: 'مسح السلة',
      order: 'اطلب عبر واتساب',
      quantity: 'كمية',
      remove: 'إزالة',
      emptyCartAlert: 'سلتك فارغة!',
      clearCartConfirm: 'هل أنت متأكد أنك تريد مسح السلة؟'
    }
  }

  const t = translations[currentLanguage] || translations.tr

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      alert(t.emptyCartAlert)
      return
    }

    // Navigate to order page
    onClose()
    router.push('/siparis')
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-charcoal/10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-light text-charcoal">{t.cart}</h2>
            <button
              onClick={onClose}
              className="text-3xl text-charcoal/60 hover:text-charcoal transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-charcoal/40">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-lg font-light">{t.empty}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                const productName = item.translations?.[currentLanguage]?.name || item.name || ''
                const productDescription = item.translations?.[currentLanguage]?.description || item.description || ''

                return (
                  <div key={item.id} className="bg-sand-50 rounded-xl p-4 border border-charcoal/10">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={productName}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl opacity-20">
                            🍽️
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-light text-base text-charcoal mb-1 truncate">
                          {productName}
                        </h3>
                        <p className="text-sm text-charcoal/60 font-light mb-2 line-clamp-1">
                          {productDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-light text-charcoal">
                            {item.price} ₺
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg bg-white border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-sage-50 transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-light text-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-white border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-sage-50 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-3 w-full text-sm text-red-600 hover:text-red-700 font-light transition-colors"
                    >
                      {t.remove}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-charcoal/10 bg-sand-50">
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-light text-charcoal">{t.total}</span>
              <span className="text-2xl font-light text-charcoal">
                {getCartTotal().toFixed(2)} ₺
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl hover:from-green-700 hover:to-green-800 font-light tracking-wide transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
              >
                <span className="text-xl">💬</span>
                {t.order}
              </button>

              <button
                onClick={() => {
                  if (confirm(t.clearCartConfirm)) {
                    clearCart()
                  }
                }}
                className="w-full bg-white text-charcoal/70 px-6 py-3 rounded-xl hover:bg-charcoal/5 font-light tracking-wide transition-all border border-charcoal/20"
              >
                {t.clear}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
