'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import ProductTabs from './ProductTabs'
import type { ProductDetailProps } from '@/types/products'

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const allImages = product.featuredImage ? [product.featuredImage, ...(product.productImages || [])] : product.productImages || []
  const selectedImage = allImages[selectedImageIndex] || product.featuredImage

  return (
    <>
      <style>{`
        .hero-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          padding: 40px 0 60px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: #1e40af;
          line-height: 1.15;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .model-section {
          margin-bottom: 32px;
        }

        .model-number {
          font-size: 1.2rem;
          color: #333333;
          font-weight: 600;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .sample-text {
          font-size: 0.85rem;
          color: #999999;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 24px;
        }

        .product-description {
          font-size: 1rem;
          color: #555555;
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 480px;
        }

        .button-group {
          display: flex;
          gap: 16px;
          margin-bottom: 0;
        }

        .btn-order-now {
          background-color: #1e40af;
          color: white;
          border: none;
          padding: 13px 32px;
          font-size: 0.9rem;
          font-weight: 700;
          border-radius: 5px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
        }

        .btn-order-now:hover {
          background-color: #1e3a8a;
          transform: translateY(-2px);
        }

        .hero-image-section {
          display: flex;
          flex-direction: column;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 380px;
          background-color: #f5f5f5;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          margin-bottom: 16px;
        }

        .image-container img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .thumbnails-container {
          display: flex;
          gap: 12px;
          justify-content: flex-start;
        }

        .thumbnail {
          all: unset;
          width: 70px;
          height: 70px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          background-color: #f9fafb;
          transition: all 0.3s ease;
          position: relative;
          flex-shrink: 0;
        }

        .thumbnail:hover {
          border-color: #1e40af;
        }

        .thumbnail.active {
          border-color: #1e40af;
          box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.12);
        }

        .tabs-wrapper {
          margin-top: 80px;
        }

        @media (max-width: 1200px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 30px 0 40px 0;
          }

          .hero-title {
            font-size: 2.8rem;
          }

          .image-container {
            height: 350px;
          }
        }

        @media (max-width: 768px) {
          .hero-container {
            gap: 24px;
            padding: 24px 0 32px 0;
          }

          .hero-title {
            font-size: 2rem;
            margin-bottom: 16px;
          }

          .model-number {
            font-size: 1rem;
            margin-bottom: 8px;
          }

          .sample-text {
            font-size: 0.8rem;
            margin-bottom: 16px;
          }

          .product-description {
            font-size: 0.9rem;
            margin-bottom: 24px;
            line-height: 1.6;
          }

          .image-container {
            height: 280px;
            border-radius: 12px;
            padding: 30px;
          }

          .btn-order-now {
            padding: 11px 24px;
            font-size: 0.85rem;
          }

          .thumbnail {
            width: 60px;
            height: 60px;
          }

          .tabs-wrapper {
            margin-top: 60px;
          }
        }
      `}</style>

      <div>
        {/* Hero Section */}
        <div className="hero-container">
          {/* Left Content */}
          <div className="hero-content">
            {/* Title */}
            <h1 className="hero-title">{product.productName}</h1>

            {/* Model Numbers Section */}
            <div className="model-section">
              {product.modelNumbers && product.modelNumbers.length > 0 ? (
                <>
                  {product.modelNumbers.map((model, idx) => (
                    <div key={idx} className="model-number">
                      {model}
                    </div>
                  ))}
                  <div className="sample-text">SAMPLE</div>
                </>
              ) : null}
            </div>

            {/* Product Description */}
            <p className="product-description">
              {product.shortDescription}
            </p>

            {/* Action Button */}
            <div className="button-group">
              <button className="btn-order-now">ORDER NOW</button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="hero-image-section">
            {/* Main Image Container */}
            {selectedImage && (
              <div className="image-container">
                <Image
                  src={urlFor(selectedImage).width(500).height(500).url()}
                  alt={product.productName}
                  width={500}
                  height={500}
                  style={{
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                  priority
                />
              </div>
            )}

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="thumbnails-container">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`thumbnail ${selectedImageIndex === idx ? 'active' : ''}`}
                  >
                    <Image
                      src={urlFor(img).width(70).height(70).url()}
                      alt={`Product view ${idx + 1}`}
                      fill
                      style={{
                        objectFit: 'contain',
                        padding: '3px',
                      }}
                      sizes="70px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section Below */}
        <div className="tabs-wrapper">
          <ProductTabs
            features={product.features || []}
            specifications={product.specifications || []}
            support={product.support}
          />
        </div>
      </div>
    </>
  )
}
