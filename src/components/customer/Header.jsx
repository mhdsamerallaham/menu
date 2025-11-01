'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'

export default function Header() {
  const { currentLanguage, availableLanguages, changeLanguage, settings } = useLanguage()
  const { getCartCount } = useCart()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showCartSidebar, setShowCartSidebar] = useState(false)

  const cartCount = getCartCount()

  // Translations
  const translations = {
    tr: {
      home: 'Ana Sayfa',
      about: 'Hakkımızda',
      cart: 'Sepet'
    },
    en: {
      home: 'Home',
      about: 'About Us',
      cart: 'Cart'
    },
    ar: {
      home: 'الصفحة الرئيسية',
      about: 'معلومات عنا',
      cart: 'سلة'
    }
  }

  const t = translations[currentLanguage] || translations.tr

  return (
    <header className="relative border-b border-white/20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 md:py-8">
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Link href="/">
              <button className="text-charcoal/60 hover:text-charcoal transition-colors flex items-center gap-2 backdrop-blur-sm bg-white/30 px-4 py-2 rounded-xl">
                <span className="text-lg">←</span>
                <span className="font-light">{t.home}</span>
              </button>
            </Link>
            <Link href="/hakkimizda">
              <button className="text-charcoal/60 hover:text-charcoal transition-colors flex items-center gap-2 backdrop-blur-sm bg-white/30 px-4 py-2 rounded-xl">
                <span className="font-light">{t.about}</span>
              </button>
            </Link>
          </div>

          <div className="flex gap-2">
            {/* Language Selector - Only show if more than one language is enabled */}
            {availableLanguages.length > 1 && (
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="text-charcoal/60 hover:text-charcoal transition-colors flex items-center gap-2 backdrop-blur-sm bg-white/30 px-4 py-2 rounded-xl"
                >
                  <span className="text-xl">{availableLanguages.find(l => l.code === currentLanguage)?.flag}</span>
                  <span className="font-light text-sm">{availableLanguages.find(l => l.code === currentLanguage)?.label}</span>
                </button>

                {showLanguageMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-charcoal/10 py-2 min-w-[150px] z-50">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code)
                          setShowLanguageMenu(false)
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-sage-50 transition-colors flex items-center gap-3 ${
                          currentLanguage === lang.code ? 'bg-sage-50' : ''
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="font-light text-sm text-charcoal">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setShowCartSidebar(true)}
              className="relative text-charcoal/60 hover:text-charcoal transition-colors flex items-center gap-2 backdrop-blur-sm bg-white/30 px-4 py-2 rounded-xl"
            >
              <span className="text-lg">🛒</span>
              <span className="font-light">{t.cart}</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          {/* Logo */}
          <div className="relative w-full max-w-2xl h-56 md:h-72">
            <Image
              src={settings?.logo || '/images/logo.png'}
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Cart Sidebar - We'll create this component next */}
      {showCartSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setShowCartSidebar(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart content will be here */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light text-charcoal">{t.cart}</h2>
                <button
                  onClick={() => setShowCartSidebar(false)}
                  className="text-2xl text-charcoal/60 hover:text-charcoal"
                >
                  ×
                </button>
              </div>
              <p className="text-charcoal/60">Sepet içeriği yakında...</p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
