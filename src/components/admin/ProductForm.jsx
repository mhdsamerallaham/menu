'use client'

import React from 'react'
import ImageUploader from './ImageUploader'

const ProductForm = React.memo(function ProductForm({
  formData,
  setFormData,
  categories,
  editingId,
  onSubmit,
  onCancel
}) {
  return (
    <form onSubmit={onSubmit} className="p-8 bg-gradient-to-br from-sand-50 to-sage-50 rounded-2xl border border-sand-200/50 shadow-lg">
      <h3 className="text-xl font-light text-charcoal mb-6 tracking-tight">
        {editingId ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
      </h3>

      <div className="space-y-6 mb-6">
        {/* Turkish Name & Description */}
        <div className="space-y-4 p-4 bg-white/50 rounded-xl">
          <h4 className="text-sm font-medium text-charcoal/70">🇹🇷 Türkçe</h4>
          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
              Ürün Adı
            </label>
            <input
              type="text"
              value={formData.translations?.tr?.name || ''}
              onChange={(e) => setFormData({
                ...formData,
                translations: {
                  ...formData.translations,
                  tr: { ...formData.translations?.tr, name: e.target.value }
                }
              })}
              className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">Açıklama</label>
            <textarea
              value={formData.translations?.tr?.description || ''}
              onChange={(e) => setFormData({
                ...formData,
                translations: {
                  ...formData.translations,
                  tr: { ...formData.translations?.tr, description: e.target.value }
                }
              })}
              className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
              rows="3"
              required
              autoComplete="off"
            />
          </div>
        </div>

        {/* English Name & Description */}
        <div className="space-y-4 p-4 bg-white/50 rounded-xl">
          <h4 className="text-sm font-medium text-charcoal/70">🇬🇧 English</h4>
          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
              Product Name
            </label>
            <input
              type="text"
              value={formData.translations?.en?.name || ''}
              onChange={(e) => setFormData({
                ...formData,
                translations: {
                  ...formData.translations,
                  en: { ...formData.translations?.en, name: e.target.value }
                }
              })}
              className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">Description</label>
            <textarea
              value={formData.translations?.en?.description || ''}
              onChange={(e) => setFormData({
                ...formData,
                translations: {
                  ...formData.translations,
                  en: { ...formData.translations?.en, description: e.target.value }
                }
              })}
              className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
              rows="3"
              required
              autoComplete="off"
            />
          </div>
        </div>

        {/* Arabic Name & Description */}
        <div className="space-y-4 p-4 bg-white/50 rounded-xl">
          <h4 className="text-sm font-medium text-charcoal/70">🇸🇦 العربية</h4>
          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide text-right" dir="rtl">
              اسم المنتج
            </label>
            <input
              type="text"
              value={formData.translations?.ar?.name || ''}
              onChange={(e) => setFormData({
                ...formData,
                translations: {
                  ...formData.translations,
                  ar: { ...formData.translations?.ar, name: e.target.value }
                }
              })}
              className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-right"
              required
              autoComplete="off"
              dir="rtl"
            />
          </div>
          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide text-right" dir="rtl">وصف</label>
            <textarea
              value={formData.translations?.ar?.description || ''}
              onChange={(e) => setFormData({
                ...formData,
                translations: {
                  ...formData.translations,
                  ar: { ...formData.translations?.ar, description: e.target.value }
                }
              })}
              className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-right"
              rows="3"
              required
              autoComplete="off"
              dir="rtl"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
            Kategori
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
            required
          >
            <option value="">Seçiniz...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.translations?.tr || ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">Fiyat (₺)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
            min="0"
            step="0.01"
            required
          />
        </div>
        {editingId && (
          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">Sıra</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
              min="1"
              required
            />
          </div>
        )}
      </div>
      <div className="mb-6">
        <ImageUploader
          currentImage={formData.image}
          onUpload={(imagePath) => setFormData({ ...formData, image: imagePath })}
        />
      </div>
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer p-4 bg-white rounded-xl border border-charcoal/10 hover:border-sand-500/30 transition-all">
          <input
            type="checkbox"
            checked={formData.available}
            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
            className="w-5 h-5 rounded border-charcoal/20 text-sand-600 focus:ring-sand-400"
          />
          <span className="text-charcoal/70 font-light text-sm tracking-wide">Stokta mevcut</span>
        </label>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="bg-gradient-to-r from-sand-600 to-sand-700 text-white px-8 py-3 rounded-xl hover:from-sand-700 hover:to-sand-800 font-light tracking-wide transition-all shadow-lg shadow-sand-600/20"
        >
          {editingId ? 'Güncelle' : 'Ekle'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-white text-charcoal px-8 py-3 rounded-xl hover:bg-charcoal/5 font-light tracking-wide transition-all border border-charcoal/20"
        >
          İptal
        </button>
      </div>
    </form>
  )
})

export default ProductForm
