'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { currentLanguage, settings } = useLanguage()

  const translations = {
    tr: {
      backHome: 'Ana Sayfa',
      menu: 'Menü',
      viewMenu: 'Menümüzü İnceleyin'
    },
    en: {
      backHome: 'Home',
      menu: 'Menu',
      viewMenu: 'View Our Menu'
    },
    ar: {
      backHome: 'الصفحة الرئيسية',
      menu: 'قائمة الطعام',
      viewMenu: 'عرض قائمتنا'
    }
  }

  const t = translations[currentLanguage] || translations.tr

  // Get about content from settings
  const aboutContent = settings?.about?.[currentLanguage] || settings?.about?.tr || {
    title: 'Hakkımızda',
    content: ''
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-pearl">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/coffee-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-pearl/80 via-pearl/70 to-pearl/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Back Button */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/30 border-b border-sand-200/30">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/">
              <button className="text-charcoal/70 hover:text-charcoal transition-colors flex items-center gap-2">
                <span className="text-xl">←</span>
                <span className="font-light">{t.backHome}</span>
              </button>
            </Link>
            <Link href="/menu">
              <button className="text-charcoal/70 hover:text-charcoal transition-colors font-light">
                {t.menu}
              </button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
          {/* Hero Section */}
          <section className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-6xl font-light text-charcoal mb-6 tracking-tight">
              {aboutContent.title || 'Hakkımızda'}
            </h1>
          </section>

          {/* Main Content from Settings */}
          {aboutContent.content && (
            <section className="mb-16 md:mb-20 bg-white/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border border-sand-200/30">
              <div className="prose prose-lg max-w-none">
                <div
                  className="text-charcoal/70 font-light leading-relaxed text-base md:text-lg whitespace-pre-wrap"
                  style={{ direction: currentLanguage === 'ar' ? 'rtl' : 'ltr' }}
                >
                  {aboutContent.content}
                </div>
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="text-center">
            <Link href="/menu">
              <button className="bg-gradient-to-r from-sand-600 to-sand-700 text-white px-12 py-4 rounded-2xl hover:from-sand-700 hover:to-sand-800 hover:scale-105 transition-all duration-300 font-light text-lg tracking-wide shadow-2xl">
                {t.viewMenu}
              </button>
            </Link>
          </section>
        </main>
      </div>
    </div>
  )
}
