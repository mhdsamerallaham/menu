'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('tr')
  const [availableLanguages, setAvailableLanguages] = useState([])
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }

    // Load settings to get available languages
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/menu')
      const data = await response.json()

      if (data.settings) {
        setSettings(data.settings)

        // Get enabled languages
        const enabled = Object.entries(data.settings.languages)
          .filter(([_, config]) => config.enabled)
          .map(([code, config]) => ({
            code,
            ...config
          }))

        setAvailableLanguages(enabled)

        // If current language is not available, switch to first available
        if (!enabled.find(lang => lang.code === currentLanguage) && enabled.length > 0) {
          setCurrentLanguage(enabled[0].code)
        }
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    }
  }

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode)
    localStorage.setItem('preferred-language', languageCode)
  }

  const t = (translations) => {
    if (!translations) return ''
    return translations[currentLanguage] || translations['tr'] || ''
  }

  const value = {
    currentLanguage,
    availableLanguages,
    changeLanguage,
    t,
    settings
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
