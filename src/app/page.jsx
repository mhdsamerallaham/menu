'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LandingPage() {
  const { currentLanguage, availableLanguages, changeLanguage, settings } = useLanguage()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  const translations = {
    tr: {
      menu: 'Menü',
      about: 'Hakkımızda',
      defaultTagline: 'Rüzgârın serinliği, kahvenin sıcaklığıyla buluştu'
    },
    en: {
      menu: 'Menu',
      about: 'About Us',
      defaultTagline: 'Where the freshness of the wind meets the warmth of coffee'
    },
    ar: {
      menu: 'قائمة الطعام',
      about: 'معلومات عنا',
      defaultTagline: 'حيث تلتقي نضارة الرياح بدفء القهوة'
    }
  }

  const t = translations[currentLanguage] || translations.tr

  // Get tagline from settings or use default
  const tagline = settings?.tagline?.[currentLanguage] || t.defaultTagline

  return (
    <div className="min-h-screen flex flex-col relative bg-pearl">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${settings?.backgroundImage || '/images/coffee-hero.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-pearl/70 via-pearl/60 to-pearl/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-3 md:mb-4 w-full max-w-xl">
          <img
            src={settings?.logo || "/images/logo.png"}
            alt="Poyraz Cafe Logo"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Language Selector - Only show if 2+ languages active */}
        {availableLanguages.length > 1 && (
          <div className="mb-8 relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="bg-white/80 backdrop-blur-sm text-charcoal px-6 py-3 rounded-full hover:bg-white transition-all duration-300 font-light text-sm tracking-wide shadow-lg border border-sand-200/50 flex items-center gap-2"
            >
              <span className="text-lg">
                {settings?.languages?.[currentLanguage]?.flag || '🌐'}
              </span>
              <span>{settings?.languages?.[currentLanguage]?.label || currentLanguage.toUpperCase()}</span>
              <span className="text-xs">{showLanguageMenu ? '▲' : '▼'}</span>
            </button>

            {showLanguageMenu && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-sand-200/50 overflow-hidden z-50">
                {availableLanguages.map((langObj) => (
                  <button
                    key={langObj.code}
                    onClick={() => {
                      changeLanguage(langObj.code)
                      setShowLanguageMenu(false)
                    }}
                    className={`w-full px-6 py-3 text-left hover:bg-sage-50 transition-colors flex items-center gap-3 ${
                      currentLanguage === langObj.code ? 'bg-sage-100' : ''
                    }`}
                  >
                    <span className="text-lg">{langObj.flag}</span>
                    <span className="font-light text-charcoal">
                      {langObj.label}
                    </span>
                    {currentLanguage === langObj.code && (
                      <span className="ml-auto text-sage-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          <Link href="/menu">
            <button className="w-full bg-white/90 backdrop-blur-sm text-charcoal px-12 py-6 rounded-2xl hover:bg-white hover:scale-105 transition-all duration-300 font-light text-xl tracking-wide shadow-2xl border border-sand-200/50">
              <span className="block text-3xl mb-2">☕</span>
              {t.menu}
            </button>
          </Link>

          <Link href="/hakkimizda">
            <button className="w-full bg-white/90 backdrop-blur-sm text-charcoal px-12 py-6 rounded-2xl hover:bg-white hover:scale-105 transition-all duration-300 font-light text-xl tracking-wide shadow-2xl border border-sage-200/50">
              <span className="block text-3xl mb-2">🌿</span>
              {t.about}
            </button>
          </Link>
        </div>

        {/* Tagline */}
        <div className="mt-12 text-center">
          <p
            className="text-charcoal/60 font-light text-sm md:text-base tracking-wide"
            style={{ direction: currentLanguage === 'ar' ? 'rtl' : 'ltr' }}
          >
            {tagline}
          </p>
        </div>
      </div>
    </div>
  )
}
