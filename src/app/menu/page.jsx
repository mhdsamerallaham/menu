'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Header from '@/components/customer/Header'
import CategoryList from '@/components/customer/CategoryList'
import Footer from '@/components/shared/Footer'
import ClassicMenuView from '@/components/customer/ClassicMenuView'
import MinimalMenuView from '@/components/customer/MinimalMenuView'
import ModernMenuView from '@/components/customer/ModernMenuView'

export default function MenuPage() {
  const { currentLanguage, settings } = useLanguage()
  const [menuData, setMenuData] = useState({ categories: [], products: [] })
  const [activeCategory, setActiveCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // API'den menüyü yükle (Vercel KV'den gelecek)
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading menu:', error)
        setLoading(false)
      })
  }, [])

  const filteredProducts = activeCategory
    ? menuData.products.filter((p) => p.categoryId === activeCategory)
    : menuData.products

  const sortedProducts = [...filteredProducts].sort((a, b) => a.order - b.order)
  const sortedCategories = [...menuData.categories].sort((a, b) => a.order - b.order)

  const translations = {
    tr: {
      loading: 'Menü yükleniyor...',
      noProducts: 'Bu kategoride ürün bulunmuyor.'
    },
    en: {
      loading: 'Loading menu...',
      noProducts: 'No products in this category.'
    },
    ar: {
      loading: 'جاري تحميل القائمة...',
      noProducts: 'لا توجد منتجات في هذه الفئة.'
    }
  }

  const t = translations[currentLanguage] || translations.tr

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl">
        <div className="text-center">
          <div className="text-6xl mb-4">☕</div>
          <p className="text-xl text-charcoal/60">{t.loading}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-pearl">
      {/* Fixed background image - using CSS for better mobile support */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${settings?.backgroundImage || '/images/coffee-hero.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Light overlay for minimal aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-pearl/60 via-pearl/50 to-pearl/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <CategoryList
          categories={sortedCategories}
          activeCategory={activeCategory}
          onCategoryClick={setActiveCategory}
        />
        <main className="flex-grow max-w-[1400px] mx-auto px-6 lg:px-12 pb-8 w-full">
          {/* Dynamic Menu View based on theme */}
          {sortedProducts.length > 0 ? (
            <>
              {settings?.menuTheme === 'minimal' && (
                <MinimalMenuView products={sortedProducts} />
              )}
              {settings?.menuTheme === 'modern' && (
                <ModernMenuView products={sortedProducts} />
              )}
              {(!settings?.menuTheme || settings?.menuTheme === 'classic') && (
                <ClassicMenuView products={sortedProducts} />
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <p
                className="text-xl text-charcoal/40"
                style={{ direction: currentLanguage === 'ar' ? 'rtl' : 'ltr' }}
              >
                {t.noProducts}
              </p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  )
}
