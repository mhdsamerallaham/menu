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
    whatsappNumber: ''
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
