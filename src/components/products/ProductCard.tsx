'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { ProductCardProps } from '@/types/products'

export default function ProductCard({
  product,
  isSelected,
  onClick,
}: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        .category-card-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .category-card-button {
          all: unset;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          animation: fadeIn 0.4s ease;
        }

        .category-card-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .category-card-button:active {
          transform: translateY(-2px);
        }

        .card-image-section {
          flex: 1;
          position: relative;
          width: 100%;
          min-height: 180px;
          background: linear-gradient(to bottom, #f5f5f7 0%, #e8e8ea 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          overflow: hidden;
        }

        .card-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-product-image {
          max-width: 100%;
          max-height: 100%;
          width: auto !important;
          height: auto !important;
          position: relative !important;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .category-card-button:hover .card-product-image {
          transform: scale(1.06);
        }

        .card-loading-spinner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f7;
          z-index: 2;
        }

        .card-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e0e0e2;
          border-top: 3px solid #002868;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .card-no-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0f0f2 0%, #e5e5e7 100%);
          color: #b0b0b2;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* CRITICAL: Each card's label background is determined by its own isSelected prop */
        .card-label-section {
          width: 100%;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-product-label {
          font-size: 13px;
          font-weight: 700;
          line-height: 1.3;
          text-align: center;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
        }

        /* Responsive Styles */
        @media (max-width: 1280px) {
          .card-image-section {
            min-height: 160px;
            padding: 20px;
          }

          .card-label-section {
            padding: 14px 18px;
            min-height: 56px;
          }

          .card-product-label {
            font-size: 12px;
            letter-spacing: 0.4px;
          }
        }

        @media (max-width: 1024px) {
          .card-image-section {
            min-height: 150px;
            padding: 18px;
          }

          .card-label-section {
            padding: 12px 16px;
            min-height: 52px;
          }

          .card-product-label {
            font-size: 11px;
            letter-spacing: 0.3px;
          }

          .card-spinner {
            width: 28px;
            height: 28px;
          }
        }

        @media (max-width: 768px) {
          .card-image-section {
            min-height: 140px;
            padding: 16px;
          }

          .card-label-section {
            padding: 12px 14px;
            min-height: 50px;
          }

          .card-product-label {
            font-size: 10px;
            letter-spacing: 0.3px;
          }

          .card-no-image {
            font-size: 11px;
          }
        }

        @media (max-width: 640px) {
          .card-image-section {
            min-height: 120px;
            padding: 14px;
          }

          .card-label-section {
            padding: 10px 12px;
            min-height: 48px;
          }

          .card-product-label {
            font-size: 9px;
            letter-spacing: 0.2px;
          }

          .card-spinner {
            width: 24px;
            height: 24px;
            border-width: 2px;
          }
        }
      `}</style>

      <div className="category-card-wrapper">
        <button
          onClick={onClick}
          className="category-card-button"
          aria-label={`Select ${product.productName}`}
          aria-pressed={isSelected}
        >
          {/* Image Section */}
          <div className="card-image-section">
            {/* Loading Spinner */}
            {imageLoading && (
              <div className="card-loading-spinner">
                <div className="card-spinner" />
              </div>
            )}

            {/* Product Image */}
            {!imageError && product.featuredImage ? (
              <div className="card-image-container">
                <Image
                  src={urlFor(product.featuredImage).width(400).height(400).quality(90).url()}
                  alt={product.productName}
                  width={400}
                  height={400}
                  className="card-product-image"
                  style={{
                    opacity: imageLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 260px"
                  priority={false}
                />
              </div>
            ) : (
              <div className="card-no-image">
                No Image Available
              </div>
            )}
          </div>

          {/* Label Section - Blue background ONLY when THIS card is selected */}
          <div 
            className="card-label-section"
            style={{
              backgroundColor: isSelected ? '#002868' : '#ffffff',
              borderTop: isSelected ? 'none' : '1px solid #e0e0e2',
            }}
          >
            <h3 
              className="card-product-label"
              style={{
                color: isSelected ? '#ffffff' : '#4a5568',
              }}
            >
              {product.productName}
            </h3>
          </div>
        </button>
      </div>
    </>
  )
}
