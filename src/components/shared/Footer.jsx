'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { currentLanguage, settings } = useLanguage()

  const footerData = settings?.footer?.[currentLanguage] || settings?.footer?.tr || {
    address: 'Poyrazköy, Beykoz',
    phone: '+90 538 873 17 90',
    email: 'info@example.com',
    hours: 'Pazartesi - Pazar: 08:00 - 23:00'
  }

  const whatsappNumber = settings?.whatsappNumber || '+905388731790'

  return (
    <footer className="relative mt-8 border-t border-white/10">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        {/* Single Line Layout */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2.5 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="text-xs font-medium">{footerData.phone}</span>
          </a>

          {/* Separator */}
          <div className="hidden sm:block w-px h-6 bg-white/20"></div>

          {/* Address */}
          <div className="group flex items-center gap-2 bg-white/40 backdrop-blur-sm text-charcoal px-4 py-2.5 rounded-full border border-white/30">
            <span className="text-base">📍</span>
            <span className="text-xs font-light">{footerData.address}</span>
          </div>

          {/* Separator */}
          <div className="hidden sm:block w-px h-6 bg-white/20"></div>

          {/* Email */}
          {footerData.email && (
            <a
              href={`mailto:${footerData.email}`}
              className="group flex items-center gap-2 bg-white/40 backdrop-blur-sm text-charcoal px-4 py-2.5 rounded-full hover:bg-white/60 transition-all duration-300 hover:shadow-lg hover:scale-105 border border-white/30"
            >
              <span className="text-base">✉️</span>
              <span className="text-xs font-light">{footerData.email}</span>
            </a>
          )}

          {/* Hours */}
          {footerData.hours && (
            <>
              <div className="hidden sm:block w-px h-6 bg-white/20"></div>
              <div className="group flex items-center gap-2 bg-white/40 backdrop-blur-sm text-charcoal px-4 py-2.5 rounded-full border border-white/30">
                <span className="text-base">🕒</span>
                <span className="text-xs font-light">{footerData.hours}</span>
              </div>
            </>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-charcoal/30 text-[10px] font-light tracking-wider">
            © 2025 Restaurant Menu
          </p>
        </div>
      </div>
    </footer>
  )
}
