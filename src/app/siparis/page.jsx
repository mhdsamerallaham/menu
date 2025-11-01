'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

export default function OrderPage() {
  const router = useRouter()
  const { cart, getCartTotal } = useCart()
  const { currentLanguage, settings } = useLanguage()

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    paymentMethod: 'cash'
  })

  const translations = {
    tr: {
      title: 'Sipariş Bilgileri',
      fullName: 'Ad Soyad',
      phone: 'Telefon Numarası',
      address: 'Teslimat Adresi',
      paymentMethod: 'Ödeme Yöntemi',
      paymentCash: 'Kapıda Nakit',
      paymentCashTransfer: 'Kapıda Havale',
      paymentTransfer: 'Havale',
      paymentCard: 'Kapıda Kart',
      orderSummary: 'Sipariş Özeti',
      total: 'Toplam',
      sendOrder: 'Siparişi Gönder',
      backToCart: 'Sepete Dön',
      required: 'zorunlu',
      emptyCart: 'Sepetiniz boş! Lütfen önce ürün ekleyin.',
      fillAllFields: 'Lütfen tüm alanları doldurun!',
      items: 'Ürünler'
    },
    en: {
      title: 'Order Information',
      fullName: 'Full Name',
      phone: 'Phone Number',
      address: 'Delivery Address',
      paymentMethod: 'Payment Method',
      paymentCash: 'Cash on Delivery',
      paymentCashTransfer: 'Bank Transfer on Delivery',
      paymentTransfer: 'Bank Transfer',
      paymentCard: 'Card on Delivery',
      orderSummary: 'Order Summary',
      total: 'Total',
      sendOrder: 'Send Order',
      backToCart: 'Back to Cart',
      required: 'required',
      emptyCart: 'Your cart is empty! Please add products first.',
      fillAllFields: 'Please fill all fields!',
      items: 'Items'
    },
    ar: {
      title: 'معلومات الطلب',
      fullName: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      address: 'عنوان التسليم',
      paymentMethod: 'طريقة الدفع',
      paymentCash: 'الدفع نقداً عند الاستلام',
      paymentCashTransfer: 'التحويل البنكي عند الاستلام',
      paymentTransfer: 'التحويل البنكي',
      paymentCard: 'البطاقة عند الاستلام',
      orderSummary: 'ملخص الطلب',
      total: 'المجموع',
      sendOrder: 'إرسال الطلب',
      backToCart: 'العودة إلى السلة',
      required: 'مطلوب',
      emptyCart: 'سلتك فارغة! يرجى إضافة المنتجات أولاً.',
      fillAllFields: 'يرجى ملء جميع الحقول!',
      items: 'المنتجات'
    }
  }

  const t = translations[currentLanguage] || translations.tr

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      alert(t.emptyCart)
      router.push('/menu')
    }
  }, [cart, router, t.emptyCart])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert(t.fillAllFields)
      return
    }

    const whatsappNumber = settings?.whatsappNumber || '+905XXXXXXXXX'

    // Payment method labels
    const paymentLabels = {
      cash: t.paymentCash,
      cashTransfer: t.paymentCashTransfer,
      transfer: t.paymentTransfer,
      card: t.paymentCard
    }

    // Create order message
    let message = '🛒 *' + (currentLanguage === 'tr' ? 'YENİ SİPARİŞ' : currentLanguage === 'en' ? 'NEW ORDER' : 'طلب جديد') + '*\n\n'

    // Customer info
    message += '👤 *' + (currentLanguage === 'tr' ? 'MÜŞTERİ BİLGİLERİ' : currentLanguage === 'en' ? 'CUSTOMER INFO' : 'معلومات العميل') + '*\n'
    message += `${t.fullName}: ${formData.fullName}\n`
    message += `${t.phone}: ${formData.phone}\n`
    message += `${t.address}: ${formData.address}\n`
    message += `${t.paymentMethod}: ${paymentLabels[formData.paymentMethod]}\n\n`

    // Order items
    message += '📦 *' + (currentLanguage === 'tr' ? 'SİPARİŞ DETAYLARI' : currentLanguage === 'en' ? 'ORDER DETAILS' : 'تفاصيل الطلب') + '*\n\n'

    cart.forEach((item, index) => {
      const productName = item.translations?.[currentLanguage]?.name || item.name || ''
      message += `${index + 1}. ${productName}\n`
      message += `   ${currentLanguage === 'tr' ? 'Adet' : currentLanguage === 'en' ? 'Qty' : 'الكمية'}: ${item.quantity}\n`
      message += `   ${currentLanguage === 'tr' ? 'Fiyat' : currentLanguage === 'en' ? 'Price' : 'السعر'}: ${item.price} ₺\n`
      message += `   ${t.total}: ${(item.price * item.quantity).toFixed(2)} ₺\n\n`
    })

    message += `💰 *${currentLanguage === 'tr' ? 'GENEL TOPLAM' : currentLanguage === 'en' ? 'GRAND TOTAL' : 'المجموع الإجمالي'}: ${getCartTotal().toFixed(2)} ₺*`

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')

    // Optional: Clear cart after order
    // clearCart()
    // router.push('/menu')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (cart.length === 0) {
    return null
  }

  const isRTL = currentLanguage === 'ar'

  return (
    <div className="min-h-screen bg-pearl py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-light text-charcoal mb-4" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            {t.title}
          </h1>
          <Link href="/menu">
            <button className="text-charcoal/70 hover:text-charcoal transition-colors font-light flex items-center gap-2 mx-auto">
              <span>{isRTL ? '→' : '←'}</span>
              <span>{t.backToCart}</span>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border border-sand-200/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-light text-charcoal mb-2" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                  {t.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 outline-none transition-all font-light"
                  style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-light text-charcoal mb-2" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                  {t.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+90 5XX XXX XX XX"
                  className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 outline-none transition-all font-light"
                  style={{ direction: 'ltr' }}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-light text-charcoal mb-2" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                  {t.address} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-sage-500 focus:ring-2 focus:ring-sage-500/20 outline-none transition-all font-light resize-none"
                  style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-light text-charcoal mb-3" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                  {t.paymentMethod} <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'cash', label: t.paymentCash },
                    { value: 'cashTransfer', label: t.paymentCashTransfer },
                    { value: 'transfer', label: t.paymentTransfer },
                    { value: 'card', label: t.paymentCard }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === option.value
                          ? 'border-sage-500 bg-sage-50'
                          : 'border-charcoal/10 bg-white hover:border-sage-300'
                      }`}
                      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.value}
                        checked={formData.paymentMethod === option.value}
                        onChange={handleChange}
                        className="w-4 h-4 text-sage-600"
                      />
                      <span className="font-light text-charcoal">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl hover:from-green-700 hover:to-green-800 font-light text-lg tracking-wide transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
              >
                <span className="text-xl">💬</span>
                {t.sendOrder}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border border-sand-200/30">
            <h2 className="text-2xl font-light text-charcoal mb-6" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
              {t.orderSummary}
            </h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => {
                const productName = item.translations?.[currentLanguage]?.name || item.name || ''
                return (
                  <div key={item.id} className="flex justify-between items-start gap-4 pb-4 border-b border-charcoal/10">
                    <div className="flex-1" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                      <p className="font-light text-charcoal">{productName}</p>
                      <p className="text-sm text-charcoal/60 font-light">
                        {item.quantity} × {item.price} ₺
                      </p>
                    </div>
                    <p className="font-light text-charcoal">
                      {(item.quantity * item.price).toFixed(2)} ₺
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="pt-4 border-t-2 border-charcoal/20">
              <div className="flex justify-between items-center" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                <span className="text-xl font-light text-charcoal">{t.total}</span>
                <span className="text-3xl font-light text-charcoal">
                  {getCartTotal().toFixed(2)} ₺
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
