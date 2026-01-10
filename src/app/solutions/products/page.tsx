'use client'

import React, { useEffect, useState, useRef } from 'react'
import { client } from '@/sanity/lib/client'
import Navigation from '@/components/Navigation'
import Footer from "@/components/Footer";
import ProductCard from '@/components/products/ProductCard'
import ProductDetail from '@/components/products/ProductDetail'
import type { Product } from '@/types/products'




export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] | order(productName asc) { _id, productName, modelNumbers, slug, shortDescription, longDescription, featuredImage, productImages, specifications, features, support, ordering }`
        const data = await client.fetch(query)
        setProducts(data || [])
        if (data && data.length > 0) {
          setSelectedProduct(data[0])
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400
      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '18px', color: '#6b7280' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid #e5e7eb', borderTop: '3px solid #1e40af', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p>Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .page-container { min-height: 100vh; background-color: #ffffff; }
        .page-header { 
          padding: 140px 24px; 
          background-color: #ffffff; 
          border-bottom: 1px solid #e5e7eb; 
          margin-bottom: 48px; 
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center; 
        }
        .header-content { 
          max-width: 1200px; 
          margin: 0 auto; 
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .header-title { 
          font-size: 60px; 
          font-weight: 700; 
          color: #1e40af; 
          margin: 0 0 12px 0; 
          text-align: center;
        }
        .header-subtitle {  
          font-size: 20px; 
          color: #6b7280; 
          max-width: 800px; 
          line-height: 1.8; 
          margin: 0 auto; 
          text-align: center;
        }
        
        .carousel-section { max-width: 1400px; margin: 0 auto; padding: 0 24px 60px; }
        .carousel-title { font-size: 24px; font-weight: 700; margin-bottom: 24px; color: #111827; }
        .carousel-container { position: relative; margin-bottom: 48px; }
        
        .carousel { display: flex; gap: 16px; overflow-x: auto; scroll-behavior: smooth; padding: 16px 0; scroll-snap-type: x mandatory; }
        .carousel::-webkit-scrollbar { height: 8px; }
        .carousel::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .carousel::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .carousel::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        .carousel-item { flex: 0 0 280px; scroll-snap-align: start; }
        
        .carousel-button { position: absolute; top: 50%; transform: translateY(-50%); background: #ffffff; border: 2px solid #e5e7eb; border-radius: 50%; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; z-index: 10; }
        .carousel-button:hover { background: #1e40af; border-color: #1e40af; color: white; }
        .carousel-button.left { left: -24px; }
        .carousel-button.right { right: -24px; }
        .carousel-button svg { width: 20px; height: 20px; stroke: currentColor; stroke-width: 2; fill: none; }
        
        .product-detail-section { max-width: 1400px; margin: 0 auto; padding: 0 24px 48px; }
        .detail-container { background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); animation: fadeIn 0.4s ease; }
        .empty-state { text-align: center; padding: 48px 24px; color: #9ca3af; font-size: 16px; }
        
        @media (max-width: 1024px) { 
          .carousel-button.left { left: 0; }
          .carousel-button.right { right: 0; }
          .carousel-item { flex: 0 0 240px; }
        }
        @media (max-width: 768px) {
          .page-header { padding: 120px 16px; margin-bottom: 32px; }
          .header-title { font-size: 28px; }
          .header-subtitle { font-size: 14px; max-width: 100%; padding: 0 16px; }
          .carousel-section { padding: 0 16px 40px; }
          .carousel-item { flex: 0 0 200px; }
          .product-detail-section { padding: 0 16px 32px; }
          .detail-container { padding: 16px; }
        }
      `}</style>

      {/* Navigation Bar */}
      <Navigation />

      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1 className="header-title">Our Products</h1>
            <p className="header-subtitle">
              Explore our comprehensive range of innovative solutions designed to meet your business needs. Select a product to view detailed information, specifications, and ordering options.
            </p>
          </div>
        </div>

        <div className="carousel-section">
          <h2 className="carousel-title">Available Products</h2>

          <div className="carousel-container">
            <button className="carousel-button left" onClick={() => scroll('left')} aria-label="Scroll left">
              <svg viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div ref={carouselRef} className="carousel">
              {products.map((product) => (
                <div key={product._id} className="carousel-item">
                  <ProductCard
                    product={product}
                    isSelected={selectedProduct?._id === product._id}
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
            </div>

            <button className="carousel-button right" onClick={() => scroll('right')} aria-label="Scroll right">
              <svg viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="product-detail-section">
          {selectedProduct ? (
            <div className="detail-container">
              <ProductDetail product={selectedProduct} />
            </div>
          ) : (
            <div className="empty-state">
              <p>Select a product from the carousel above to view details</p>
            </div>
          )}
        </div>
         <Footer />
      </div>
    </>
  )
}
