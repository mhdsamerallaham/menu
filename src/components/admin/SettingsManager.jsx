'use client'

import { useState } from 'react'
import ImageUploader from './ImageUploader'

export default function SettingsManager({ settings, onUpdate }) {
  const [formData, setFormData] = useState(settings || {
    languages: {
      tr: { enabled: true, label: 'Türkçe', flag: '🇹🇷' },
      en: { enabled: false, label: 'English', flag: '🇬🇧' },
      ar: { enabled: false, label: 'العربية', flag: '🇸🇦' }
    },
    logo: '',
    backgroundImage: '',
    menuTheme: 'classic',
    addToCartButtonColor: 'sage',
    tagline: {
      tr: '',
      en: '',
      ar: ''
    },
    footer: {
      tr: { address: '', phone: '', email: '', hours: '' },
      en: { address: '', phone: '', email: '', hours: '' },
      ar: { address: '', phone: '', email: '', hours: '' }
    },
    about: {
      tr: { title: '', content: '' },
      en: { title: '', content: '' },
      ar: { title: '', content: '' }
    },
    whatsappNumber: '',
    delivery: {
      enabled: false,
      price: 0,
      label: {
        tr: 'Eve Ulaştırma Hizmet Bedeli',
        en: 'Home Delivery Service Fee',
        ar: 'رسوم خدمة التوصيل للمنزل'
      }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(formData)
  }

  const toggleLanguage = (lang) => {
    setFormData({
      ...formData,
      languages: {
        ...formData.languages,
        [lang]: {
          ...formData.languages[lang],
          enabled: !formData.languages[lang].enabled
        }
      }
    })
  }

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl md:rounded-3xl border border-sage-200/30 p-4 md:p-8 shadow-xl">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-charcoal tracking-tight mb-1">Site Ayarları</h2>
        <p className="text-xs md:text-sm text-charcoal/50 font-light tracking-wide">Logo, dil, iletişim ve hakkımızda bilgilerini düzenleyin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Language Settings */}
        <div className="p-6 bg-gradient-to-br from-sage-50 to-sand-50 rounded-2xl border border-sage-200/50">
          <h3 className="text-xl font-light text-charcoal mb-4 tracking-tight">Dil Ayarları</h3>
          <p className="text-sm text-charcoal/60 mb-6">Aktif diller menüde dil seçici olarak görünecektir</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 cursor-pointer p-4 bg-white rounded-xl border border-charcoal/10 hover:border-sage-500/30 transition-all">
              <input
                type="checkbox"
                checked={formData.languages.tr.enabled}
                onChange={() => toggleLanguage('tr')}
                className="w-5 h-5 rounded border-charcoal/20 text-sage-600 focus:ring-sage-400"
              />
              <span className="text-2xl">{formData.languages.tr.flag}</span>
              <span className="text-charcoal/70 font-light text-sm tracking-wide">{formData.languages.tr.label}</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-4 bg-white rounded-xl border border-charcoal/10 hover:border-sage-500/30 transition-all">
              <input
                type="checkbox"
                checked={formData.languages.en.enabled}
                onChange={() => toggleLanguage('en')}
                className="w-5 h-5 rounded border-charcoal/20 text-sage-600 focus:ring-sage-400"
              />
              <span className="text-2xl">{formData.languages.en.flag}</span>
              <span className="text-charcoal/70 font-light text-sm tracking-wide">{formData.languages.en.label}</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-4 bg-white rounded-xl border border-charcoal/10 hover:border-sage-500/30 transition-all">
              <input
                type="checkbox"
                checked={formData.languages.ar.enabled}
                onChange={() => toggleLanguage('ar')}
                className="w-5 h-5 rounded border-charcoal/20 text-sage-600 focus:ring-sage-400"
              />
              <span className="text-2xl">{formData.languages.ar.flag}</span>
              <span className="text-charcoal/70 font-light text-sm tracking-wide">{formData.languages.ar.label}</span>
            </label>
          </div>
        </div>

        {/* Logo Settings */}
        <div className="p-6 bg-gradient-to-br from-sand-50 to-sage-50 rounded-2xl border border-sand-200/50">
          <h3 className="text-xl font-light text-charcoal mb-4 tracking-tight">Logo</h3>
          <ImageUploader
            currentImage={formData.logo}
            onUpload={(imagePath) => setFormData({ ...formData, logo: imagePath })}
            label="Site Logosu"
          />
        </div>

        {/* Background Image Settings */}
        <div className="p-6 bg-gradient-to-br from-sage-50 to-sand-50 rounded-2xl border border-sage-200/50">
          <h3 className="text-xl font-light text-charcoal mb-4 tracking-tight">Arka Plan Resmi</h3>
          <p className="text-sm text-charcoal/60 mb-4">Ana sayfa ve admin panelinde görünecek arka plan resmi</p>
          <ImageUploader
            currentImage={formData.backgroundImage}
            onUpload={(imagePath) => setFormData({ ...formData, backgroundImage: imagePath })}
            label="Arka Plan Resmi"
          />
        </div>

        {/* Menu Theme Selector */}
        <div className="p-6 bg-gradient-to-br from-sand-50 to-sage-50 rounded-2xl border border-sand-200/50">
          <h3 className="text-xl font-light text-charcoal mb-4 tracking-tight">Menü Teması</h3>
          <p className="text-sm text-charcoal/60 mb-6">Menü sayfasında görünecek tasarım temasını seçin</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Classic Theme */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, menuTheme: 'classic' })}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                formData.menuTheme === 'classic'
                  ? 'border-sage-600 bg-sage-50 shadow-lg shadow-sage-600/20'
                  : 'border-charcoal/10 bg-white hover:border-sage-400'
              }`}
            >
              {/* Theme Preview Thumbnail */}
              <div className="aspect-[4/3] bg-gradient-to-br from-pearl to-sand-50 rounded-xl mb-4 p-4 flex flex-col items-center justify-center border border-charcoal/10">
                <div className="w-full space-y-2">
                  {/* Simulated menu items in classic style */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-sm">
                    <div className="h-2 bg-charcoal/20 rounded w-3/4"></div>
                    <div className="h-1 bg-charcoal/10 rounded w-1/2 mt-1"></div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-sm">
                    <div className="h-2 bg-charcoal/20 rounded w-2/3"></div>
                    <div className="h-1 bg-charcoal/10 rounded w-1/3 mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Theme Info */}
              <div className="text-center">
                <h4 className="font-medium text-charcoal mb-1">Klasik Tema</h4>
                <p className="text-xs text-charcoal/60">Mevcut tasarım</p>
              </div>

              {/* Selected Badge */}
              {formData.menuTheme === 'classic' && (
                <div className="absolute -top-2 -right-2 bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg shadow-lg">
                  ✓
                </div>
              )}
            </button>

            {/* Minimal Theme */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, menuTheme: 'minimal' })}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                formData.menuTheme === 'minimal'
                  ? 'border-sage-600 bg-sage-50 shadow-lg shadow-sage-600/20'
                  : 'border-charcoal/10 bg-white hover:border-sage-400'
              }`}
            >
              {/* Theme Preview Thumbnail */}
              <div className="aspect-[4/3] bg-white rounded-xl mb-4 p-4 flex flex-col items-center justify-center border border-charcoal/5">
                <div className="w-full space-y-3">
                  {/* Simulated menu items in minimal style */}
                  <div className="border-b border-charcoal/10 pb-2">
                    <div className="h-2 bg-charcoal/20 rounded w-2/3"></div>
                    <div className="h-1 bg-charcoal/10 rounded w-1/4 mt-1"></div>
                  </div>
                  <div className="border-b border-charcoal/10 pb-2">
                    <div className="h-2 bg-charcoal/20 rounded w-3/4"></div>
                    <div className="h-1 bg-charcoal/10 rounded w-1/3 mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Theme Info */}
              <div className="text-center">
                <h4 className="font-medium text-charcoal mb-1">Minimal Tema</h4>
                <p className="text-xs text-charcoal/60">Sade ve düzenli</p>
              </div>

              {/* Selected Badge */}
              {formData.menuTheme === 'minimal' && (
                <div className="absolute -top-2 -right-2 bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg shadow-lg">
                  ✓
                </div>
              )}
            </button>

            {/* Modern Theme */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, menuTheme: 'modern' })}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                formData.menuTheme === 'modern'
                  ? 'border-sage-600 bg-sage-50 shadow-lg shadow-sage-600/20'
                  : 'border-charcoal/10 bg-white hover:border-sage-400'
              }`}
            >
              {/* Theme Preview Thumbnail */}
              <div className="aspect-[4/3] bg-gradient-to-br from-charcoal/5 via-sage-50 to-sand-50 rounded-xl mb-4 p-4 flex flex-col items-center justify-center border border-charcoal/10">
                <div className="w-full space-y-2">
                  {/* Simulated menu items in modern style */}
                  <div className="bg-gradient-to-r from-white to-sage-50 rounded-lg p-2 shadow-md border border-sage-200/30">
                    <div className="h-2 bg-gradient-to-r from-charcoal/30 to-charcoal/20 rounded w-3/4"></div>
                    <div className="h-1 bg-charcoal/10 rounded w-1/2 mt-1"></div>
                  </div>
                  <div className="bg-gradient-to-r from-white to-sand-50 rounded-lg p-2 shadow-md border border-sand-200/30">
                    <div className="h-2 bg-gradient-to-r from-charcoal/30 to-charcoal/20 rounded w-2/3"></div>
                    <div className="h-1 bg-charcoal/10 rounded w-1/3 mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Theme Info */}
              <div className="text-center">
                <h4 className="font-medium text-charcoal mb-1">Modern Tema</h4>
                <p className="text-xs text-charcoal/60">Premium ve şık</p>
              </div>

              {/* Selected Badge */}
              {formData.menuTheme === 'modern' && (
                <div className="absolute -top-2 -right-2 bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg shadow-lg">
                  ✓
                </div>
              )}
            </button>
          </div>

          {/* Info Note */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200/50 rounded-xl">
            <p className="text-xs text-blue-800 flex items-center gap-2">
              <span className="text-base">ℹ️</span>
              <span>Seçtiğiniz tema, menü sayfasında ürünlerin nasıl görüneceğini belirler. Telefonda 2 sütun, bilgisayarda 4 sütun olarak görüntülenir.</span>
            </p>
          </div>
        </div>

        {/* Add to Cart Button Color */}
        <div className="p-6 bg-gradient-to-br from-sage-50 to-sand-50 rounded-2xl border border-sage-200/50">
          <h3 className="text-xl font-light text-charcoal mb-4 tracking-tight">Sepete Ekle Butonu Rengi</h3>
          <p className="text-sm text-charcoal/60 mb-6">Menü sayfasında &quot;Sepete Ekle&quot; butonunun rengini seçin</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Sage - Default */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, addToCartButtonColor: 'sage' })}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                formData.addToCartButtonColor === 'sage'
                  ? 'border-sage-600 bg-sage-50 shadow-lg'
                  : 'border-charcoal/10 bg-white hover:border-sage-400'
              }`}
            >
              <div className="bg-gradient-to-r from-sage-600 to-sage-700 h-12 rounded-lg mb-3 flex items-center justify-center text-white text-2xl">
                🛒
              </div>
              <p className="text-xs text-center text-charcoal font-medium">Sage</p>
              <p className="text-xs text-center text-charcoal/50">Varsayılan</p>
              {formData.addToCartButtonColor === 'sage' && (
                <div className="absolute -top-2 -right-2 bg-sage-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-lg">
                  ✓
                </div>
              )}
            </button>

            {/* Sand/Brown */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, addToCartButtonColor: 'sand' })}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                formData.addToCartButtonColor === 'sand'
                  ? 'border-sand-600 bg-sand-50 shadow-lg'
                  : 'border-charcoal/10 bg-white hover:border-sand-400'
              }`}
            >
              <div className="bg-gradient-to-r from-sand-600 to-sand-700 h-12 rounded-lg mb-3 flex items-center justify-center text-white text-2xl">
                🛒
              </div>
              <p className="text-xs text-center text-charcoal font-medium">Kahverengi</p>
              <p className="text-xs text-center text-charcoal/50">Sand</p>
              {formData.addToCartButtonColor === 'sand' && (
                <div className="absolute -top-2 -right-2 bg-sand-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-lg">
                  ✓
                </div>
              )}
            </button>

            {/* Charcoal/Black */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, addToCartButtonColor: 'charcoal' })}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                formData.addToCartButtonColor === 'charcoal'
                  ? 'border-charcoal bg-charcoal/10 shadow-lg'
                  : 'border-charcoal/10 bg-white hover:border-charcoal/40'
              }`}
            >
              <div className="bg-gradient-to-r from-charcoal to-charcoal/90 h-12 rounded-lg mb-3 flex items-center justify-center text-white text-2xl">
                🛒
              </div>
              <p className="text-xs text-center text-charcoal font-medium">Siyah</p>
              <p className="text-xs text-center text-charcoal/50">Charcoal</p>
              {formData.addToCartButtonColor === 'charcoal' && (
                <div className="absolute -top-2 -right-2 bg-charcoal text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-lg">
                  ✓
                </div>
              )}
            </button>

            {/* Red */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, addToCartButtonColor: 'red' })}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                formData.addToCartButtonColor === 'red'
                  ? 'border-red-600 bg-red-50 shadow-lg'
                  : 'border-charcoal/10 bg-white hover:border-red-400'
              }`}
            >
              <div className="bg-gradient-to-r from-red-600 to-red-700 h-12 rounded-lg mb-3 flex items-center justify-center text-white text-2xl">
                🛒
              </div>
              <p className="text-xs text-center text-charcoal font-medium">Kırmızı</p>
              <p className="text-xs text-center text-charcoal/50">Red</p>
              {formData.addToCartButtonColor === 'red' && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-lg">
                  ✓
                </div>
              )}
            </button>

            {/* Blue */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, addToCartButtonColor: 'blue' })}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                formData.addToCartButtonColor === 'blue'
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-charcoal/10 bg-white hover:border-blue-400'
              }`}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-12 rounded-lg mb-3 flex items-center justify-center text-white text-2xl">
                🛒
              </div>
              <p className="text-xs text-center text-charcoal font-medium">Mavi</p>
              <p className="text-xs text-center text-charcoal/50">Blue</p>
              {formData.addToCartButtonColor === 'blue' && (
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-lg">
                  ✓
                </div>
              )}
            </button>

            {/* Green */}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, addToCartButtonColor: 'green' })}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                formData.addToCartButtonColor === 'green'
                  ? 'border-green-600 bg-green-50 shadow-lg'
                  : 'border-charcoal/10 bg-white hover:border-green-400'
              }`}
            >
              <div className="bg-gradient-to-r from-green-600 to-green-700 h-12 rounded-lg mb-3 flex items-center justify-center text-white text-2xl">
                🛒
              </div>
              <p className="text-xs text-center text-charcoal font-medium">Yeşil</p>
              <p className="text-xs text-center text-charcoal/50">Green</p>
              {formData.addToCartButtonColor === 'green' && (
                <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-lg">
                  ✓
                </div>
              )}
            </button>
          </div>
        </div>

        {/* WhatsApp Number */}
        <div className="p-6 bg-gradient-to-br from-sage-50 to-sand-50 rounded-2xl border border-sage-200/50">
          <h3 className="text-xl font-light text-charcoal mb-4 tracking-tight">WhatsApp İletişim</h3>
          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
              WhatsApp Numarası (Ülke kodu ile birlikte, örn: +905XXXXXXXXX)
            </label>
            <input
              type="tel"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
              placeholder="+905XXXXXXXXX"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Delivery Fee Settings */}
        <div className="p-6 bg-gradient-to-br from-sand-50 to-sage-50 rounded-2xl border border-sand-200/50">
          <h3 className="text-xl font-light text-charcoal mb-4 tracking-tight">Eve Ulaştırma Hizmet Bedeli</h3>
          <p className="text-sm text-charcoal/60 mb-6">Teslimat ücreti aktif edildiğinde sepet toplamına otomatik olarak eklenecektir</p>

          <div className="space-y-4">
            {/* Enable/Disable Delivery */}
            <label className="flex items-center gap-3 cursor-pointer p-4 bg-white rounded-xl border border-charcoal/10 hover:border-sage-500/30 transition-all">
              <input
                type="checkbox"
                checked={formData.delivery?.enabled || false}
                onChange={(e) => setFormData({
                  ...formData,
                  delivery: {
                    ...formData.delivery,
                    enabled: e.target.checked
                  }
                })}
                className="w-5 h-5 rounded border-charcoal/20 text-sage-600 focus:ring-sage-400"
              />
              <span className="text-charcoal/70 font-light text-sm tracking-wide">Teslimat Ücretini Aktif Et</span>
            </label>

            {/* Delivery Price */}
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
                Teslimat Ücreti (TL)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.delivery?.price || 0}
                onChange={(e) => setFormData({
                  ...formData,
                  delivery: {
                    ...formData.delivery,
                    price: parseFloat(e.target.value) || 0
                  }
                })}
                disabled={!formData.delivery?.enabled}
                className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm disabled:bg-charcoal/5 disabled:cursor-not-allowed"
                placeholder="0.00"
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        {/* Homepage Tagline */}
        <div className="p-6 bg-gradient-to-br from-sand-50 to-sage-50 rounded-2xl border border-sand-200/50">
          <h3 className="text-xl font-light text-charcoal mb-6 tracking-tight">Ana Sayfa Slogan (Tagline)</h3>
          <p className="text-sm text-charcoal/60 mb-6">Logo altında görünecek slogan metni</p>

          {/* Turkish Tagline */}
          <div className="space-y-4 mb-6 p-4 bg-white/50 rounded-xl">
            <h4 className="text-sm font-medium text-charcoal/70">🇹🇷 Türkçe</h4>
            <div>
              <input
                type="text"
                value={formData.tagline?.tr || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  tagline: {
                    ...formData.tagline,
                    tr: e.target.value
                  }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                placeholder="Rüzgârın serinliği, kahvenin sıcaklığıyla buluştu"
                autoComplete="off"
              />
            </div>
          </div>

          {/* English Tagline */}
          <div className="space-y-4 mb-6 p-4 bg-white/50 rounded-xl">
            <h4 className="text-sm font-medium text-charcoal/70">🇬🇧 English</h4>
            <div>
              <input
                type="text"
                value={formData.tagline?.en || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  tagline: {
                    ...formData.tagline,
                    en: e.target.value
                  }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                placeholder="Where the freshness of the wind meets the warmth of coffee"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Arabic Tagline */}
          <div className="space-y-4 p-4 bg-white/50 rounded-xl">
            <h4 className="text-sm font-medium text-charcoal/70">🇸🇦 العربية</h4>
            <div>
              <input
                type="text"
                value={formData.tagline?.ar || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  tagline: {
                    ...formData.tagline,
                    ar: e.target.value
                  }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm text-right"
                placeholder="حيث تلتقي نضارة الرياح بدفء القهوة"
                autoComplete="off"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Footer Settings */}
        <div className="p-6 bg-gradient-to-br from-sand-50 to-sage-50 rounded-2xl border border-sand-200/50">
          <h3 className="text-xl font-light text-charcoal mb-6 tracking-tight">Footer Bilgileri</h3>

          {/* Turkish Footer */}
          <div className="space-y-4 mb-6 p-4 bg-white/50 rounded-xl">
            <h4 className="text-sm font-medium text-charcoal/70">🇹🇷 Türkçe</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2">Adres</label>
                <input
                  type="text"
                  value={formData.footer.tr.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      tr: { ...formData.footer.tr, address: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2">Telefon</label>
                <input
                  type="text"
                  value={formData.footer.tr.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      tr: { ...formData.footer.tr, phone: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={formData.footer.tr.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      tr: { ...formData.footer.tr, email: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2">Çalışma Saatleri</label>
                <input
                  type="text"
                  value={formData.footer.tr.hours}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      tr: { ...formData.footer.tr, hours: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {/* English Footer */}
          <div className="space-y-4 mb-6 p-4 bg-white/50 rounded-xl">
            <h4 className="text-sm font-medium text-charcoal/70">🇬🇧 English</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2">Address</label>
                <input
                  type="text"
                  value={formData.footer.en.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      en: { ...formData.footer.en, address: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2">Phone</label>
                <input
                  type="text"
                  value={formData.footer.en.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      en: { ...formData.footer.en, phone: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={formData.footer.en.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      en: { ...formData.footer.en, email: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2">Working Hours</label>
                <input
                  type="text"
                  value={formData.footer.en.hours}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      en: { ...formData.footer.en, hours: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {/* Arabic Footer */}
          <div className="space-y-4 p-4 bg-white/50 rounded-xl">
            <h4 className="text-sm font-medium text-charcoal/70">🇸🇦 العربية</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2 text-right" dir="rtl">عنوان</label>
                <input
                  type="text"
                  value={formData.footer.ar.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      ar: { ...formData.footer.ar, address: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm text-right"
                  autoComplete="off"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2 text-right" dir="rtl">هاتف</label>
                <input
                  type="text"
                  value={formData.footer.ar.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      ar: { ...formData.footer.ar, phone: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm text-right"
                  autoComplete="off"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2 text-right" dir="rtl">بريد إلكتروني</label>
                <input
                  type="email"
                  value={formData.footer.ar.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      ar: { ...formData.footer.ar, email: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm text-right"
                  autoComplete="off"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-charcoal/70 font-light text-sm mb-2 text-right" dir="rtl">ساعات العمل</label>
                <input
                  type="text"
                  value={formData.footer.ar.hours}
                  onChange={(e) => setFormData({
                    ...formData,
                    footer: {
                      ...formData.footer,
                      ar: { ...formData.footer.ar, hours: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm text-right"
                  autoComplete="off"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Page Settings */}
        <div className="p-6 bg-gradient-to-br from-sage-50 to-sand-50 rounded-2xl border border-sage-200/50">
          <h3 className="text-xl font-light text-charcoal mb-6 tracking-tight">Hakkımızda Sayfası</h3>

          {/* Turkish About */}
          <div className="space-y-4 mb-6 p-4 bg-white/50 rounded-xl">
            <h4 className="text-sm font-medium text-charcoal/70">🇹🇷 Türkçe</h4>
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-2">Başlık</label>
              <input
                type="text"
                value={formData.about.tr.title}
                onChange={(e) => setFormData({
                  ...formData,
                  about: {
                    ...formData.about,
                    tr: { ...formData.about.tr, title: e.target.value }
                  }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-2">İçerik</label>
              <textarea
                value={formData.about.tr.content}
                onChange={(e) => setFormData({
                  ...formData,
                  about: {
                    ...formData.about,
                    tr: { ...formData.about.tr, content: e.target.value }
                  }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                rows="4"
                autoComplete="off"
              />
            </div>
          </div>

          {/* English About */}
          <div className="space-y-4 mb-6 p-4 bg-white/50 rounded-xl">
            <h4 className="text-sm font-medium text-charcoal/70">🇬🇧 English</h4>
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-2">Title</label>
              <input
                type="text"
                value={formData.about.en.title}
                onChange={(e) => setFormData({
                  ...formData,
                  about: {
                    ...formData.about,
                    en: { ...formData.about.en, title: e.target.value }
                  }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-2">Content</label>
              <textarea
                value={formData.about.en.content}
                onChange={(e) => setFormData({
                  ...formData,
                  about: {
                    ...formData.about,
                    en: { ...formData.about.en, content: e.target.value }
                  }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                rows="4"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Arabic About */}
          <div className="space-y-4 p-4 bg-white/50 rounded-xl">
            <h4 className="text-sm font-medium text-charcoal/70">🇸🇦 العربية</h4>
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-2 text-right" dir="rtl">عنوان</label>
              <input
                type="text"
                value={formData.about.ar.title}
                onChange={(e) => setFormData({
                  ...formData,
                  about: {
                    ...formData.about,
                    ar: { ...formData.about.ar, title: e.target.value }
                  }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm text-right"
                autoComplete="off"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-2 text-right" dir="rtl">محتوى</label>
              <textarea
                value={formData.about.ar.content}
                onChange={(e) => setFormData({
                  ...formData,
                  about: {
                    ...formData.about,
                    ar: { ...formData.about.ar, content: e.target.value }
                  }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm text-right"
                rows="4"
                autoComplete="off"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-sage-600 to-sage-700 text-white px-8 py-3 rounded-xl hover:from-sage-700 hover:to-sage-800 font-light tracking-wide transition-all shadow-lg shadow-sage-600/20"
          >
            Ayarları Kaydet
          </button>
        </div>
      </form>
    </div>
  )
}
